import React, { useState, useEffect } from "react";
import axios from "axios";

const REACT_APP_WEATHER_API_KEY = "25a4969335520809c8c3bd95cc73f062";

const Weather = () => {
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // Get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          setError("Location access denied. Please allow location access.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  // Fetch weather when coords are set
  useEffect(() => {
    if (!coords) return;

    const fetchWeather = async () => {
      try {
        // Use /data/2.5/weather for current weather
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              lat: coords.lat,
              lon: coords.lon,
              units: "metric",
              appid: REACT_APP_WEATHER_API_KEY,
            },
          }
        );
        setWeather(response.data);
      } catch (err) {
        setError(
          "Failed to fetch weather data. Please check your API key and permissions."
        );
      }
    };

    fetchWeather();
  }, [coords]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!weather) return <p>Loading weather data...</p>;

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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Current Weather</h2>
      <p>Location: {weather.name}</p>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>
        Wind: {weather.wind.speed} m/s,{" "}
        {windDirection(weather.wind.deg)}
      </p>
      <p>Weather: {weather.weather[0].description}</p>
    </div>
  );
};

export default Weather;
   
 
