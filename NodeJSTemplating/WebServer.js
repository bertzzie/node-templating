var http = require('http'),
    view = require('./Template'),
    router = require('./Router');

var _serverHandler = function (request, response) {
    var url = request.url,
        method = request.method;
    
    router.Dispatch(method, url, request, response, view);
};

var WebServer = function(options) {
    var ServerObject = {};

    var _options = options || {},
        _port = _options.port || process.env.port || 1337,
        _hostname = _options.hostname || 'localhost',
        _server = http.createServer(_serverHandler);
    
    ServerObject.Server = _server;

    ServerObject.Start = function () {
        _server.listen(_port, _hostname);
    };

    ServerObject.Stop = function () {
        _server.close();
    };
    
    ServerObject.AddRoute = function (method, pattern, handler) {
        router.Add(method, pattern, handler);
    };
    
    return ServerObject;
};

exports.WebServer = WebServer;
