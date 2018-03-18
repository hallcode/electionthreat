var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var appVars = require('../vars.js');
var User = require('../models/user');
var apiResponse = require('../app/apiResponse');

exports.login = function(req, res, next)
{
    req.check('email', 'You must provide a valid email.').isEmail();
    req.check('password', 'You must provide a password.').exists();

    var errors = req.validationErrors();

    if (errors) {
        var err = new Error('Invalid input.');
        err.status = 400;
        err.validation = errors;
        next(err);
    }
    else
    {
        User.find({
            email: req.body.email
        }).limit(1)
        .exec((err, users) => {
            if (users.length === 0) {
                var err = new Error('That email / password combination is not recognised.');
                err.status = 401;
                next(err);
            }
            else
            {
                user = users.pop();
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if (result === true) {
                        var date = new Date();
                        date = date.setDate(date.getDate() + 21);
                        console.log(date);
                        var token = jwt.encode({
                            iss: 'election-watch.org.uk',
                            exp: Math.round(date / 1000),
                            usr: user.email,
                            mod: user.isMod
                        }, appVars.app.secret);
                        res.send(new apiResponse({
                            token: token,
                            expires: Math.round(date / 1000),
                            user: {
                                email: user.email,
                                isMod: user.isMod
                            }
                        }, req));
                    }
                    else
                    {
                        var err = new Error('That email / password combination is not recognised.');
                        err.status = 401;
                        next(err);
                    }
                });
            }
        })
    }

}

exports.verifyToken = function(req, callback)
{
    var token = req.headers['x-access-token'];
    var date = new Date();
    var dateInMils = Math.round(date.getTime() / 1000);

    var err = new Error();

    if (token == null) {
        err.message = 'No token was provided.';
        callback(err, null);
    }
    else
    {
        var payload = jwt.decode(token, appVars.app.secret);
        if (payload.iss == 'election-watch.org.uk' && payload.exp > dateInMils) {
            User.find({email:payload.usr}).exec((err, users)=>{
                if (users) {
                    callback(false, users.pop());
                }
                else
                {
                    err.message = 'Token user invalid.';
                    callback(err, null);
                }
            });
        }
        else
        {
            err.message = 'Token invalid.';
            callback(err, null);
        }
    }
}