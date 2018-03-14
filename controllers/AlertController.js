var apiResponse = require('../app/apiResponse.js');
var Alert = require('../models/alert');

/*
 * Return list of all alerts
 */
exports.list = function (req, res)
{
    Alert.find({})
    .limit(100)
    .exec(function(err, alerts)
    {
        res.send(new apiResponse(alerts, req, err));
    });
}

/*
 * Return most recent alert for a particular election
 */
exports.recentFor = function (req, res, next)
{
    Alert.find({
        election: req.params.election
    })
    .sort('-date')
    .limit(1)
    .exec(function(err, alerts)
    {
        if (alerts.length === 0)
        {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        }
        else
        {
            res.send(new apiResponse(alerts.pop(), req, err));
        }
    });
}

/*
 * Add a new alert
 */
exports.create = function(req, res, next)
{
    if (req.body.length === 0)
    {
        var err = new Error('No data recieved.');
        err.status = 400;
        next(err);
    }
    else
    {
        var newAlert = new Alert({
            date: new Date(),
            election: req.body.election,
            level: req.body.level,
            isSetByMods: req.body.isSetByMods || false
        });
    
        newAlert.save(function(err){
            if (err) {
                next(err);
            }
            else
            {
                res.send(new apiResponse(newAlert, req, err));  
            }
        });
 
    }
}