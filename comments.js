//create web server 
var http = require('http');
var url = require('url');
var fs = require('fs');

//create server
http.createServer(function (req, res) {
    //parse the request containing file name
    var pathname = url.parse(req.url).pathname;
    //print the name of the file for which request is made
    console.log("Request for " + pathname + " received.");
    //read the requested file content from file system
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            //http status: 404 not found
            //content type: text/html
            res.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
            //page found
            //http status: 200 ok
            //content type: text/html
            res.writeHead(200, { 'Content-Type': 'text/html' });
            //write the content of the file to response body
            res.write(data.toString());
        }
        //send the response body
        res.end();
    });
}).listen(8081);

console.log("Server running at http://