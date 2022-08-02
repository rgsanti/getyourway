import React from 'react'
import '../../styles/weatherpanel.css'
import WeatherItem from './WeatherItem'

const WeatherPanel = () => {

  const icon = "http://openweathermap.org/img/wn/10d@2x.png"
  const day = "Day" 
  const temp = "30C"

  return (
    <>
        <div className="weather-container">
            <div className="weather-panel">
                <WeatherItem icon={icon} day={day} temp={temp}/>
                <WeatherItem icon={icon} day={day} temp={temp}/>
                <WeatherItem icon={icon} day={day} temp={temp}/>
                <WeatherItem icon={icon} day={day} temp={temp}/>
                <WeatherItem icon={icon} day={day} temp={temp}/>
                <WeatherItem icon={icon} day={day} temp={temp}/>
                <WeatherItem icon={icon} day={day} temp={temp}/>
            </div>
        </div>
    </>
  )

}

export default WeatherPanel