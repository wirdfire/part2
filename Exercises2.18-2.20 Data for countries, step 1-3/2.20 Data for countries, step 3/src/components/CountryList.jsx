import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryList = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  // Fetch weather data for the selected country's capital
  useEffect(() => {
    if (selectedCountry) {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Fetch API key from environment variable
      const capital = selectedCountry.capital[0]; // Get the capital of the selected country
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;

      axios
        .get(url)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => console.error("Error fetching weather data:", error));
    }
  }, [selectedCountry]);

  // Function to handle the "Show" button click
  const handleShowCountry = (country) => {
    setSelectedCountry(country);
    setWeather(null);
  };

  if (countries.length > 10) {
    return <p>Too many matches, please refine your search.</p>;
  }

  // If only one country is found or selected via "Show" button, show detailed view
  if (countries.length === 1 || selectedCountry) {
    const country = selectedCountry || countries[0];
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          width="150"
        />

        {/* Weather section */}
        {weather && (
          <div>
            <h3>Weather in {country.capital[0]}</h3>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Wind: {weather.wind.speed} m/s</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          </div>
        )}

        {/* Button to go back to list view */}
        {selectedCountry && (
          <button onClick={() => setSelectedCountry(null)}>Back to List</button>
        )}
      </div>
    );
  }

  // Display the list of countries with a "Show" button for each
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => handleShowCountry(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
