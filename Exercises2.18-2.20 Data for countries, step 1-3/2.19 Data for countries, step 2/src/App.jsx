import axios from "axios";
import { useState, useEffect } from "react";
import CountryList from "./components/CountryList.jsx";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearch(query);

    if (query.length > 0) {
      const results = countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
      setFilterCountries(results);
    } else {
      setFilterCountries([]);
    }
  };

  return (
    <div>
      <h1>Country Finder</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={handleSearchChange}
      />
      <CountryList countries={filterCountries} />
    </div>
  );
};

export default App;
