'use strict';

var commonUtil = require("../util/commonUtilities"),
    http = require('http'),
    movie = require('node-movie');
    
var myAlamoTheaterId = '0501';

module.exports.getMovies = function(){
    this.alamoMovieCalendar = getAlamoMovieCalendar(myAlamoTheaterId, function(fetchedCalendar){
        //console.log(alamoMovieCalendar);
        this.movieNameList = getListOfMovieNames(fetchedCalendar);
    });
    //this.movieNameList = getListOfMovieNames(this.alamoMovieCalendar);
    //this.IMDBList = getListOfIMDBInfo(this.movieNameList);
    
    return this.movieNameList;
};

function getAlamoMovieCalendar(alamoTheaterId, callBack){
    //call alamo service to get calendar of the month for location x
    var options = {
      host: 'feeds.drafthouse.com',
      port: 80,
      path: '/adcService/showtimes.svc/calendar/' + alamoTheaterId + '/',
    };

    http.get(options, function(resp){
        var alamoFeedResponse = '';
        
        resp.on('data', function(chunk){
          alamoFeedResponse += chunk;
        });
        
        resp.on('end', function () {
            callBack(JSON.parse(alamoFeedResponse));
      });
      
    }).on("error", function(e){
      console.log("Got error: " + e.message);
    });
}
 
//Return an array of movie names from an alamoMovieCalendar object
function getListOfMovieNames(alamoMovieCalendar){
    var filmNameList = [];
     alamoMovieCalendar.Cinemas[0].Months[0].Weeks[0].Days.forEach(function(day){
          if(day.Films){
            day.Films.forEach(function(film){
              //console.log(film.FilmName);
              filmNameList.push(commonUtil.cleanFilmName(film.FilmName));
            });
          }
     });
    return filmNameList;
}


//For an array of movie names get imdb info for each, return array with results.
function getListOfIMDBInfo(filmNames){
    var fullMovieInfoList = [];
    filmNames.forEach(function(filmName){
        movie(filmName, function (err, data) {
            if(data){
                fullMovieInfoList.push(data);
            }
        });   
    })
    return fullMovieInfoList;
};