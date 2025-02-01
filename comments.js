//create web server 
const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 3000;
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const q = url.parse(req.url, true);
    const filename = "." + q.pathname;
    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
});
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});