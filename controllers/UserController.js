var User = require('../models/user');
var apiResponse = require('../app/apiResponse');
var Auth = require('./AuthController');

exports.createMod = function(req, res, next)
{
    req.check('email', 'You must provide a valid email.').isEmail();
    req.check('password', 'You must provide a valid password.').exists();

    var errors = req.validationErrors();
    if (errors) {
        var err = new Error('Invalid input.');
        err.status = 400;
        err.validation = errors;
        next(err);
    }
    
    User.count({}).exec((err, count) => {
        if (count === 0)
            {
                // There are no users, allow the creation of one
        
                var newUser = new User({
                    email: req.body.email,
                    password: req.body.password,
                    isMod: req.body.isMod || true
                });
        
                newUser.save((err, user) => {
                    if (err) {
                        err.status = 500;
                        next(err);
                    }
                    else {
                        res.status(204).send();
                    }
                });
            }
            else
            {
                // Check if the user is a mod, then allow creation of user
                Auth.verifyToken(req, function(err, user) {
                    if (err) {
                        err.status = 401;
                        next(err);
                    }
                    else {
                        if (user.isMod) {
        
                            var newUser = new User({
                                email: req.body.email,
                                password: req.body.password,
                                isMod: req.body.isMod || false
                            });
                            
                            newUser.save((err, user) => {
                                if (err) {
                                    err.status = 500;
                                    next(err);
                                }
                                else {
                                    res.status(204).send();
                                }
                            });
                        }
                        else
                        {
                            var err = new Error('You are not authorised to perform this action.');
                            err.status = 401;
                            err.validation = errors;
                            next(err);
                        }
                    }
                });
        
            }
    })
}