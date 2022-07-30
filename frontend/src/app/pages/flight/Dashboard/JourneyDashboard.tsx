import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {Button, Container, Grid, Header, Segment} from 'semantic-ui-react';
import {useStore} from '../../../store/store';
import FlightSaveTable from '../Table/FlightSaveTable';
import SkyLogo from "../../../../assets/logo.svg";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";

const JourneyDashboard = () => {
    const {flightStore} = useStore();
    const {savedFlights, getSavedFlights} = flightStore;

    useEffect(() => {
        getSavedFlights();
    }, [flightStore]);

    return (
        <>
            <Segment inverter textAlign="center" vertical className="flight" style={{paddingBottom:0}}>
                <Container vertical className="container">
                    <Header as="h1" inverted style={{textShadow: "1px 1px black", display: "inline-block", marginRight: 95, fontSize: '36px'}}>
                        Plan Your Journey
                    </Header>
                    <Button as={Link} to='/' style={{float: "left"}}>
                        <Icon icon="ion:arrow-back" style={{fontSize: '19px'}} inline={true}/>Home
                    </Button>

                    <Grid.Row columns={1}>
                        <img src={SkyLogo} alt="sky-logo" width={300}/>

                        <Grid.Column centered>
                            <Button.Group size='huge' widths='3' style={{paddingTop:6}}>
                                <Button as={Link} to='/flights' primary
                                >Add Flights</Button>
                            </Button.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Container>

            </Segment>
            <Segment inverter textAlign="center" vertical className="flight" style={{paddingTop:0}}>

                <Container vertical className="container">
                    <FlightSaveTable flights={savedFlights}/>
                </Container>

            </Segment>
        </>
    );
}

export default observer(JourneyDashboard);