import React, {useEffect} from 'react'
import {observer} from "mobx-react-lite";
import '../../styles/weatherpanel.css'
import WeatherItem from './WeatherItem'
import {useStore} from "../../store/store";

const WeatherPanel = ({airportDetail}) => {
    const {weatherStore} = useStore();
    const {weather, getForecast} = weatherStore;

    useEffect(() => {
        getForecast(airportDetail);
    }, [getForecast, weatherStore]);

    return (
        <>
            <div className="weather-container">
                <div className="weather-panel">
                    {weather?.list.filter(x => x.dt_txt.endsWith("12:00:00")).map((x, i) => (
                        <WeatherItem key={i}
                                     alt={airportDetail.city + ' Forecast - ' + x.weather[0].description}
                                     icon={x.weather[0].icon}
                                     day={x.dt}
                                     temp={Math.round(x.main.temp - 273)}/>
                    ))}
                </div>
            </div>
        </>
    )

}

export default observer(WeatherPanel)