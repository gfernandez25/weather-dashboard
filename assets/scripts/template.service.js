var templateService = {}

templateService.buildPastSearches = function (query) {
    var pastSearches =
        $("<button />")
            .addClass("past-search-btn btn btn-secondary btn-block")
            .html(query)

    return $(".search-menu")
        .append(pastSearches)
}

templateService.buildCurrentWeather = function (current, city) {
    var data = {
        name: city.name,
        date: new Date(Date.now()),
        iconUrl: _setIcon(current.weather[0].icon),
        temperature: current.temp,
        wind: current.wind_speed,
        humidity: current.humidity,
        uvIndex: current.uvi,
    }

    var icon = $("<img />")
        .attr({src: data.iconUrl})

    $(".card-title")
        .html("")
        .append(data.name, " ", data.date.toLocaleDateString('en-US'), icon)

    $(".temperature span").html(data.temperature)
    $(".wind span").html(data.wind + " MPH")
    $(".humidity span").html(data.humidity + " %")
    $(".uv-index span")
        .html(data.uvIndex)
        .removeClass(["extreme", "very-high", "high", "medium", "low"])
        .addClass(function(){

console.log("passed")

        switch (true) {
            case data.uvIndex > 11:
                return "extreme"

            case data.uvIndex >= 8:
                return "very-high"

            case data.uvIndex >= 6:
                return "high"

            case data.uvIndex >= 3:
                return "medium"

            case data.uvIndex < 3:
                return "low"
        }


    })
}

templateService.getCityWeather5DayForecast = function (data) {
    $(".forecast .card").remove();

    //todo: loop for each card
    for (var i = 0; i < data.length; i++) {
        var card = _buildCard(data[i], i);
        $(".forecast").append(card)
    }
}

function _buildCard(daily, i) {
    var date = new Date();
    date.setDate(date.getDate() + i + 1);

    var data = {
        date: date.toLocaleDateString('en-US'),
        iconUrl: _setIcon(daily.weather[0].icon),
        temp: daily.temp.day,
        wind: daily.wind_speed,
        humidity: daily.humidity,
    }

    var date =
        $("<h3 />")
            .addClass("forecast-weather-card-date font-weight-bold")
            .append(data.date)

    var icon = $("<img />")
        .addClass("forecast-weather-card-icon")
        .attr({src: data.iconUrl})
    var temp = $("<p />")
        .addClass("forecast-temperature")
        .append("Temp: ", data.temp)
    var wind = $("<p />")
        .addClass("forecast-wind")
        .append("Wind: ", data.wind, " MPH")
    var humidity = $("<p />")
        .addClass("forecast-humidity")
        .append("Humidity: ", data.humidity, " %")

    return $("<div />")
        .addClass("card forecast-weather-card")
        .append(date, icon, temp, wind, humidity)
}

function _setIcon(iconCode) {
    return "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
}