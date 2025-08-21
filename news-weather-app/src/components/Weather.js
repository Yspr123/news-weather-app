import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weather.css";

const REACT_APP_WEATHER_API_KEY = "25a4969335520809c8c3bd95cc73f062";

const Weather = () => {
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => setError("Location access denied. Please allow location access.")
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  // Fetch weather and forecast
  useEffect(() => {
    if (!coords) return;

    const fetchWeather = async () => {
      try {
        // Current weather
        const weatherRes = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              lat: coords.lat,
              lon: coords.lon,
              units: "metric",
              appid: REACT_APP_WEATHER_API_KEY,
            },
          }
        );
        setWeather(weatherRes.data);

        // 5-day forecast (3-hour intervals)
        const forecastRes = await axios.get(
          "https://api.openweathermap.org/data/2.5/forecast",
          {
            params: {
              lat: coords.lat,
              lon: coords.lon,
              units: "metric",
              appid: REACT_APP_WEATHER_API_KEY,
            },
          }
        );
        setForecast(forecastRes.data.list.slice(0, 8)); // Next 24 hours (8 x 3h)
      } catch (err) {
        setError(
          `Failed to fetch weather data. ${err.response?.data?.message || err.message}`
        );
      }
    };

    fetchWeather();
  }, [coords]);

  if (error) return <p className="error">{error}</p>;
  if (!weather || !forecast.length) return <p>Loading weather data...</p>;

  const windDirection = (deg) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return directions[Math.round(deg / 22.5) % 16];
  };

  const weatherIcon = (main) => {
    switch (main.toLowerCase()) {
      case "clear":
        return "☀️";
      case "clouds":
        return "☁️";
      case "rain":
        return "🌧️";
      case "snow":
        return "❄️";
      case "thunderstorm":
        return "⚡";
      case "drizzle":
        return "🌦️";
      case "mist":
      case "fog":
        return "🌫️";
      default:
        return "🌤️";
    }
  };

  return (
    <div className="weather-dashboard">
      {/* Current Weather */}
      <div className="current-weather card">
        <h2>{weather.name}</h2>
        <div className="current-main">
          <span className="icon">{weatherIcon(weather.weather[0].main)}</span>
          <div>
            <h1>{Math.round(weather.main.temp)}°C</h1>
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
        <div className="details">
          <p>Humidity: {weather.main.humidity}%</p>
          <p>
            Wind: {weather.wind.speed} m/s, {windDirection(weather.wind.deg)}
          </p>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="forecast card">
        <h3>Next 24 Hours Forecast</h3>
        <div className="hourly-forecast">
          {forecast.map((hour, index) => (
            <div className="hour" key={index}>
              <p>{new Date(hour.dt * 1000).getHours()}:00</p>
              <span>{weatherIcon(hour.weather[0].main)}</span>
              <p>{Math.round(hour.main.temp)}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
          
