// @ts-nocheck
import {Link} from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import React from "react";
import {useStore} from "../../store/store";
import {history} from "../../../index";
import {AxiosError} from "axios";
import {toast} from "react-toastify";

const MovieInfo = ({name,value}) => (
    <div className={`movie__${name}`}>
    <span className='info__head'>
      {name.replace(/\b\w/g, l => l.toUpperCase())}
    </span>
        {value}
    </div>
)


const MovieCard = ({infos}) => {
    const {flightStore, userStore} = useStore();
    const {locationToAirportMap, searchFlights} = flightStore;
    const directors = infos.directors.map(director => (
        <p key={director.id}>{director.name}</p>
    ))

    let newDate = new Date();
    let returnDate = new Date();
    newDate.setDate(newDate.getDate() + 2 );
    returnDate.setDate(newDate.getDate() + 8 );
    console.log(locationToAirportMap.get(infos.filmingLocations[0].location)?.iata);
    const values = {'originLocationCode': userStore.user?.homeAirportCode,
        'destinationLocationCode': locationToAirportMap.get(infos.filmingLocations[0].location)?.iata,
        'departureDate': newDate,
        'returnDate': returnDate,
        'currencyCode': 'GBP',
        'passengerCount': 1};

    return(

        <Link to = "#" style={{color: "#ddd"}}  onClick={()=>{
            document.getElementById('root').style.display = 'none';
            searchFlights(values)
                .catch((error: AxiosError) => {
                    const {data, status} = error.response!;
                    switch (status) {
                        case 403:
                            toast.error("Unauthorized access!");
                            window.location.reload();
                            break;
                        case 500:
                            console.log(data);
                            toast.error('Internal server error! See console log!')
                            break;
                    }
                }).then(()=>{
                document.getElementById('root').style.display = 'unset';
                history.push('/flight-results')
            })
 ;
        }}>

        <div
            data-tip={'Take me to '+infos.filmingLocations[0].location} className='movie' style={{backgroundImage: `url(${infos.urlPoster})`}}>

            <h2 className='movie__title'>{infos.title}</h2>

            <span className='movie__description'>{infos.simplePlot}</span>

            <div className='movie__infos'>
                <MovieInfo name='duration' value={infos.runtime+' Mins'} />
                <MovieInfo name='year released' value={infos.year} />
                <MovieInfo name='directors' value={directors} />
                <MovieInfo name='rating - IMDB' value={infos.rating} />
                <MovieInfo name='filming location' value={infos.filmingLocations[0].location} />
            </div>
            <div className='movie__imdb'>
                {/*<a href={infos.urlIMDB} className='movie__imdb-button' target='blank'> IMDb </a>*/}
            </div>
            <ReactTooltip />
        </div>

        </Link>

    )
}
export default MovieCard;