import {Button} from 'semantic-ui-react';
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";

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
        <div className='movie' style={{backgroundImage: `url(${infos.urlPoster})`}}>

            <h2 className='movie__title'>{infos.title}</h2>

            <div style={{overflowY:"scroll", height:"100px"}} className='movie__description'>{infos.simplePlot}</div>

            <div className='movie__infos'>
                <MovieInfo name='duration' value={infos.runtime+' Mins'} />
                <MovieInfo name='year released' value={infos.year} />
                <MovieInfo name='directors' value={directors} />
                <MovieInfo name='rating' value={infos.rating} />
                <MovieInfo name='filming location' value={infos.filmingLocations[0].location} />
            </div>
            <Button as={Link} to='/plan-journey' style={{float: "left"}}>
                <Icon icon="bxs:plane-take-off" style={{fontSize: '19px'}} inline={true}/>  Take me there
            </Button>

        </div>
    )
}
export default MovieCard;