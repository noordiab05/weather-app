import React from 'react';
import Weekly from './Weekly';
import Hourly from './Hourly';

function Home({ location, setLocation, weather, search, keys, hours, weatherCondition, getEmoji, getBackground })
{
    return(
        <div className="box-div">

            {!weather.location && (
                <div className="searchbox">
                    <div className="moto">Find Your Weather With Weather Finder...</div>
                    <input
                    type="text"
                    className="search-bar"
                    placeholder="Search location..."
                    onChange={e => setLocation(e.target.value)}
                    value={location}
                    onKeyPress={search}
                    />
                </div>
            )}

                {weather.location ? (
                <div>
                    <div className="location-box">
                        <div className="location">📍 {weather.location.name}, {weather.location.country}</div>
                        <div className="date"></div>
                        <div className="current-temp">
                        {weather.current ? `${Math.round(weather.current.temp_c)}°C` : ""}{" "}{getEmoji(weatherCondition)}
                        </div>
                    </div>
                </div>
                ): ('')}


            {weather.forecast && (
              <div className="Seven-Day-Forecast-Box">
                <div className="Seven-Day-Forecast-Header">7 Day Forecast
                  <div className="Weekly-Forecast-Format">
                    <Weekly dayKey={keys[0]} id="today" location={location} weather={weather} />
                    <Weekly dayKey={keys[1]} id="other" location={location} weather={weather} />
                    <Weekly dayKey={keys[2]} id="other" location={location} weather={weather} />
                    <Weekly dayKey={keys[3]} id="other" location={location} weather={weather} />
                    <Weekly dayKey={keys[4]} id="other" location={location} weather={weather} />
                    <Weekly dayKey={keys[5]} id="other" location={location} weather={weather} />
                    <Weekly dayKey={keys[6]} id="other" location={location} weather={weather} />
                  </div>
                </div>
              </div>
            )}


                {weather.forecast ? (
                  <div className="Hourly-Forecast-Box">
                    <div className="Hourly-Forecast-Title">Today's Forecast</div>
                    <div className="Hourly-Forecast-Items">
                      <Hourly location={location} weather={weather} hour={hours[0]} />
                      <Hourly location={location} weather={weather} hour={hours[1]} />
                      <Hourly location={location} weather={weather} hour={hours[2]} />
                      <Hourly location={location} weather={weather} hour={hours[3]} />
                      <Hourly location={location} weather={weather} hour={hours[4]} />
                    </div>
                  </div>
                ) : ('')}
        
        </div>
    );
}

export default Home;