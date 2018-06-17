const express = require('express');
const fs = require('fs')
const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/games', (req, res) => {
    fs.readFile('games.json', 'utf8', (err, data) => {
        if (err) {
            console.error('error reading file', err);
            res.send([])
        } else {
            res.send(JSON.parse(data))
        }
    })
})

app.post('/games', (req, res) => {
    const games = req.body;
    fs.writeFile('games.json', games, 'utf8', () => res.ok())
})

app.listen(3002, () => console.log('Team details app is on port 3002'))