import React, { useState } from 'react';
import { fetchCurrentWeather, fetchDailyForecast } from './weatherServices';
import './index.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [error, setError] = useState('');

  const getWeatherData = async (city) => {
    try {
      setError('');
      const currentWeatherData = await fetchCurrentWeather(city);
      const dailyForecastData = await fetchDailyForecast(city);

      if (!currentWeatherData || !dailyForecastData) {
        setError('Staden hittades inte');
        setCurrentWeather(null);
        setDailyForecast(null);
      } else {
        setCurrentWeather(currentWeatherData);
        setDailyForecast(dailyForecastData);
      }
    } catch (err) {
      setError('Kunde inte hämta väderdata');
    }
  };

  const handleSearch = async () => {
    if (city) {
      await getWeatherData(city);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="weather-container">
      <h1>Väderapp</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Skriv in stad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Sök</button>
      </div>
      {error && <p className="error">{error}</p>}
      {currentWeather && dailyForecast && (
        <div className="weather-info">
          <div className="current-weather">
            <h2>Nuvarande väder i {city}</h2>
            <p>{new Date().toLocaleString()}</p>
            <p className="temperature">{currentWeather.temp}°C</p>
            <p className="description">{currentWeather.weather.description}</p>
            <p>Vind: {currentWeather.wind_spd} m/s {currentWeather.wind_cdir}</p>
            <p>Fuktighet: {currentWeather.rh}%</p>
            <p>Sikt: {currentWeather.vis} km</p>
          </div>
          <div className="daily-forecast">
            <h3>8-dagars prognos</h3>
            <div className="daily-items">
              {dailyForecast.map((day, index) => (
                <div key={index} className="daily-item">
                  <p>{new Date(day.valid_date).toLocaleDateString()}</p>
                  <p>{day.temp}°C</p>
                  <p>{day.weather.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;