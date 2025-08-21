import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const REACT_APP_WEATHER_API_KEY = "25a4969335520809c8c3bd95cc73f062";

const Navbar = () => {
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();

  // Get user's location on mount
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
          console.error("Location access denied.");
        }
      );
    }
  }, []);

  // Fetch current weather for navbar
  useEffect(() => {
    if (!coords) return;

    const fetchWeather = async () => {
      try {
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
        console.error("Failed to fetch weather data:", err);
      }
    };

    fetchWeather();
  }, [coords]);

  // Map weather condition to icons
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
    <nav className="navbar">
      {/* Left side: weather info */}
      <div
        className="navbar-weather"
        onClick={() => navigate("/weather")}
        style={{ cursor: "pointer" }}
      >
        {weather ? (
          <>
            <span className="weather-icon">
              {weatherIcon(weather.weather[0].main)}
            </span>
            <div className="weather-details">
              <span className="weather-temp">{Math.round(weather.main.temp)}°C</span>
              <span className="weather-location">{weather.name}</span>
            </div>
          </>
        ) : (
          <span>Loading...</span>
        )}
      </div>

      {/* Title */}
      <h2 className="navbar-title">News & Weather</h2>

      {/* Links */}
      <div className="navbar-links">
        <NavLink to="/global" className={({ isActive }) => (isActive ? "active" : "")}>
          Global News
        </NavLink>
        <NavLink to="/technology" className={({ isActive }) => (isActive ? "active" : "")}>
          Technology
        </NavLink>
        <NavLink to="/finance" className={({ isActive }) => (isActive ? "active" : "")}>
          Finance
        </NavLink>
        <NavLink to="/science" className={({ isActive }) => (isActive ? "active" : "")}>
          Science & Innovation
        </NavLink>
        <NavLink to="/weather" className={({ isActive }) => (isActive ? "active" : "")}>
          Weather
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
