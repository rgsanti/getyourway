import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Container, Grid, Header, Segment} from 'semantic-ui-react';
import {useStore} from '../../../store/store';
import FlightSaveTable from '../Table/FlightSaveTable';
import WeatherPanel from "../../../components/weather/WeatherPanel";
import FlightPanel from "../../../components/flight/FlightPanel";
import {AirportDetail} from "../../../models/flight";
import MapComponent from '../../../components/maps/MapComponent';

const JourneyDashboard = () => {
    const {flightStore, weatherStore} = useStore();
    const {savedFlights, getSavedFlights} = flightStore;
    const {getForecast} = weatherStore;
    const [airportDetail, setAirportDetail] = useState(new AirportDetail({}));

    useEffect(() => {
        getSavedFlights();
    }, [getSavedFlights, flightStore]);

    useEffect(() => {
        if (savedFlights !== undefined && savedFlights !== null && savedFlights.length > 0) {
            const airport = flightStore.airportCodeToDetailsMap.get(savedFlights[0].destinationLocationCode) || new AirportDetail({});
            if (airport !== airportDetail) {
                setAirportDetail(airport);
                getForecast(airport);
            }
        } else {
            setAirportDetail(new AirportDetail({}));
        }
    }, [getForecast, getSavedFlights, weatherStore, savedFlights, flightStore]);

    return (
        <>
            <Segment inverter={+true} textAlign="center" vertical className="flight" style={{paddingBottom: 0}}>
                <Container vertical={+true} className="container">
                    <Header as="h1" inverted
                            style={{textShadow: "1px 1px black", display: "inline-block", fontSize: '36px'}}>
                        Upcoming Journeys
                    </Header>
                    <p></p>
                    <Grid divided='vertically'>
                        <Grid.Row columns={2}>
                            <Grid.Column key={1} centered>
                                    {airportDetail.iata !== undefined ? (
                                        <>
                                            <p style={{marginTop: '3em', marginBottom: '1em', textAlign: 'center'}}>
                                                <text style={{fontWeight: 'bold'}}>Location:</text> {airportDetail.city} | 
                                                <text style={{fontWeight: 'bold'}}> Timezone:</text> {airportDetail.tz}
                                            </p>
                                            <WeatherPanel airportDetail={airportDetail}/>
                                        </>) : (<>
                                        <h5 style={{
                                            marginLeft: '25em',
                                            color: "grey",
                                            textAlign: "center",
                                            fontSize: '20px'
                                        }}>No Upcoming journeys</h5>
                                    </>)}
                            </Grid.Column>
                            <Grid.Column key={2}>
                                            <p style={{fontWeight: 'bold', marginTop: '3em', marginBottom: '1em', textAlign: 'center'}}>
                                                Your Flight Details
                                            </p>
                                <FlightPanel airportDetail={airportDetail} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>

            </Segment>

            <Segment inverter={+true} textAlign="center" vertical className="flight" style={{paddingTop: 0}}>
                <Container vertical={+true} className="container">
                    <FlightSaveTable flights={savedFlights}/>
                </Container>
            </Segment>
            <Segment inverter={+true} textAlign="center" vertical className="flight" style={{paddingTop: 0}}>
                <Container vertical={+true} className="container">
                    <Header as="h1" inverted
                            style={{textShadow: "1px 1px black", display: "inline-block", fontSize: '36px'}}>
                        Directions
                    </Header>
                    <MapComponent/>
                </Container>
            </Segment>
        </>
    );
}

export default observer(JourneyDashboard);