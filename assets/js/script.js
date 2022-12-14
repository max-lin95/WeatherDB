var apiKey ="6a90dc5f99be9c2ebf03e8c9ca4e3233";
var currentCity = "";
var pastCity = "";
var searchHistory = [];

function currentWeatherCity(city){
    
    https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key},

    $.ajax({
        url: weatherQuery,
        method: "GET"
    }).then(function(cityWeather) {
        console.log(cityWeather);
        $("#weatherInfo").css("display", "block");
        $("#current-weather").empty();

        var owmIcon = cityWeather.weather[0].icon;
        var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

        var thisCity = $(`
            <h1 id="thisCity">
                ${cityWeather.name} ${today} <img src="${iconURL}"/>
            </h1>
            <p>Temperature: ${cityWeather.main.temp} °F</p>
            <p>Wind Speed: ${cityWeather.main.speed} MPH</p>
            <p>Humidity: ${cityWeather.main.humidity} \%</p>           
            `);

            $("#current-weather").append(thisCity);

            var lat = cityWeather.coord.lat;
            var lon = cityWeather.coord.lon;
            });
    
}

currentWeatherCity()

function futureWeather(lat, lon) {
    var futureWeatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;

    $.ajax({
        url: futureWeatherURL,
        method: "GET"
    }).then(function(futureResponse) {
        console.log(futureResponse);
        $("#five-day-weather").empty();

        for(let i = 1; i < 6; i++) {
            var fiveDayInfo = {
                date: futureResponse.daily[i].dt,
                icon: futureResponse.daily[i].weather[0].icon,
                temp: futureResponse.daily[i].temp.day,
                humidity: futureResponse.daily[i].humidity
            };

            var currentDate = moment.unix(fiveDayInfo.date).format("MM/DD/YYYY");
            var iconURL = `<img src="https://openweathermap.org/img/w/${cityInfo.icon}.png" alt="${futureResponse.daily[i].weather[0].main}" />`;

            var fiveDayCard = $(`
                <div class="pl-2">
                    <div class ="card pl-2 pt-2 mb-2 bg-primary" style="width: 10rem;>
                        <div class="card-body">
                            <h4>${currentDate}</h4>
                            <p>${iconURL}</p>
                            <p>Temp: ${fiveDayInfo.temp} °F</p>
                            <p>Humidity: ${fiveDayInfo.humidity}\%</p>
                        </div>
                    </div>
                </div>        
            `);
            $("#five-day-weather").append(fiveDayCard);
        }
    });
}

// attach to click event listener. function needs to grab the searched value
futureWeather()

