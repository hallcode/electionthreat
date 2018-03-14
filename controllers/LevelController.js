var apiResponse = require('../app/apiResponse.js');
var Level = require('../models/level');

/*
 * Return list of all levels.
 */
exports.list = function (req, res)
{
    Level.find({}, function(err, levels){
        res.send(new apiResponse(levels, req, err));
    });
}

/*
 * Return details of a single level.
 */
exports.single = function (req, res, next)
{
    Level.find({
        name: req.params.name
        }, function(err, levels) {
        if (levels.length === 0) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        }
        else
        {
            res.send(new apiResponse(levels.pop(), req, err));            
        }
    });
}