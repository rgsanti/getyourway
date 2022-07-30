import React, {useEffect} from 'react';
import {Button, Container, Header, Segment} from 'semantic-ui-react';
import {useStore} from '../store/store';
import "../styles/movie.css";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import MovieCard from "../components/movie/MovieCard";
import {observer} from "mobx-react-lite";

const MoviePage = () => {
    const {movieStore} = useStore();
    const {skyOriginals, getSkyOriginals} = movieStore;

    useEffect(() => {
        getSkyOriginals();
    }, [movieStore]);

    return (
        <>
            <Segment inverter textAlign="center" vertical className="flight" style={{paddingBottom:0}}>
                <Container vertical className="container">
                    <Header as="h1" inverted style={{textShadow: "1px 1px black", display: "inline-block", marginRight: 95, fontSize: '36px'}}>
                        Sky Originals
                    </Header>
                    <Button as={Link} to='/' style={{float: "left"}}>
                        <Icon icon="ion:arrow-back" style={{fontSize: '19px'}} inline={true}/>Home
                    </Button>

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