import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {Button, Container, Header, Segment} from 'semantic-ui-react';
import {useStore} from '../../../store/store';
import FlightSearchForm from '../Form/FlightSearchForm';
import FlightTable from '../Table/FlightTable';
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";

const FlightDashboard = () => {
    const {flightStore} = useStore();
    const {flights, getFlights} = flightStore;

    useEffect(() => {
        getFlights();
    }, [flightStore]);

    return (
        <>
            <Segment inverter textAlign="center" vertical className="flight" style={{paddingBottom:0}}>
                <Container vertical className="container">
                    <Header as="h1" inverted style={{display: "inline-block", marginRight: 80, fontSize: '36px'}}>
                        Search Flights
                    </Header>
                    <Button as={Link} to='/plan-journey' style={{float: "left"}}>
                        <Icon icon="ion:arrow-back" style={{fontSize: '19px'}} inline={true}/>Journey
                    </Button>
                    <FlightSearchForm/>
                </Container>

            </Segment>
            <Segment inverter textAlign="center" vertical className="flight" style={{paddingTop:0}}>

                <Container vertical className="container">
                    <FlightTable flights={flights}/>
                </Container>

            </Segment>
        </>
    );
}

export default observer(FlightDashboard);