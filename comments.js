//create web server 
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const commentsPath = path.join(__dirname, 'data/comments.json');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/comments', (req, res) => {
    fs.readFile(commentsPath, (err, data) => {
        if (err) {
            return res.status(500).send('Error loading comments');
        }
        res.send(JSON.parse(data));
    });
});

app.post('/comments', (req, res) => {
    fs.readFile(commentsPath, (err, data) => {
        if (err) {
            return res.status(500).send('Error loading comments');
        }
        const comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
            if (err) {
                return res.status(500).send('Error saving comments');
            }
            res.send('Comment saved');
        });
    });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});