const express = require('express');

const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/get-team-details', (req, res) => {
    res.send([{id: 32, name: 'Argentina'},
        {id: 1, name: 'Brazil'},
        {id: 2, name: 'Russia'},
        {id: 3, name: 'Iran'},
        {id: 4, name: 'Japan'},
        {id: 5, name: 'Mexico'},
        {id: 6, name: 'Belgium'},
        {id: 7, name: 'South Korea'},
        {id: 8, name: 'Saudi Arabia'},
        {id: 9, name: 'Germany'},
        {id: 10, name: 'England'},
        {id: 11, name: 'Spain'},
        {id: 12, name: 'Nigeria'},
        {id: 13, name: 'Costa Rica'},
        {id: 14, name: 'Poland'},
        {id: 15, name: 'Egypt'},
        {id: 16, name: 'Iceland'},
        {id: 17, name: 'Serbia'},
        {id: 18, name: 'Portugal'},
        {id: 19, name: 'France'},
        {id: 20, name: 'Uruguay'},
        {id: 21, name: 'Colombia'},
        {id: 22, name: 'Panama'},
        {id: 23, name: 'Senegal'},
        {id: 24, name: 'Morocco'},
        {id: 25, name: 'Tunisia'},
        {id: 26, name: 'Switzerland'},
        {id: 27, name: 'Croatia'},
        {id: 28, name: 'Sweden'},
        {id: 29, name: 'Denmark'},
        {id: 30, name: 'Australia'},
        {id: 31, name: 'Peru'},

    ])
})

app.use('/jquery', express.static('node_modules/jquery/dist/jquery.js'))
app.use(express.static('client'))


app.listen(3001, () => console.log('Team details app is on port 3001'))