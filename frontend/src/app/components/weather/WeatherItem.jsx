import React from 'react'
import moment from "moment/moment";
import ReactTooltip from 'react-tooltip';

const WeatherItem = ({icon, day, temp,alt}) => {
    const date = moment(day * 1000);

  return (
    <div className="weather-item">
        <div className="panel-left">
            <img data-tip={alt} className='weather-img' src={"http://openweathermap.org/img/wn/"+icon+"@2x.png"} alt={alt}/>
            <ReactTooltip />
        </div>
        <div className="panel-right">
            <h5>{temp}°C</h5>
            <p>{date.format('ddd DD-MMM')}</p>
        </div>
    </div>
  )
}

export default WeatherItem