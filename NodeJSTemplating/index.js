var ws = require('./WebServer'),
    server = ws.WebServer({ 'port': 9000, 'hostname': 'localhost' });

server.AddRoute("GET", /^\/$/, function (request, response, view, params) {
    view.Render('./temp.html', { 'PageTitle': 'Template!', 'Content': 'Hello, World!' })
        .then(function (result) {
            response.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': result.length });
            response.write(result);
            response.end();
        });
});

server.AddRoute("GET", /profile\/(.*)/, function (request, response, view, id) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write("PROFILE ID: " + id);
    response.end();
});

server.Start();
