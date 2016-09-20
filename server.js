'use strict';

var movieFetcherService = require("./services/movieFetchService"),
    tastePorfile = require('./services/tasteProfiler');
    

movieFetcherService.getMovies(function(err,data){
    if(err){
        console.log(err);
    } else {
        console.log("data in server.js: " + JSON.stringify(data));
    }
});
