import React from 'react';
import '../../styles/flightpanel.css'
import { useStore } from '../../store/store';
import {Icon} from "@iconify/react";

const FlightPanel = ({airportDetail, flightDate, flightOriginCode}) => {

  const {userStore, flightStore} = useStore();

  return (
    <div className='flight-panel'>
          <div className='flight-container'>
            <div className='left-panel'>
                <h4 id="from">From:</h4>
                {/* <h1 id="from-code">LHR</h1> */}
                <h1 id="from-code">{flightOriginCode}</h1>
                {/* <h4>London Heathrow</h4> */}
                <h4>{flightStore.ukAirports.find(x => x.value === flightOriginCode).text.slice(6)}</h4>
                {/* <h2>10/10/2022</h2> */}
            </div>
            <div className='center-panel'>
                  {/* <img className='flight-icon' id='to' src='https://flyclipart.com/thumb2/white-arrow-icon-290958.png'/> */}
                  <Icon icon="ion:arrow-forward" style={{fontSize: '30px'}} inline={true}/>
                  {/* <h4 id="flight-code">WP7482</h4> */}
            </div>
            <div className='right-panel'>
                <h4 id="to">To:</h4>
                {/* <h1 id="to-code">LAX</h1> */}
                <h1 id="to-code">{airportDetail.iata}</h1>
                {/* <h4>Los Angeles International</h4> */}
                <h4>{airportDetail.name}</h4>
                {/* <h2>10:10PM</h2> */}
            </div>
          </div>
          <div className='flight-date-time'>
            {/* <h4>Departs: {date} {time}</h4> */}
            {/* <h4>Departs: {flightDetail.date}</h4> */}
            <h1>Departs: {flightDate}</h1>
          </div>
    </div>
  )
}

export default FlightPanel