'use strict';

var commonUtil = require("../util/commonUtilities"),
    http = require('http'),
    movie = require('node-movie');
    
var async = require('async');
    
var myAlamoTheaterId = '0501';

module.exports.getMovies = function(callback) {
    var movieNameList = [];
    
    async.waterfall([
        getAlamoMovieCalendar,
        getListOfMovieNames,
        getListOfIMDBInfo,
        ],function (err, result) {
            callback(null,result);
        });
};

function getAlamoMovieCalendar(callback){
    //call alamo service to get calendar of the month for location x
    var options = {
      host: 'feeds.drafthouse.com',
      port: 80,
      path: '/adcService/showtimes.svc/calendar/' + '0501' + '/',
    };

    http.get(options, function(resp){
        var alamoFeedResponse = '';
        
        resp.on('data', function(chunk){
          alamoFeedResponse += chunk;
        });
        
        resp.on('end', function () {
            var parsedResponse = JSON.parse(alamoFeedResponse);
            callback(null,parsedResponse.Calendar);
      });
      
    }).on("error", function(e){
      console.log("Got error: " + e.message);
    });
}
 
//Return an array of movie names from an alamoMovieCalendar object
function getListOfMovieNames(alamoMovieCalendar,callback){
    var filmNameList = [];
    alamoMovieCalendar.Cinemas[0].Months[0].Weeks[0].Days.forEach(function(day){
       if(day.Films){
         day.Films.forEach(function(film){
           filmNameList.push(commonUtil.cleanFilmName(film.FilmName));
         });
       }
      });
    callback(null,filmNameList);
}

//For an array of movie names get imdb info for each, return array with results.
function getListOfIMDBInfo(filmNames, callback){
    console.log("in getListOfIMDBInfo ");
    var fullMovieInfoList = [];
    async.each(filmNames, function(filmName,callback){
        //console.log("Processing film: " + filmName);
        movie(filmName, function (err, data) {
            if(data.Response == "True"){
                fullMovieInfoList.push(data);
            } else{
                console.log("Error for " + filmName);
                console.log(data.Error);
            }
            callback(null);
        });
    }, function(err){
        if(err){
            console.log("An error calling IMDB.");
        }
        callback(null,fullMovieInfoList);
    })
};