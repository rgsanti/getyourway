import React, {useEffect} from 'react';
import {Container, Header, Segment} from 'semantic-ui-react';
import {useStore} from '../store/store';
import "../styles/movie.css";
import MovieCard from "../components/movie/MovieCard";
import {observer} from "mobx-react-lite";

const MoviePage = () => {
    const {movieStore} = useStore();
    const {skyOriginals, getSkyOriginals} = movieStore;

    useEffect(() => {
        getSkyOriginals();
    }, [getSkyOriginals,movieStore]);

    return (
        <>
            <Segment inverter={+true} textAlign="center" vertical className="flight" style={{paddingBottom:0}}>
                <Container vertical={+true}  className="container">
                    <Header as="h1" inverted style={{textShadow: "1px 1px black", textAlign: "centre", fontSize: '36px'}}>
                        Or, choose a Sky Original & we'll take you there!
                    </Header>
                    <div className='movies__container'>
                        {skyOriginals.map((movie,i)=> (
                            <MovieCard key={i} infos={movie}/>
                        ))}
                    </div>
                </Container>

            </Segment>
        </>
    );
}

export default observer(MoviePage);