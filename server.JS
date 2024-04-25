const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/comments', (req, res) => {
    fs.readFile('data/comments.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments file.');
            return;
        }
        res.json(JSON.parse(data || '[]'));
    });
});


app.post('/comments', (req, res) => {
    const newComment = req.body;
    fs.readFile('data/comments.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments file.');
            return;
        }
        const comments = JSON.parse(data || '[]');
        comments.push(newComment);
        fs.writeFile('data/comments.json', JSON.stringify(comments, null, 2), err => {
            if (err) {
                res.status(500).send('Error saving comment.');
                return;
            }
            res.json(newComment);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
