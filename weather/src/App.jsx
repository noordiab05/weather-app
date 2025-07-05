import React, {useState} from 'react';
import Weekly from './Weekly';
import Hourly from './Hourly';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';




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
        else if(weatherCondition.includes('Cloudy') || weatherCondition.includes('Overcast'))
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
        <Router>
            <div className= "main-div" id= {getBackground()}>
                <div className="left-content">
                    <div className="header-row">
                        <nav>
                            <ul className="nav-bar-items">
                                <li className="logo"><Link to="/Home" onClick={()=>{
                                    //makes the current location's info disappear
                                    setWeather({});
                                    setLocation('');
                                }}>Weather Finder</Link></li>
                                <li><Link to="/Home" onClick={()=>{
                                    //makes the current location's info disappear
                                    setWeather({});
                                    setLocation('');
                                }}>Popular Locations</Link></li>
                                <li><Link to="/" onClick={()=>{
                                    //makes the current location's info disappear
                                    setWeather({});
                                    setLocation('');
                                }}>Search</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>


            <Routes>
                <Route
                    path="/" element={
                        <Home
                            location={location}
                            setLocation={setLocation}
                            weather={weather}
                            search= {search}
                            keys={keys}
                            hours={hours}
                            weatherCondition={weatherCondition}
                            getEmoji={getEmoji}
                            getBackground={getBackground}
                        ></Home>
                    }
                ></Route>
                <Route
                    path="/Home" element={
                        <Home
                            location={location}
                            setLocation={setLocation}
                            weather={weather}
                            search= {search}
                            keys={keys}
                            hours={hours}
                            weatherCondition={weatherCondition}
                            getEmoji={getEmoji}
                            getBackground={getBackground}
                        ></Home>
                    }
                ></Route>
                
            </Routes>
            </div>
        </Router>
    );
}

export default App;