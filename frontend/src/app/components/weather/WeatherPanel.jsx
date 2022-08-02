import React from 'react'
import '../../styles/weatherpanel.css'

const WeatherPanel = ({icon, description, temp}) => {

  return (
    <>
        <div className="weather-container">
            <div className="weather-panel">
                <div className="panel-left">
                    <img src="http://openweathermap.org/img/wn/10d@2x.png"/>
                </div>
                <div className="panel-right">
                    <h3>{temp}</h3>
                    <p>{description}</p>
                    <p>hi</p>
                </div>
            </div>
        </div>
    </>
  )

}

export default WeatherPanel