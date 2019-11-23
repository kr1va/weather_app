/*// = vendors/jquery-3.4.1.js
// = vendors/popper.min.js
// = vendors/bootstrap.min.js
*/


//var state = 'cel';

//this variable saves temperature in celsium degrees and used in celsium-to-fahrenheit conversion
//activated by switcher

var temp = $('#weatherDegrees').html()

//this variable saves collection of 2 buttons used in temperature degree switcher

var btn = $('.header__selector__btn');

// this function switches between celsium and fahrenheit degrees to display teperature in app

$(btn[0]).on('click', function() {
  if ($(this).hasClass('--active')) {
  } else {
    $(this).addClass('--active');
    $(btn[1]).removeClass('--active');
    $('#weatherDegrees').html(temp);
  }
})

$(btn[1]).on('click', function() {
  if ($(this).hasClass('--active')) {
  } else {
    $(this).addClass('--active');
    $(btn[0]).removeClass('--active');
    $('#weatherDegrees').html(Math.floor(temp * 1.8 + 32));
  }
})



//this function clears city input when clicked

$('input.city').on("click", function(){
  $(this).val("");
})


/* getWeather function uses $.post to request openweathermap.org API for entered city and if it is match,
returns array with weather forecast data, then place array datas into data fields of app.
if entered city does not match openweathermap.org database function returns error and alert "Wrong city: %CITYNAME% !"
Also api supports russian city names*/


var getWeather = function(location){
this.loc = location;
var appid = "&APPID=adf0af8922e08a10d67b0ffb6859b57f";
var metriс = "&units=metric";
if (this.loc) {
  var url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.loc + appid + metriс;
  $.post(url, function(result) {
    if (result["name"] && result["main"]["temp"] && result["weather"][0]["icon"] && result["main"]["pressure"] && result["main"]["humidity"]
     && result["weather"][0]["description"]) {
       temp = Math.floor(result["main"]["temp"]);
       $('div.cityName').html(result["name"]);
       $('span.cityName').html(result["name"]);
       $('#weatherDegrees').html(Math.floor(result["main"]["temp"]));
       $('#wind').html(Math.floor(result["main"]["temp"]) + ' м.с');
       $('#pressure').html(result["main"]["pressure"] + ' мм рт. ст.');
       $('#humidity').html(result["main"]["humidity"] + ' %');
       $('#weatherDescription').html(result["weather"][0]["description"]);
       if (result["weather"][0]["main"] =="Rain") {
         $('#rainChance').html('Идет дождь');
       } else {
         $('#rainChance').html("Маловероятно");
       }
    }
    var imgSource = "http://openweathermap.org/img/wn/" + result["weather"][0]["icon"] + "@2x.png";
    $('#weatherIcon').attr("src", imgSource);
  }).fail(function(xhr, status, error) {
    if (xhr.status==404) {
      alert("Wrong city: "+loc+" !")
      $('input.city').val("");
    }
    console.log("Result: " + status + " " + error + " " +
      xhr.status + " " + xhr.statusText);
      return false;
  }
)} else {
  alert('Empty!');
}}

//here we call this function to get weather forecast when app is started, default location 'Krasnodar'

getWeather("Krasnodar");


//this code is used to get weather forecast for entered location

var search = $('.citySearch');
$(search).on('click', function() {
  var locate = $('input.city');
  for (var i = 0; i < locate.length; i++) {
    if ($(locate[i]).val()!=="") {
      var loc = $(locate[i]).val();
    }
  }
  getWeather(loc);
})