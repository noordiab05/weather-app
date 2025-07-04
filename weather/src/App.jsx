import React, {useState} from 'react';
import Weekly from './Weekly';
import Hourly from './Hourly';


const api= {
  key:"c1270a40cd4c4a9a83a131108250307",
  base:  "http://api.weatherapi.com/v1"
}


function App()
{

    const[location, setLocation]= useState('');
    const[weather, setWeather]= useState({});
    
    const search= evt =>{
        if(evt.key === "Enter")
        {
          fetch(`${api.base}/forecast.json?key=${api.key}&q=${location}&days=7`)
          .then(res=>res.json())
          .then(result=>{
            setWeather(result);
            setLocation('');
            });
        }
      }

      const getKey= () =>
      {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let currentDay= days[new Date().getDay()];
        //Sunday=0
        //Monday=1
        //Tuesday=2
        //Wednesday=3
        //Thursday=4
        //Friday=5
        //Saturday=6
        switch(currentDay)
        {
            case "Sunday":
                return [0,1,2,3,4,5,6];
                break;
            case "Monday":
                return [1,2,3,4,5,6,0];
                break;
            case "Tuesday":
                return [2,3,4,5,6,0,1];
                break;
            case "Wednesday":
                return [3,4,5,6,0,1,2];
                break;
            case "Thursday":
                return [4,5,6,0,1,2,3];
                break;
            case "Friday":
                return [5,6,0,1,2,3,4];
                break;
            case "Saturday":
                return [6,0,1,2,3,4,5];
                break;
            default:
                return "";
                break;
        }

      }

      const getHours = () =>{
        const hours= [];
        let currentHour = parseInt(weather.location.localtime.split(' ')[1].split(':')[0], 10);
        //obtains 4 intervals of 3 hours each
        hours.push(currentHour);
        for(let i=0; i<=3; i++)
        {
            currentHour+=3;
            hours.push(currentHour);

        }

        return hours;
      }


    const keys= getKey();
    const hours = (weather && weather.location && weather.location.localtime) ? getHours() : [];
    const weatherCondition = weather.current?.condition?.text || "";
    

    function getEmoji(weatherCondition)
    {
        if(weatherCondition==='Sunny' || weatherCondition.includes('Clear'))
        {
            return '☀️';
        }
        else if(weatherCondition.includes('Cloudy'))
        {
            return '☁️';
        }
        else if(weatherCondition.includes('Fog'))
        {
            return '🌫️';
        }
        else if(weatherCondition.includes('Partly Cloudy') || weatherCondition.includes('Partly cloudy') )
        {
            return '⛅';
        }
        else if(weatherCondition.includes("rain") || weatherCondition.includes("Rain"))
        {
            return '🌧️';
        }
        else
        {
            return weatherCondition;
        }
    }

    const getBackground = () =>{
        if(hours[0]<5 || hours[0]>=20)
        {
            return 'night';
        }
        if(getEmoji(weatherCondition) === '☀️' || getEmoji(weatherCondition)==='⛅')
        {
            return 'sunny';
        }
        else if(getEmoji(weatherCondition)==='☁️' || getEmoji(weatherCondition)==='🌫️')
        {
            return 'cloudy';
        }
        else if(getEmoji(weatherCondition)==='🌧️')
        {
            return 'rain'
        }
        else
        {
            return 'default';
        }
    }

    return(
        <div className= "main-div" id= {getBackground()}>
            <div className="left-content">
                <div className="header-row">
                    <div className="logo">
                        Weather Finder
                    </div>
                    <div className="searchbox">
                        <input type="text" className="search-bar" placeholder= "Search location..." onChange={e=>setLocation(e.target.value)} value={location} onKeyPress={search}></input>
                    </div>
                </div>

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
            </div>


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


            <div className="Hourly-Forecast-Box">
                {weather.forecast ? (
                  <>
                    <div className="Hourly-Forecast-Title">Today's Forecast</div>
                    <div className="Hourly-Forecast-Items">
                      <Hourly location={location} weather={weather} hour={hours[0]} />
                      <Hourly location={location} weather={weather} hour={hours[1]} />
                      <Hourly location={location} weather={weather} hour={hours[2]} />
                      <Hourly location={location} weather={weather} hour={hours[3]} />
                      <Hourly location={location} weather={weather} hour={hours[4]} />
                    </div>
                  </>
                ) : ('')}
            </div>


        
        
        </div>
    );
}

export default App;