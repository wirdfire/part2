import React, { useState } from "react";

const CountryList = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleShowCountry = (country) => {
    setSelectedCountry(country); // Set the selected country to be displayed
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
