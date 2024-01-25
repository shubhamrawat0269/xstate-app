import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

// All Country API : --  https://crio-location-selector.onrender.com/countries
// All State API : --  https://crio-location-selector.onrender.com/country={countryName}/states
// All Cities API : --  https://crio-location-selector.onrender.com/country={countryName}/state={stateName}/cities

function App() {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [isStateDisable, setStateDisable] = useState(true);
  const [isCityDisable, setCityDisable] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  const getCountryData = async (url) => {
    try {
      const countryData = await fetch(url);
      const countryDataInJSON = await countryData.json();

      setCountry(countryDataInJSON);
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  const getStateData = async (url) => {
    try {
      const stateData = await fetch(url);
      const stateDataInJSON = await stateData.json();

      setState(stateDataInJSON);
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  const getCityData = async (url) => {
    try {
      const cityData = await fetch(url);
      const cityDataInJSON = await cityData.json();

      setCity(cityDataInJSON);
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  const handleCountryData = (e) => {
    // console.log(e.target.value);
    setStateDisable(false);
    setCountryName(e.target.value);
    // make api call here
    getStateData(
      `https://crio-location-selector.onrender.com/country=${e.target.value}/states`
    );
  };

  const handleStateData = (e) => {
    // console.log(e.target.value);
    setCityDisable(false);
    setStateName(e.target.value);
    // make api call here
    getCityData(
      `https://crio-location-selector.onrender.com/country=${countryName}/state=${e.target.value}/cities`
    );
  };

  const handleCityData = (e) => {
    // console.log(e.target.value);
    setCityName(e.target.value);
    setShowBanner(true);
  };

  useEffect(() => {
    getCountryData(`https://crio-location-selector.onrender.com/countries`);
  }, [country]);

  return (
    <div className="main__div">
      <h1>Select Location</h1>
      <div className="select__box">
        <select onChange={handleCountryData}>
          <option value="Select Country" selected>
            Select Country
          </option>
          {country.map((cur, id) => (
            <option key={id} value={cur}>
              {cur}
            </option>
          ))}
        </select>
        <select onChange={handleStateData} disabled={isStateDisable}>
          <option value="Select State">Select State</option>
          {state.map((cur, id) => (
            <option key={id} value={cur}>
              {cur}
            </option>
          ))}
        </select>
        <select onChange={handleCityData} disabled={isCityDisable}>
          <option value="Select City">Select City</option>
          {city.map((cur, id) => (
            <option key={id} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>
      {showBanner && (
        <p>
          You Selected {cityName},&nbsp;
          <span style={{ color: "gray" }}>
            {stateName}, {countryName}
          </span>
        </p>
      )}
    </div>
  );
}

export default App;
