# 🌤️ Weather App

A modern, responsive Weather Application that allows users to search for any city and retrieve real-time weather information using a public Weather API.

---

## 📌 Features

- 🔍 Search weather by city name
- 🌡️ Display current temperature
- ☁️ Show weather condition (Cloudy, Clear, Rain, etc.)
- 💧 Display humidity level
- 🌬️ Show wind speed
- ⚡ Fast API data fetching using JavaScript
- 📱 Fully responsive design (mobile & desktop)

---

## 🛠️ Built With

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- OpenWeatherMap API (or any weather API used)

---

## 🚀 How It Works

1. The user enters a city name.
2. The application sends a request to the Weather API.
3. The API returns real-time weather data in JSON format.
4. JavaScript dynamically updates the UI with the retrieved data.

---

## 📂 Project Structure

Weather_App/
│
├── index.html
├── style.css
├── index.js
└── README.md

---

## 🔑 API Setup

To use your own API key:

1. Get a free API key from:
   https://openweathermap.org/api

2. Open `index.js`

3. Replace:

```js
const apiKey = "YOUR_API_KEY";
