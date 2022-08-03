// @ts-nocheck
import {Link} from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import React from "react";

const MovieInfo = ({name,value}) => (
    <div className={`movie__${name}`}>
    <span className='info__head'>
      {name.replace(/\b\w/g, l => l.toUpperCase())}
    </span>
        {value}
    </div>
)


const MovieCard = ({infos}) => {
    const directors = infos.directors.map(director => (
        <p key={director.id}>{director.name}</p>
    ))
    return(
        <Link to = "/plan-journey" style={{color: "#ddd"}} >
        <div data-tip={'Take me to '+infos.filmingLocations[0].location} className='movie' style={{backgroundImage: `url(${infos.urlPoster})`}}>

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