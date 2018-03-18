var apiResponse = require('../app/apiResponse.js');
var Post = require('../models/post');
var slugify = require('slugify');
var Auth = require('../controllers/AuthController');

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
    Auth.verifyToken(req, function(err, user) {
        if (err || !user.isMod)
        {
            err.status = 401;
            next(err);
        }
        else
        {
            req.check('headline', 'You must provide a valid headline.').isAlphanumeric('en-GB');
            req.check('text', 'The post must contain some text.').exists();
            req.check('imgUrl', 'The image link must be a valid URL.').isURL();
            
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
    });
}

exports.delete = function(req, res)
{
    Auth.verifyToken(req, function(err, user) {
        if (err || !user.isMod)
        {
            err.status = 401;
            next(err);
        }
        else
        {
            req.check('_id', 'You must provide a valid ID.').isMongoId();
    
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
                Post.remove({
                    _id: req.params.id
                })
                .then(function(){
                    res.status(204).send();
                })
            }
        }
    });
}