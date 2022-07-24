import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {Container, Header, Segment} from 'semantic-ui-react';
import {useStore} from '../../../store/store';
import FlightSearchForm from '../Form/FlightSearchForm';
import FlightTable from '../Table/FlightTable';

const FlightDashboard = () => {
    const { flightStore } = useStore();
    const { flights, getFlights, loadAirports } = flightStore;

    useEffect(() => { getFlights(); loadAirports();}, [flightStore]);

    return (
        <>
            <Segment inverter textAlign="center" vertical className="flight">

                <Container vertical className="container">
                    <Header as="h2" inverted>
                        Search Flights
                    </Header>
                    <FlightSearchForm />
                </Container>

            </Segment>
            <Segment inverter textAlign="center" vertical className="flight">

                <Container vertical className="container">
                    <FlightTable flights={flights} />
                </Container>

            </Segment>
        </>
    );
}

export default observer(FlightDashboard);