const apiKey ='badac628847a04a060f5363b3c1d8222';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(requestedCity) {
    const response = await fetch(apiUrl + requestedCity + `&appid=${apiKey}`);
    let data = await response.json();

    let city = document.querySelector(".city");
    let temp = document.querySelector(".temp");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");

    city.textContent = data.name;
    temp.textContent = data.main.temp + "°C";
    wind.textContent = data.wind.speed + " km/h";
    humidity.textContent = data.main.humidity + "%";

    console.log(data)

}

const btn = document.querySelector('#button');
const input = document.querySelector("#input");

btn.addEventListener('click', ()=> {
    checkWeather(input.value);
    console.log("clicked")
})

// checkWeather();