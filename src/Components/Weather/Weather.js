import React, { useState } from "react";
import axios from "axios";
import './Weather.css'

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const inputChangeHandler = (e) => {
    setCity(e.target.value);
  };
  const fetchWeather = async () => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=95a493f0f806eaca79cce2af0e2faa52`
          );
      setWeather(response);
      setError(null);
    //   console.log(response);
    } catch(error) {
      setError("Featching Weather data.");
      setWeather(null);
    }
  };
  const buttonClickHandler = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="weather-container">
      <input
        type="text"
        placeholder="Enter City Name"
        value={city}
        onChange={inputChangeHandler}
      ></input>
      <button type="submit" onClick={buttonClickHandler}>
        Get Weather
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>Weather in {weather.data.name}</h2>
          <p>Temperature is : {weather.data.main.temp} Kelvin</p>
          <p>Description: {weather.data.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
