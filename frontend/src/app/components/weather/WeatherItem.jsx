import React from 'react'

const WeatherItem = ({icon, day, temp}) => {
  return (
    <div className="weather-item">
        <div className="panel-left">
            <img className='weather-img' src={icon}/>
        </div>
        <div className="panel-right">
            <h3>{temp}</h3>
            <p>{day}</p>
        </div>
    </div>
  )
}

export default WeatherItem