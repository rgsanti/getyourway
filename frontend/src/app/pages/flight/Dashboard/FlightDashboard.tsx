import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {Container, Header, Segment} from 'semantic-ui-react';
import {useStore} from '../../../store/store';
import FlightSearchForm from '../Form/FlightSearchForm';
import CarouselSlider from '../../home/CarouselSlider';
import '../../../styles/dashboard.css';

const FlightDashboard = () => {
    const {flightStore} = useStore();
    const {getFlights} = flightStore;

    useEffect(() => {
        getFlights();
    }, [getFlights, flightStore]);

    return (
        <>
        <CarouselSlider />
            <Segment inverter={+true} textAlign="center" vertical className="flight" style={{paddingBottom:0}}>
                <Container vertical={+true} className="container">
                    <Header as="h1" inverted style={{textShadow: "1px 1px black", display: "inline-block", fontSize: '36px'}}>
                        Search Flights
                    </Header>
                    <FlightSearchForm/>
                </Container>
            </Segment>
        </>
    );
}

export default observer(FlightDashboard);