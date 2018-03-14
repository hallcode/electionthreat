var apiResponse = require('../app/apiResponse.js');
var Poll = require('../models/poll');

/*
 * Gets the 4 soonest polls
 */
exports.list = function(req, res) {
    var today = new Date();
    Poll.find({
        date: { $gt: today }
    })
    .select('election region question date')
    .sort('date')
    .limit(4)
    .exec(function(err, polls)
    {
        res.send(new apiResponse(polls, req, err));
    });
};

exports.getFor = function(req, res) {
    var today = new Date();
    Poll.find({
        election: req.params.election,
        date: { $gt: today }
    })
    .select('election region question date')
    .sort('date')
    .limit(1)
    .exec(function(err, polls)
    {
        res.send(new apiResponse(polls, req, err));
    });
};

exports.create = function(req, res, next) {
    if (req.body.length === 0)
    {
        var err = new Error('No data recieved.');
        err.status = 400;
        next(err);
    }
    else
    {
        var newPoll = new Poll({
            date: new Date(req.body.year, req.body.month-1, req.body.day, 7,0,0),
            election: req.body.election,
            region: req.body.region || 'uk',
            question: req.body.question || null
        });

        newPoll.save(function(err){
            if (err) {
                next(err);
            }
            else
            {
                res.send(new apiResponse(newPoll, req, err));  
            }
        });
    }

};