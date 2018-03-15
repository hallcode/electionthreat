function ApiResponse(obj, req, err = null)
{
    this.api = {
        version: "1",
        endpoint: req.path
    };
    var now = new Date();
    this.api.date = now.toJSON();
    
    if (err !== null) {
        this.err = {
            status: err.status,
            message: err.message,
        };

        if (err.validation) {
            this.err.validation = err.validation;
        }
    }
    else
    {
        this.obj = obj;   
    }
};

module.exports = ApiResponse;