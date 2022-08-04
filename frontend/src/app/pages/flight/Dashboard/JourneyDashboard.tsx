import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Container, Grid, Header, Segment} from 'semantic-ui-react';
import {useStore} from '../../../store/store';
import FlightSaveTable from '../Table/FlightSaveTable';
import WeatherPanel from "../../../components/weather/WeatherPanel";
import FlightPanel from "../../../components/flight/FlightPanel";
import {AirportDetail, FlightFormValues} from "../../../models/flight";
import MapComponent from '../../../components/maps/MapComponent';
import { FlightDetail } from '../../../models/flight';

const JourneyDashboard = () => {
    const {flightStore, weatherStore} = useStore();
    const {savedFlights, getSavedFlights} = flightStore;
    const {getForecast} = weatherStore;
    const [airportDetail, setAirportDetail] = useState(new AirportDetail({}));
    const [flightDate, setFlightDate] = useState(new Date());
    const [flightOriginCode, setFlightOriginCode] = useState('');

    useEffect(() => {
        getSavedFlights();
    }, [getSavedFlights, flightStore]);

    useEffect(() => {
        if (savedFlights !== undefined && savedFlights !== null && savedFlights.length > 0) {
            const airport = flightStore.airportCodeToDetailsMap.get(savedFlights[0].destinationLocationCode) || new AirportDetail({});
            setFlightDate(savedFlights[0].departureDate);
            setFlightOriginCode(savedFlights[0].originLocationCode);
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
                        Your Upcoming Journey
                    </Header>
                    <p></p>
                    <Grid divided='vertically'>
                        <Grid.Row columns={2}>
                            {/* <Grid.Column key={1} centered> */}
                                    {airportDetail.iata !== undefined ? (
                                        <>
                                            <Grid.Column key={1} centered>
                                            <p style={{marginTop: '1em', marginBottom: '1em', textAlign: 'center', fontSize: '150%'}}>
                                                <text style={{fontWeight: 'bold'}}>Destination:</text> {airportDetail.city} | 
                                                <text style={{fontWeight: 'bold'}}> Timezone:</text> {airportDetail.tz}
                                            </p>
                                            <WeatherPanel airportDetail={airportDetail}/>
                                            </Grid.Column>
                                            <Grid.Column key={2} centered>
                                                <p style={{fontWeight: 'bold', marginTop: '1em', marginBottom: '1em', textAlign: 'center', fontSize: '150%'}}>
                                                    Flight Details
                                                </p>
                                                {/* <FlightPanel airportDetail={airportDetail} date={savedFlights[0].departureDate} time={savedFlights[0].time}/> */}
                                                <FlightPanel airportDetail={airportDetail} flightDate={flightDate} flightOriginCode={flightOriginCode}/>
                                            </Grid.Column>
                                        </>) : (<>
                                        <h5 style={{
                                            marginTop: '1em',
                                            marginLeft: '1em',
                                            color: "grey",
                                            textAlign: "center",
                                            fontSize: '20px'
                                        }}>No Upcoming Journey</h5>
                                    </>)}
                            {/* </Grid.Column> */}
                            {/* <Grid.Column key={2}>
                                            <p style={{fontWeight: 'bold', marginTop: '3em', marginBottom: '1em', textAlign: 'center'}}>
                                                Your Flight Details
                                            </p>
                                <FlightPanel airportDetail={airportDetail} />
                            </Grid.Column> */}
                        </Grid.Row>
                    </Grid>
                </Container>

            </Segment>

            <Segment inverter={+true} textAlign="center" vertical className="flight" style={{paddingTop: 0}}>
                <Container vertical={+true} className="container">
                    <Header as="h1" inverted
                            style={{textShadow: "1px 1px black", display: "inline-block", fontSize: '36px'}}>
                        Saved Flights
                    </Header>
                    <FlightSaveTable flights={savedFlights}/>
                </Container>
            </Segment>
            <Segment inverter={+true} textAlign="center" vertical className="flight" style={{paddingTop: 0}}>
                <Container vertical={+true} className="container">
                    <Header as="h1" inverted
                            style={{textShadow: "1px 1px black", display: "inline-block", fontSize: '36px'}}>
                        Directions to Airport
                    </Header>
                    <MapComponent flightOriginCode={flightOriginCode}/>
                </Container>
            </Segment>
        </>
    );
}

export default observer(JourneyDashboard);