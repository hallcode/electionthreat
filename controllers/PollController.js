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
    req.check('year', 'You must provide a valid year, in the future.').exists().isInt({min: new Date().getFullYear()});
    req.check('month', 'You must provide a valid month.').exists().isInt({max: 12, min: 1});
    req.check('day', 'You must provide a valid day.').exists().isInt({min: 1, max: 31});
    req.check('election', 'You must specify an election type.').exists();

    var errors = req.validationErrors();    
    if (err)
    {
        var err = new Error('Invalid input.');
        err.status = 400;
        err.validation = errors;
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