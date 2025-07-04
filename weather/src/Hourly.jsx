import React, {useState} from 'react';

function Hourly(props)
{
    const getTime= (hour) =>{
        if(hour===0 || hour===24)
        {
         return "12:00 a.m";
        }
        else if(hour>24)
        {
            return `${hour-24}:00 a.m`
        }
        else if(hour<12)
        {
            return `${hour}:00 a.m`;
        }
        else if(hour===12)
        {
            return `${hour}:00 p.m.`
        }
        else if(hour<24)
        {
            return `${hour-12}:00 p.m`;
        }
     
    };

    const getIndex= (hour) =>{
        let newHour= hour%24;
        if(newHour===0)
        {
            return 12;
        }
        else
        {
            return newHour;
        }
    
    }

    let temp= "";
    let weatherCondition="";
    if(props.weather && props.weather.forecast && props.weather.forecast.forecastday)
    {
        const dayIndex= props.hour>=24? 1:0;
        const hourIndex= getIndex(props.hour);
        const dayWeather= props.weather.forecast.forecastday[dayIndex];
        if(dayWeather && dayWeather.hour[hourIndex])
        {
            temp= dayWeather.hour[hourIndex].temp_c;
            weatherCondition= dayWeather.hour[hourIndex].condition.text;
        }
        
       

    }

    function getEmoji(weatherCondition)
    {
        if(props.hour<4 || props.hour>=20)
        {
            return '🌌';
        }
        else if(weatherCondition==='Sunny' || weatherCondition.includes('Clear'))
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


    return(
        
        <div className="hourly">
            <div className= "currentHour">
            {getTime(props.hour)}
            </div>
            <div className="emoji">
                {getEmoji(weatherCondition)}
            </div>
            <div className="currentTemp">
                {temp}
            </div>
        </div>
    );
}

export default Hourly;