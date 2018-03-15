var apiResponse = require('../app/apiResponse');
var Subscriber = require('../models/subscriber');

exports.subscribe = function (req, res, next)
{
    // Validation
    req.check('email', 'Invalid email address.').isEmail();
    req.check('consent', 'Consent not given.').exists();

    var errors = req.validationErrors();
    if (errors) {
        var err = new Error('Invalid input.');
        err.status = 400;
        err.validation = errors;
        next(err);
    }
    else
    {
        var newSubscriber = new Subscriber({
            email: req.body.email,
            hasConsented: req.body.consent,
            criticalOnly: req.body.criticalOnly || false
        });
    
        newSubscriber.save(function(err){
            if (err) {
                next(err);
            }
            else
            {
                res.status(204).send();
            }
        });
    }
}

exports.unsubscribe = function (req, res)
{
    Subscriber.remove({
        email: req.body.email
    });

    res.status(204).send();
}