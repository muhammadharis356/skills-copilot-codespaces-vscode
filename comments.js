//create web server
const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

//create web server
const server = http.createServer((req, res) => {
    //get the path
    let pathName = url.parse(req.url, true).pathname
    //get the method
    let method = req.method

    //if the path is /comments
    if (pathName === '/comments') {
        //if the method is post
        if (method === 'POST') {
            //read the file
            fs.readFile(path.join(__dirname, 'data', 'comments.json'), 'utf-8', (err, data) => {
                if (err) {
                    res.end('Error')
                } else {
                    //parse the data
                    let comments = JSON.parse(data)
                    //get the new comment
                    let body = ''
                    req.on('data', chunk => {
                        body += chunk
                    })
                    req.on('end', () => {
                        let comment = JSON.parse(body)
                        //add the new comment
                        comments.push(comment)
                        //write the new comment
                        fs.writeFile(path.join(__dirname, 'data', 'comments.json'), JSON.stringify(comments, null, 4), err => {
                            if (err) {
                                res.end('Error')
                            } else {
                                res.end('Comment added')
                            }
                        })
                    })
                }
            })
        }
    } else {
        res.end('404')
    }
})

//listen to the server
server.listen(3000, () => {
    console.log('Server is running')
})