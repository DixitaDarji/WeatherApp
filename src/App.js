import React, { useState } from "react";
import { IoMdRainy } from 'react-icons/io';
import { BsFillCloudsFill } from 'react-icons/bs'
const api = {
  key: "25ae993f44b5b970daf09a09fe1b04be",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {


  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const rain = <IoMdRainy />;
  const cloud = <BsFillCloudsFill />
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result);
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={
      (typeof weather.main !== "undefined")
        ? ((weather.main.temp > 16)
          ? 'app warm'
          : 'app')
        : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main !== "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">
                {dateBuilder(new Date())}
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)}°c
                </div>
                {/* <div className="weather">
                  {weather.weather[0].main}
                </div> */}
                {(typeof weather.weather[0].main !== "undefined")
                ?
                  (
                    (weather.weather[0].main === "Rain")
                    ?
                      (<div className="weather">
                      <i>{rain}</i>
                      </div>)
                    :
                      ((weather.weather[0].main === "Clouds")
                      ?
                        (<div className="weather">
                          <i>{cloud}</i>
                        </div>)
                      :
                        (<div className="weather">
                          {weather.weather[0].main}
                        </div>))
                  ) 
                :('')
                }
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
