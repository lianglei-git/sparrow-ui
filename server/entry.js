const http = require('http');

var fs = require("fs");

var url = require('url');

var routes = require('./routes');

var has = Reflect.has

const server = http.createServer((req, res) => {
    var urlPath = url.parse(req.url);
    var meth = req.method.toLocaleLowerCase();
    res.setHeader('Content-Type', 'text/json;charset=utf-8');
    has(routes, meth) ?
        has(routes[meth], urlPath.pathname) ?
            routes[meth][urlPath.pathname](req, res) :
            res.write('不存在'+urlPath.pathname+'此API!') :
        res.write('不存在'+meth+'此METH!') ;
    res.end()
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8214, () => {
    console.log('server:::8214')
});