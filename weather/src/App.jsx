import React, {useState} from 'react';
import Weekly from './Weekly';


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


    const keys= getKey();


    return(
        <div className="main-div">
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
                    {weather.current ? `${Math.round(weather.current.temp_c)}°C` : ""}
                    </div>
                </div>
            </div>
            ): ('')}


            <div className="Seven-Day-Forecast-Box">
                {weather.forecast?(
                <div className="Seven-Day-Forecast-Header"> 7 Day Forecast
                    <div className="Weekly-Forecast-Format">
                        <Weekly dayKey={keys[0]} id="today" location={location} weather= {weather}></Weekly>
                        <Weekly dayKey={keys[1]} id="other" location={location} weather= {weather}></Weekly>
                        <Weekly dayKey={keys[2]} id="other" location={location} weather= {weather}></Weekly>
                        <Weekly dayKey={keys[3]} id="other" location={location} weather= {weather}></Weekly>
                        <Weekly dayKey={keys[4]} id="other" location={location} weather= {weather}></Weekly>
                        <Weekly dayKey={keys[5]} id="other" location={location} weather= {weather}></Weekly>
                        <Weekly dayKey={keys[6]} id="other" location={location} weather= {weather}></Weekly>
                    </div>
                </div>
                ):('')}
            </div>

        </div>
    );
}

export default App;