import React, { useEffect, useState } from 'react';
import * as Sentry from '@sentry/browser';
import { fetchWeather } from './api/weatherService';
import WeatherDisplay from './components/WeatherDisplay';

export default function Weather() {
  const [city, setCity] = useState('London');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleFetchWeather() {
    try {
      console.log('[Weather] Fetching weather for:', city);
      setLoading(true);
      setErrorMsg('');
      setWeatherData(null);

      const data = await fetchWeather(city);
      console.log('[Weather] Received data:', data);
      setWeatherData(data);
    } catch (error) {
      console.error('[Weather] Error:', error);
      Sentry.captureException(error);
      setErrorMsg('Unable to retrieve weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Fetch weather on first load for default city
    handleFetchWeather();
  }, []);

  function handleCityChange(e) {
    setCity(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!loading) {
      handleFetchWeather();
    }
  }

  return (
    <div className="h-full w-full max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-black">Weather</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          className="box-border w-full p-2 border border-gray-300 rounded mb-2 text-black"
          placeholder="Enter city"
          value={city}
          onChange={handleCityChange}
        />
        <button
          type="submit"
          disabled={loading}
          className={`cursor-pointer px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </form>

      {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

      {weatherData && <WeatherDisplay data={weatherData} />}
    </div>
  );
}