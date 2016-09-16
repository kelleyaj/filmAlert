'use strict';

var movieFetcherService = require("./services/movieFetchService"),
    tastePorfile = require('./services/tasteProfiler');
    

var testList = movieFetcherService.getMovies();

//console.log(JSON.stringify(testList));

