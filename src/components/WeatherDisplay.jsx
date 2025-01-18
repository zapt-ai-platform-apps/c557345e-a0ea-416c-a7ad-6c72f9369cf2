import React from 'react';

export default function WeatherDisplay({ data }) {
  return (
    <div className="bg-white p-4 rounded shadow text-black">
      <p className="font-semibold text-lg">City: {data.name}</p>
      <p>Temperature: {data.main.temp}°C</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Conditions: {data.weather[0].main}</p>
    </div>
  );
}