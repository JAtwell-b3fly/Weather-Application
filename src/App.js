import './App.css';
import React from 'react';
import { useState } from 'react';
import thunderstorm from "../src/images/storm.png";
import snow from "../src/images/snow.png";
import rain from "../src/images/rain.png";
import clear_sky from "../src/images/sun.png";
import cloudy from "../src/images/cloudy (3).png";

const api = {
  key: "6f74fa6463c20d5b88cdaaf7e08d7fa8",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? "app warm" : "app") : "app_default"}>
      <main>
        <div className='search_box'>
          <input 
                type="text"
                className='search_bar'
                placeholder='Search...'
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className='location_box'>
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className='date'>{dateBuilder(new Date())}</div>
        </div>
        <div className='weather_box'>
          <div className='temp'>{Math.round(weather.main.temp)}℃</div>
          <div className='feels_like'>Feels Like{"\t"}{Math.round(weather.main.feels_like)}℃</div>
          <div className='weather'>{weather.weather[0].main}</div>
        </div>
        <div className="weather_box_2">
          <div className='weather_indicators'>
            {(weather.weather[0].main === "Thunderstorm") 
            ? 
            <div>
              <svg width="50px" height="50px">
                <image href={thunderstorm} height="100%" width="100%" />
              </svg>
            </div>
            : 
            "" }

            {(weather.weather[0].main === "Snow") 
            ? 
            <div>
              <svg width="50px" height="50px">
                <image href={snow} height="100%" width="100%" />
              </svg>
            </div>
            : 
            "" }

            {(weather.weather[0].main === "Rain") 
            ? 
            <div>
              <svg width="50px" height="50px">
                <image href={rain} height="100%" width="100%" />
              </svg>
            </div>
            : 
            "" }

          {(weather.weather[0].main === "Clouds") 
            ? 
            <div>
              <svg width="50px" height="50px">
                <image href={cloudy} height="100%" width="100%" />
              </svg>
            </div>
            : 
            "" }

            {(weather.weather[0].main === "Clear") 
            ? 
            <div>
              <svg width="50px" height="50px">
                <image href={clear_sky} height="100%" width="100%" />
              </svg>
            </div>
            : 
            "" }
          </div>
          <div className='temp_min_max'>
            {Math.round(weather.main.temp_min)}
           /
           {Math.round(weather.main.temp_max)}
            </div>
        </div>
        </div>
        ) : ("")}
      </main>
    </div>
  );
}

export default App;
