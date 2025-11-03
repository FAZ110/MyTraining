
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const WEATHER_API_KEY = CONFIG.WEATHER_API_KEY;

async function checkWeather(requestedCity) {

    const response = await fetch(apiUrl + requestedCity + `&appid=${WEATHER_API_KEY}`);
    let data = await response.json();

    if (data.cod ==="404"){
        document.querySelector("#error").style.display = "flex";
        return;
    }

    document.querySelector("#error").style.display = "none";

    let city = document.querySelector(".city");
    let temp = document.querySelector(".temp");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let icon = document.querySelector("#icon");

    city.textContent = data.name;
    temp.textContent = Math.round(data.main.temp) + "°C";
    wind.textContent = data.wind.speed + " km/h";
    humidity.textContent = data.main.humidity + "%";

    document.querySelector(".output-container").style.display = "flex";

    let weatherIcon = data.weather[0].main;
    switch(weatherIcon){
        case "Clouds":
            icon.src = "images/clouds.png";
            break;
        case "Clear":
            icon.src = "images/clear.png";
            break;
        case "Rain":
            icon.src = "images/rain.png";
            break;
        case "Drizzle":
            icon.src = "images/drizzle.png";
            break;
        case "Mist":
            icon.src = "images/mist.png";
            break;
        case "Snow":
            icon.src = "images/snow.png";
            break;
        default:
            icon.src = "images/clear.png";
            break;
    }

    





}

const btn = document.querySelector('#button');
const input = document.querySelector("#input");

btn.addEventListener('click', ()=> {
    checkWeather(input.value);
})


