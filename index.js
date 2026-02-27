

// ================================
// DOM Elements
// ================================

const dateElement = document.getElementById('Date');
const cityElement = document.getElementById('CityName');
const imgElement = document.getElementById('img');
const descriptionElement = document.getElementById('description');
const tempElement = document.getElementById('temp');
const tempMaxElement = document.getElementById('tempMax');
const tempMinElement = document.getElementById('tempMin');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');
const inputCityElement = document.getElementById('inputCity');
const searchButton = document.querySelector('.search-btn');

// ================================
// Month Configuration
// ================================

const Months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// ================================
// Initialize Date on Load
// ================================

function initializeDate() {
    const dateObj = new Date();
    const month = Months[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    dateElement.textContent = `${month} ${day}, ${year}`;
}

// ================================
// Loading State Management
// ================================

function setLoadingState(isLoading) {
    if (isLoading) {
        searchButton.disabled = true;
        searchButton.style.opacity = '0.6';
        inputCityElement.disabled = true;
    } else {
        searchButton.disabled = false;
        searchButton.style.opacity = '1';
        inputCityElement.disabled = false;
    }
}

// ================================
// Animate Elements In
// ================================

function animateElementIn(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(10px)';
    element.offsetHeight; // Trigger reflow
    element.style.transition = 'all 300ms ease-in-out';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';

    setTimeout(() => {
        element.style.transition = '';
    }, 300);
}

// ================================
// Get Weather Data
// ================================

const getWeather = async () => {
    const cityName = inputCityElement.value.trim();

    // Validation
    if (!cityName) {
        showError('Please enter a city name');
        return;
    }

    setLoadingState(true);

    try {
        // Fetch weather data
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f474874a6adad19d7f27130e8656af5d&units=metric`,
            {
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        // Handle HTTP errors
        if (!response.ok) {
            if (response.status === 404) {
                showError('City not found. Please try again.');
            } else {
                showError('Unable to fetch weather data. Please try again.');
            }
            setLoadingState(false);
            return;
        }

        const weatherData = await response.json();

        // Update weather information with animations
        updateWeatherDisplay(weatherData);

        // Clear input
        inputCityElement.value = '';
        setLoadingState(false);

    } catch (error) {
        console.error('Error fetching weather:', error);
        showError('Network error. Please check your connection.');
        setLoadingState(false);
    }
};

// ================================
// Update Weather Display
// ================================

function updateWeatherDisplay(weatherData) {
    const { name, main, weather, wind, clouds } = weatherData;

    // Update city name
    animateElementIn(cityElement);
    cityElement.textContent = name;

    // Update weather description
    animateElementIn(descriptionElement);
    descriptionElement.textContent = weather[0].main;

    // Update temperature
    animateElementIn(tempElement);
    tempElement.textContent = Math.round(main.temp);

    // Update min/max temperature
    animateElementIn(tempMaxElement);
    tempMaxElement.textContent = `${Math.round(main.temp_max)}°C`;

    animateElementIn(tempMinElement);
    tempMinElement.textContent = `${Math.round(main.temp_min)}°C`;

    // Update humidity
    animateElementIn(humidityElement);
    humidityElement.textContent = `${main.humidity}%`;

    // Update wind speed
    animateElementIn(windSpeedElement);
    windSpeedElement.textContent = `${wind.speed.toFixed(1)} m/s`;

    // Update weather icon
    animateElementIn(imgElement);
    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    imgElement.innerHTML = `<img src="${iconUrl}" alt="${weather[0].main}" />`;

    // Update background based on weather
    updateBackgroundByWeather(weather[0].main);
}

// ================================
// Update Background by Weather Type
// ================================

function updateBackgroundByWeather(weatherType) {
    const bgElement = document.querySelector('.background');
    const weatherLower = weatherType.toLowerCase();

    const weatherGradients = {
        'clear': 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 25%, #7dd3fc 50%, #0284c7 75%, #0c4a6e 100%)',
        'clouds': 'linear-gradient(135deg, #f0f9ff 0%, #cffafe 25%, #a5f3fc 50%, #06b6d4 75%, #0369a1 100%)',
        'rain': 'linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 25%, #95a5a6 50%, #34495e 75%, #2c3e50 100%)',
        'drizzle': 'linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 25%, #95a5a6 50%, #34495e 75%, #2c3e50 100%)',
        'thunderstorm': 'linear-gradient(135deg, #2c3e50 0%, #34495e 25%, #50688f 50%, #3b4f6a 75%, #253549 100%)',
        'snow': 'linear-gradient(135deg, #f8fbff 0%, #e8f4f8 25%, #d1e7f0 50%, #a8d8e8 75%, #7ec8e3 100%)',
        'mist': 'linear-gradient(135deg, #ecf0f1 0%, #d5dbdb 25%, #bdc3c7 50%, #95a5a6 75%, #7f8c8d 100%)',
        'smoke': 'linear-gradient(135deg, #ecf0f1 0%, #d5dbdb 25%, #bdc3c7 50%, #95a5a6 75%, #7f8c8d 100%)',
        'haze': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #cffafe 50%, #a5f3fc 75%, #7dd3fc 100%)',
        'dust': 'linear-gradient(135deg, #fef5e7 0%, #fadbd8 25%, #f5b7b1 50%, #f1948a 75%, #e74c3c 100%)',
        'fog': 'linear-gradient(135deg, #ecf0f1 0%, #d5dbdb 25%, #bdc3c7 50%, #95a5a6 75%, #7f8c8d 100%)',
        'sand': 'linear-gradient(135deg, #fef9e7 0%, #fbeee6 25%, #f8b88b 50%, #f4a460 75%, #d4a574 100%)',
        'ash': 'linear-gradient(135deg, #ecf0f1 0%, #d5dbdb 25%, #bdc3c7 50%, #95a5a6 75%, #7f8c8d 100%)',
        'squall': 'linear-gradient(135deg, #34495e 0%, #2c3e50 25%, #1a252f 50%, #0c1117 75%, #1a1f2e 100%)',
        'tornado': 'linear-gradient(135deg, #34495e 0%, #2c3e50 25%, #1a252f 50%, #0c1117 75%, #1a1f2e 100%)'
    };

    const gradientKey = Object.keys(weatherGradients).find(key =>
        weatherLower.includes(key)
    ) || 'clear';

    bgElement.style.background = weatherGradients[gradientKey];
    bgElement.style.animation = 'none';
}

// ================================
// Error Handling
// ================================

function showError(message) {
    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        font-size: 0.875rem;
        font-weight: 500;
        z-index: 1000;
        animation: slideDown 300ms ease-out;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);

    // Remove error after 4 seconds
    setTimeout(() => {
        errorDiv.style.animation = 'slideUp 300ms ease-out';
        setTimeout(() => errorDiv.remove(), 300);
    }, 4000);
}

// Add animation keyframes for error notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

// ================================
// Event Listeners
// ================================

// Search on Enter key
inputCityElement.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getWeather();
    }
});

// ================================
// Initialize App
// ================================

document.addEventListener('DOMContentLoaded', () => {
    initializeDate();
    // Optional: Get weather for default city on load
    // inputCityElement.value = 'London';
    // getWeather();
});
