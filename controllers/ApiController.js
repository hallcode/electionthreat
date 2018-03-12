exports.base = function(req, res) 
{
    res.send({
        api: {
          title: "election-threat",
          version: "1.0",
          author: "Alex Hall",
          base_url: "/api/1",
        },
        endpoints: {}
      });
}