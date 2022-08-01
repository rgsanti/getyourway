import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {Button, Container, Grid, Header, Segment} from 'semantic-ui-react';
import {useStore} from '../../../store/store';
import FlightSaveTable from '../Table/FlightSaveTable';
import SkyLogo from "../../../../assets/logo.svg";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import WeatherPanel from "../../../components/weather/WeatherPanel";

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
                    <Header as="h1" inverted style={{textShadow: "1px 1px black", display: "inline-block", fontSize: '36px'}}>
                        Plan Your Journey
                    </Header>

                    <Grid divided='vertically'>
                        <Grid.Row columns={2}>
                            <Grid.Column key={1}>
                                <WeatherPanel icon="http://openweathermap.org/img/wn/10d@2x.png" description="Description" temp="30C"/>
                            </Grid.Column>
                            <Grid.Column key={2}>
                                <WeatherPanel icon="http://openweathermap.org/img/wn/10d@2x.png" description="Description" temp="30C"/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
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