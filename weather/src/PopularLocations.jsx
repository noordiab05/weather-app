import React, {useState,useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const api= {
  key:"c1270a40cd4c4a9a83a131108250307",
  base:  "http://api.weatherapi.com/v1"
}


function PopularLocations({weather, setWeather, location, setLocation, getEmoji})
{

    
    const locations =[
        "Paris, France",
        "London, UK",
        "Sydney, Australia",
        "Rio, Brazil",
        "New York, USA",
        "Dubai, UAE",
        "Rome, Italy"
    ]

    const navigate= useNavigate();


    const handleClick= (location) =>{
        fetch(`${api.base}/forecast.json?key=${api.key}&q=${location}&days=7`)
          .then(res=>res.json())
          .then(result=>{
            setWeather(result);
            setLocation(location);
            navigate('/Home');
            });
    }



    const[locationInfo, setLocationInfo]= useState([]);
   
    useEffect(() => {
        locations.forEach((location, index) => {
        fetch(`${api.base}/current.json?key=${api.key}&q=${location}`)
        .then(res => res.json())
        .then(result => {
            let temp= Math.round(result.current.temp_c);
            let emoji= getEmoji(result.current.condition.text);
            let newLocation={location: location, temp:temp, emoji:emoji}
            setLocationInfo(prevLocation=>[...prevLocation, newLocation])
            })
        });
    }, []);

    return(
        <div className="centered-locations">
        <div className="popular-locations">
            <div className="title">Popular Locations</div>
            <ul>
                {locationInfo.map((currentLocation, index)=>(
                    <button key={index} className="locations" onClick={() => handleClick(currentLocation.location)} >{currentLocation.location}{"   "}{` ${currentLocation.temp}°C`}{" "}{currentLocation.emoji}</button>
                ))}
            </ul>
            </div>
        </div>
    );
}

export default PopularLocations;