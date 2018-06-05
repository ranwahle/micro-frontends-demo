const express = require('express');

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/get-team-details', (req, res) => {
    res.send([{name: 'Argentina'},
        {name: 'Brazil'},
        {name: 'Russia'},
        {name: 'Iran'},
        {name: 'Japan'},
        {name: 'Mexico'},
        {name: 'Belgium'},
        {name: 'South Korea'},
        {name: 'Saudi Arabia'},
        {name: 'Germany'},
        {name: 'England'},
        {name: 'Spain'},
        {name: 'Nigeria'},
        {name: 'Costa Rica'},
        {name: 'Poland'},
        {name: 'Egypt'},
        {name: 'Iceland'},
        {name: 'Serbia'},
        {name: 'Portugal'},
        {name: 'France'},
        {name: 'Uruguay'},
        {name: 'Colombia'},
        {name: 'Panama'},
        {name: 'Senegal'},
        {name: 'Morocco'},
        {name: 'Tunisia'},
        {name: 'Switzerland'},{name: 'Croatia'},
        {name: 'Sweden'},
        {name: 'Denmark'},
        {name: 'Australia'},
        {name: 'Peru'},

    ])
})

app.use('/jquery', express.static('node_modules/jquery/dist/jquery.js'))
app.use(express.static('client'))



app.listen(3001, () => console.log('Team details app is on port 3001'))