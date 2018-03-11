function ApiResponse(obj, req, err = null)
{
    if (err !== null) {
        this.err = {
            status: err.status,
            message: err.message,
        };
    }
    this.api = {
        version: "1",
        endpoint: req.path
    };
    var now = new Date();
    this.api.date = now.toJSON();

    this.obj = obj;
};

module.exports = ApiResponse;