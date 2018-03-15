
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