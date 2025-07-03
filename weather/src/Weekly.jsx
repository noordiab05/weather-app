import React, {useState} from 'react';

const api= {
  key:"c1270a40cd4c4a9a83a131108250307",
  base:  "http://api.weatherapi.com/v1"
}


function Weekly(props)
{

    function getDay(key)
    {
        
        switch(key)
        {
            case 0:
                return "Sunday";
                break;
            case 1:
                return "Monday";
                break;
            case 2:
                return "Tuesday";
                break;
            case 3:
                return "Wednesday";
                break;
            case 4:
                return "Thursday";
                break;
            case 5:
                return "Friday";
                break;
            case 6:
                return "Saturday"
                break;
            default:
                return "";
                break;
        }
    }

    const weatherCondition= props.weather.forecast.forecastday[props.dayKey].day.condition.text;

    function getEmoji(weatherCondition)
    {
        if(weatherCondition==='Sunny')
        {
            return '☀️';
        }
        else if(weatherCondition.includes('Cloudy'))
        {
            return '☁️';
        }
        else if(weatherCondition === 'Partly Cloudy')
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
        <div>
            {props.weather && props.weather.forecast ? (
                <div className="Seven-day-forecast">
                    <div className="day">
                        {props.id === "today" ? "Today" : getDay(props.dayKey)}    {getEmoji(weatherCondition)}    {props.weather.forecast.forecastday[props.dayKey].day.avgtemp_c}°C
                    </div>
                    
                    
                </div>
            ) : ('')}
        </div>
    );

}

export default Weekly;