import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Fetch country data from the API
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  // Filter countries based on query input
  useEffect(() => {
    if (search) {
      const results = countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCountries(results);
    } else {
      setFilteredCountries([]);
    }
  }, [search, countries]);

  return (
    <div>
      <div>
        <label>Find countries: </label>
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {filteredCountries.length > 10 ? (
        <p>Too many matches, please specify another filter</p>
      ) : (
        filteredCountries.map((country) => (
          <div key={country.cca3}>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
          </div>
        ))
      )}
    </div>
  );
};
export default App;
