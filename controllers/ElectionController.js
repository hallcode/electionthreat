
const apiResponse = require('../app/apiResponse.js');
const Election = require('../models/election');

exports.list = function(req, res)
{
    Election.find({})
        .select('name code')
        .sort('order')
        .exec(function(err, elections){
            res.send(new apiResponse(elections, req, err));
        });
}

exports.single = function (req, res, next)
{
    Election.find({ code: req.params.code }, 
        function(err, elections) {
            if (elections.length === 0) 
            {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            }
            else
            {
                res.send(new apiResponse(elections.pop(), req, err));
            }
        });
}

exports.watched = function (req, res)
{
    Election.find({isWatched: true})
    .select('name code')
    .sort('order')
    .exec(function(err, elections){
        res.send(new apiResponse(elections, req, err));
    });
}

exports.create = function (req, res, next)
{
    if (req.body.length === 0)
    {
        var err = new Error('No data recieved.');
        err.status = 400;
        next(err);
    }
    else
    {
        var newElection = new Election({
            name: req.body.name,
            code: req.body.code,
            order: req.body.order,
            color: req.body.colour,
            isWatched: req.body.isWatched
        });
    
        newElection.save(function(err){
            if (err) {
                next(err);
            }
            else
            {
                res.send(new apiResponse(newElection, req, err));
            }
        });
    }
}

exports.delete = function (req, res)
{
    res.status(501).send('');

    // Election.remove({ code: null }).then(function(){
    //     res.status(204).send('');
    // });
}