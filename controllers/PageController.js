var apiResponse = require('../app/apiResponse.js');
var fs = require("fs");

var pathToStaticPages = 'static/pages/';

exports.list = function (req, res)
{
    fs.readdir(pathToStaticPages, (err, items) => {
        if (err) {
            err.status = 404;
            next(err);   
        }
        else
        {
            items.forEach((item, i, array) => {
                array[i] = item.split(".")[0];
            })

            res.send(new apiResponse(items, req, err));
        }
    });
}

exports.static = function(req, res, next)
{
    var requestTitle = req.params.title.toLowerCase() + '.md';

    console.log(pathToStaticPages + requestTitle);

    fs.readFile(pathToStaticPages + requestTitle, 'utf8', (err, contents) => {
        if (err && err.code === 'ENOENT') {
            err.message = "Page does not exist.";
            err.status = 404;
            next(err);   
        }
        else
        {
            res.send(new apiResponse({
                markdown: contents
            }, req, err));
        }
    });
}