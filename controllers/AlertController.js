var apiResponse = require('../app/apiResponse');
var Alert = require('../models/alert');
var Auth = require('../controllers/AuthController');

/*
 * Return list of all alerts
 */
exports.list = function (req, res)
{
    Alert.find({})
    .select('election level isSetByMods date')
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
    .select('election level isSetByMods')
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
    Auth.verifyToken(req, function(err, user) {
        if (err || !user.isMod)
        {
            err.status = 401;
            next(err);
        }
        else
        {
             // Validation
            req.check('election', 'You must specify an election.').exists();
            req.check('level', 'You must specify a new alert level.').exists();

            var errors = req.validationErrors();

            if (errors)
            {
                var err = new Error('Invalid input.');
                err.status = 400;
                err.validation = errors;
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
    });
    
}