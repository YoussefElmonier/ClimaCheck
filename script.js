function getWeather() {
    const apiKey = '0114d15d5c2d679da0dd120ab8865abd';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
        });
}

function displayWeather(data) {
    const cityDisplay = document.getElementById('city-display');
    const tempDisplay = document.getElementById('temp-display');
    const descDisplay = document.getElementById('desc-display');

    if (data.cod === '404') {
        cityDisplay.innerHTML = 'City not found';
        tempDisplay.innerHTML = '--';
        descDisplay.innerHTML = '';
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;

        cityDisplay.textContent = cityName;
        tempDisplay.innerHTML = `${temperature}<span class="degree-symbol">°</span>`;
        descDisplay.textContent = description;
    }
}

function getFontAwesomeIcon(iconCode) {
    const mapping = {
        '01d': 'fas fa-sun',
        '01n': 'fas fa-moon',
        '02d': 'fas fa-cloud-sun',
        '02n': 'fas fa-cloud-moon',
        '03d': 'fas fa-cloud',
        '03n': 'fas fa-cloud',
        '04d': 'fas fa-cloud',
        '04n': 'fas fa-cloud',
        '09d': 'fas fa-cloud-showers-heavy',
        '09n': 'fas fa-cloud-showers-heavy',
        '10d': 'fas fa-cloud-rain',
        '10n': 'fas fa-cloud-rain',
        '11d': 'fas fa-bolt',
        '11n': 'fas fa-bolt',
        '13d': 'fas fa-snowflake',
        '13n': 'fas fa-snowflake',
        '50d': 'fas fa-smog',
        '50n': 'fas fa-smog'
    };
    return mapping[iconCode] || 'fas fa-question';
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = '';

    const forecastPoints = hourlyData.slice(0, 6);

    forecastPoints.forEach(item => {
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const faIcon = getFontAwesomeIcon(iconCode);

        const hourlyItemHtml = `
            <div class="forecast-item">
                <i class="${faIcon}"></i>
                <span class="forecast-temp">${temperature}</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}
