exports.base = function(req, res) 
{
    res.send({
        api: {
          title: 'Election Watch',
          help: 'Check out the documentation to learn how to use the election-watch API.',
          docsUrl: '/api/1/docs'
        }
      });
}

exports.docs = function(req, res)
{
  res.send();
}