/*var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
var path = require("path");
var server = require('http').createServer(app);
var io = require('socket.io')(server);*/

//WEBHOOK//
applicationCache.post('/webhook', function (req, res){

    console.log('received a post request');
    if(!req.body) return res.sendStatus(400)
    res.setHeader('Content-Type', 'application/json');
    console.log('here is the post request from DialogFLow');
    console.log(req.body);
    console.log('Got geo city weather from DialogFlow'+ req.body.queryResult.parameters['geo.city']);

})

//Weather API//

var apiKey = '';
var result

function cb (err, response, body) {
    if(err) {
        console.log('error', error);
    }
    
    var weather = JSON.parse(body)
    if (weather.message === 'city not found') {
        result = 'Unable to get weather ' + weather.message;
    }
    else {
        result = 'Right not its ' + weather.main.temp + ' degrees with ' + weather.weather[0].description;
    }
}

function getWeather(city) {
    result = undefined;
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}';
    var req = request(url, cb);
    while(result === undefined) {
        require('deasync').runLoopOnce();
    }

    return result;
}



