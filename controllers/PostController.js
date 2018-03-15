var apiResponse = require('../app/apiResponse.js');
var Post = require('../models/post');
var slugify = require('slugify');

exports.list = function(req, res)
{
    Post.find({})
    .select('headline slug text imgUrg date')
    .sort('-date')
    .limit(15)
    .exec(function(err, posts){
        res.send(new apiResponse(posts, req, err));
    });
}

exports.single = function(req, res, next)
{
    Post.find({
        slug: req.params.slug
    })
    .exec(function(err, posts){
        if (posts.length === 0)
        {
            var err = new Error('Not found.');
            err.status = 404;
            next(err);
        }
        else
        {
            res.send(new apiResponse(posts.pop(), req, err));
        }
    });
}

exports.create = function(req, res, next)
{
    if (req.body.length === 0)
    {
        console.log('Error')
        var err = new Error('No data recieved.');
        err.status = 400;
        next(err);
    }
    else
    {
        var slug = slugify(req.body.headline);

        var newPost = new Post({
            headline: req.body.headline,
            slug: slug.toLowerCase(),
            text: req.body.text,
            imgUrl: req.body.imgUrl || null,
            alert: req.body.alert || null
        })
        .save(function(err, post){
            if (err) {
                next(err);
            }
            else
            {
                res.send(new apiResponse(post, req, err));  
            }
        });
    }
    
}

exports.delete = function(req, res)
{
    Post.remove({
        _id: req.params.id
    })
    .then(function(){
        res.status(204).send();
    })
}