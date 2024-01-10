const apiKey = '0fc400c26510125d63fc4f42e31938e7';
const city = 'London';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey;

async function getWeatherData() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

function displayWeatherWidgets(weatherData) {
  const weatherContainer = document.getElementById('weather-container');

  if (!weatherData) {
    console.error('No weather data available.');
    return;
  }

  const cityName = weatherData.city.name;
  console.log('City Name:', cityName);

  const cityElement = document.createElement('h2');
  cityElement.textContent = `Weather forecast for ${cityName}`;
  weatherContainer.appendChild(cityElement);

  const now = new Date();
  const nextSevenDays = Array.from({ length: 7 }, (_, index) => {
    const nextDay = new Date(now);
    nextDay.setDate(now.getDate() + index + 1);
    return nextDay.toLocaleDateString('en-US', { weekday: 'long' });
  });

  const filteredWeatherData = weatherData.list.filter(item => {
    const itemDate = new Date(item.dt * 1000 + weatherData.city.timezone * 1000);
    const itemDay = itemDate.toLocaleDateString('en-US', { weekday: 'long' });
    return nextSevenDays.includes(itemDay);
  });

  filteredWeatherData.forEach(item => {
    const date = new Date(item.dt * 1000 + weatherData.city.timezone * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const temperature = `${Math.round(item.main.temp)}°C`;
    const icon = item.weather[0].icon;

    const widget = createWeatherWidget(day, temperature, getWeatherIconUrl(icon));
    weatherContainer.appendChild(widget);
  });
}

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

function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}.png`;
}

getWeatherData().then(weatherData => {
  displayWeatherWidgets(weatherData);
});
