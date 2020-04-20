
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

var server = http.createServer(function (req, res) {

    var parsedUrl = url.parse(req.url, true);


    var path = parsedUrl.pathname;

    var trimmedPath = path.replace(/^\/*|\/*$/g, '');

    var queryStringObject = parsedUrl.query

    var method = req.method.toLowerCase();

    var headers = req.headers;

    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function (data) {
        //turn data to string
        buffer += decoder.write(data)
    })
    req.on('end', function () {
        buffer += decoder.end();

        console.log('Request received on path:' + trimmedPath + ' with this method: ' + method + 'with these query string parameters', queryStringObject)
        console.log('Request received these headers: ', headers)
        console.log('Request received these payloads: ', buffer)

        res.end('Hello world\n');
    })
});

server.listen(3000, function () {
    console.log("The server is listening on port 3000 now")
})