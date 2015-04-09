var ws = require('./WebServer'),
    server = ws.WebServer({ 'port': 9000, 'hostname': 'localhost' });

server.AddRoute("GET", /^\/$/, function (params) {
    var that = this;
    that.view.Render('./temp.html', { 'PageTitle': 'Template!', 'Content': 'Hello, World!' })
        .then(function (result) {
            that.response.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': result.length });
            that.response.write(result);
            that.response.end();
        });
});

server.AddRoute("GET", /profile\/(.*)/, function (id) {
    this.response.writeHead(200, { 'Content-Type': 'text/plain' });
    this.response.write("PROFILE ID: " + id);
    this.response.end();
});

server.Start();
