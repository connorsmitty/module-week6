// script.js

// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const apiKey = 'YOUR_API_KEY';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=CityName&appid=' + apiKey;

// Function to fetch weather data from the API
async function getWeatherData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Function to display weather widgets
function displayWeatherWidgets(weatherData) {
  const weatherContainer = document.getElementById('weather-container');
  
  weatherData.list.forEach(item => {
    const date = new Date(item.dt_txt);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const temperature = `${Math.round(item.main.temp)}°C`;
    const icon = item.weather[0].icon;

    const widget = createWeatherWidget(day, temperature, getWeatherIconUrl(icon));
    weatherContainer.appendChild(widget);
  });
}

// Function to create a weather widget
function createWeatherWidget(day, temperature, iconUrl) {
  const widget = document.createElement('div');
  widget.className = 'weather-widget';

  const dayElement = document.createElement('div');
  dayElement.className = 'day';
  dayElement.textContent = day;

  const temperatureElement = document.createElement('div');
  temperatureElement.className = 'temperature';
  temperatureElement.textContent = temperature;

  const iconElement = document.createElement('img');
  iconElement.className = 'icon';
  iconElement.src = iconUrl;

  widget.appendChild(dayElement);
  widget.appendChild(temperatureElement);
  widget.appendChild(iconElement);

  return widget;
}

// Function to get the weather icon URL
function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}.png`;
}

// Fetch weather data and display widgets
getWeatherData().then(weatherData => {
  displayWeatherWidgets(weatherData);
});
