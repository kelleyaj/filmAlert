'use strict';

var movieFetcherService = require("./services/movieFetchService"),
    tastePorfile = require('./services/tasteProfiler');
    

movieFetcherService.getMovies(function(err,data){
    console.log("data in server.js: " + JSON.stringify(data));
});
