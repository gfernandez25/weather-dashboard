const openWeather = {
    settings: {
        apiKey: 'fb2cbe3eb0c5579ca77d4633b6af2057',
        url: {
            currentWeather: "http://api.openweathermap.org/data/2.5/weather",
            oneCallAPI: "https://api.openweathermap.org/data/2.5/onecall"
        },
    },
}

openWeather.getCity = async function (query) {
    var url = openWeather.settings.url.currentWeather;
    var queryStrings = {
        q: query,
        appid: openWeather.settings.apiKey,
        units: "imperial"
    }

    var request = _setQueryStrings(url, queryStrings);

    let response = await fetch(request)
    let data = await response.json();

    return {
        name: data.name,
        coord: data.coord
    };
}

openWeather.getWeather = async function (city) {
    var url = openWeather.settings.url.oneCallAPI;
    var queryStrings = {
        lat: city.coord.lat,
        lon: city.coord.lon,
        exclude: "minutely,hourly,alerts",
        appid: openWeather.settings.apiKey,
        units: "imperial"
    }

    var request = _setQueryStrings(url, queryStrings);

    let response = await fetch(request)
    let data = await response.json();

    return {
        current: data.current,
        forecast5Days: data.daily.slice(0, 5)
    }
}


function _setQueryStrings(url, queryStrings = {}) {
    var url = new URL(url);

    url.search = new URLSearchParams(queryStrings).toString();

    return url;
}
