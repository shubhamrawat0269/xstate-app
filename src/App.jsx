import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

// All Country API : --  https://crio-location-selector.onrender.com/countries
// All State API : --  https://crio-location-selector.onrender.com/country={countryName}/states
// All Cities API : --  https://crio-location-selector.onrender.com/country={countryName}/state={stateName}/cities

function App() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const getCountriesData = async () => {
    try {
      const res = await axios.get(
        `https://crio-location-selector.onrender.com/countries`
      );
      setCountries(res.data);
    } catch (error) {
      console.log(`Error fetching countries:`, error);
    }
  };

  useEffect(() => {
    getCountriesData();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        )
        .then((res) => {
          setStates(res.data);
          setSelectedState("");
          setCities([]);
          setSelectedCity("");
        })
        .catch((err) => console.log("Error fetching states:", err));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        )
        .then((res) => {
          setCities(res.data);
          setSelectedCity("");
        })
        .catch((err) => console.log("Error fetching states:", err));
    }
  }, [selectedCountry, selectedState]);

  return (
    <div className="city-selector">
      <h1>Select Location</h1>
      <div className="select__box">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="dropdown"
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="dropdown"
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="dropdown"
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>
      {selectedCity && (
        <h2 className="result">
          You selected <span className="highlight">{selectedCity},</span>
          <span className="fade">
            {" "}
            {selectedState}, {selectedCountry}
          </span>
        </h2>
      )}
    </div>
  );
}

export default App;
