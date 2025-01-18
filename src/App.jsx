import React from 'react';
import Weather from './Weather';

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col justify-start items-center">
      <h1 className="text-2xl font-bold p-4">Welcome to the Weather App</h1>
      <Weather />
      <footer className="mt-8 mb-4">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}