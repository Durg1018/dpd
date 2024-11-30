document.addEventListener("DOMContentLoaded", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            getWeatherData(position.coords.latitude, position.coords.longitude);
        }, () => {
            getWeatherDataForCity("Delhi");
        });
    } else {
        getWeatherDataForCity("Delhi");
    }
});

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeatherDataForCity(city);
    }
}

async function getWeatherDataForCity(city) {
    const apiKey = "1a1b5c256e5c94f1a70d737f91a17968";
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        displayCurrentWeather(data);
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        const forecastData = await forecastResponse.json();
        displayForecastWeather(forecastData);
    } catch (error) {
        alert("City not found");
    }
}

async function getWeatherData(lat, lon) {
    const apiKey = "1a1b5c256e5c94f1a70d737f91a17968";
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        displayCurrentWeather(data);
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const forecastData = await forecastResponse.json();
        displayForecastWeather(forecastData);
    } catch (error) {
        alert("Location not found");
    }
}

function displayCurrentWeather(data) {
    const currentWeather = document.getElementById('currentWeather');
    currentWeather.innerHTML = `
        <div class="weather-card">
            <h2>Current Weather in ${data.name}</h2>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>Date and Time: ${new Date(data.dt * 1000).toLocaleString()}</p>
        </div>
    `;
}

function displayForecastWeather(data) {
    const forecastWeather = document.getElementById('forecastWeather');
    forecastWeather.innerHTML = `<h2>7-Day Forecast</h2>`;
    forecastWeather.innerHTML += data.list.map(item => `
        <div class="weather-card">
            <p>Date and Time: ${new Date(item.dt * 1000).toLocaleString()}</p>
            <p>Weather: ${item.weather[0].description}</p>
            <p>Temperature: ${item.main.temp} °C</p>
            <p>Humidity: ${item.main.humidity}%</p>
        </div>
    `).join('');
}
