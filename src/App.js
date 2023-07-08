import './App.css';
import React, {useEffect, useState } from 'react';

function App() {
  const API_Key = "91bba7a336284bd7bc4111006231305";
  const [city,setCity] = useState('');
  const [weather,setWeather] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  }
  const handleInputBlur = () => {
    setIsInputFocused(false);
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_Key}&q=${city}`);
        const data = await response.json();
        if (response.ok) {
          setWeather(data);
        } else {
          setError(data.error.message);
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    if (isInputFocused === false && city !== '') {
      fetchWeather();
    }
  }, [city, isInputFocused]);

  return (
    <div className="weather-container">
      <h1> Weather Application </h1>
        <div className="weather-input">
          <input type='text' placeholder='Enter City' value={city} onChange={handleInputChange} onBlur={handleInputBlur} onFocus={() => setIsInputFocused(true)}/>
        </div>

      {weather ? (
        <div className="weather-info">
        <div className="weather-location"> {weather.location.name},{weather.location.country} </div>
          <div className="weather-details">
          <div className="weather-temp">
                <div className="temp">{weather.current.temp_c}&deg;C</div>
                <div className="temp-icon"><img src={weather.current.condition.icon} alt="weather icon" /></div>
              </div>
              <div className="weather-details-text">
                <p>Humidity: {weather.current.humidity}%</p>
                <p>Pressure: {weather.current.pressure_in} in</p>
                <p>Wind Speed: {weather.current.wind_kph} kph</p>
              </div>
            </div>
          </div>
      ) : error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
