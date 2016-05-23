var http = require('http');
var movie = require('node-movie');

//call alamo service to get calendar of the month for location x
var options = {
  host: 'feeds.drafthouse.com',
  port: 80,
  path: '/adcService/showtimes.svc/calendar/0501/'
};

http.get(options, function(resp){
    var alamoFeedResponse = '';
    
    resp.on('data', function(chunk){
      alamoFeedResponse += chunk;
    });
    
    resp.on('end', function () {
    var jsonObject = JSON.parse(alamoFeedResponse);
    var filmName = jsonObject.Calendar.Cinemas[0].Months[0].Weeks[0].Days[6].Films[0].FilmName;
    getFilmInfo(cleanFilmName(filmName));
    processCalendar(jsonObject.Calendar);
  });
  
}).on("error", function(e){
  console.log("Got error: " + e.message);
});

/*iterate over each day of the month
    for each day:
        get each movie title
            for each movie title
                call imdb service to get movie information
                    for each movie info check params against taste profile
*/
function processCalendar(alamoCalendar){
  alamoCalendar.Cinemas[0].Months[0].Weeks[0].Days.forEach(function(day){
      if(day.Films){
        day.Films.forEach(function(film){
          console.log(film.FilmName);
        });
      }
  });
}
function compareToTasteProfie(film, tasteProfile){
  
}

function cleanFilmName(filmnName){
  return filmnName.replace('2D ','').replace('3D ','').trim();
};

function getFilmInfo(filmnName){
  console.log("Searching for: " + filmnName);
  movie(filmnName, function (err, data) {
    console.log("Results: ");
	  console.log(data);
  });
};

