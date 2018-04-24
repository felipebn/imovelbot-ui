/**
 * Emulates a websocket server for UI development.
 */
var http = require('http');
var sockjs = require('sockjs');

var echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });
echo.on('connection', function(conn) {
    conn.on('data', function(message) {
		console.log("writing message: " + message)
        conn.write(message);
    });
    conn.on('close', function() {});
});

var server = http.createServer();
echo.installHandlers(server, {prefix:'/echo'});
server.listen(18080, '0.0.0.0');