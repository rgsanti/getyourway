import {observer} from "mobx-react-lite";
import React from "react";
import {Button, Container, Header, Segment} from "semantic-ui-react";
import LoadingComponent from "../../components/LoadingComponent";
import {useStore} from "../../store/store";
import FlightTable from "./Table/FlightTable";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";


const FlightSearchResultsPage = () => {

    const { flightStore } = useStore();
    
    if (flightStore.loadingInitial) return <LoadingComponent content='Please wait...' />;
    if (flightStore.loadingSearch) return <LoadingComponent content='Searching...' />

    return (

        <>
            <Segment inverter={+true}  textAlign="center" vertical className="flight" style={{paddingBottom: 0}}>
            <Container vertical={+true}  className="container">
                <Header as="h1" inverted style={{
                    textShadow: "1px 1px black",
                    display: "inline-block",
                    fontSize: '36px'
                }}>
                    Search Results
                </Header>
                <Button as={Link} to='/flights' style={{float: "left"}}>
                    <Icon icon="ion:arrow-back" style={{fontSize: '19px'}} inline={true}/>New Search
                </Button>
                <Button as={Link} to='/plan-journey' style={{float: "right"}}>
                    <Icon icon="ion:arrow-forward" style={{fontSize: '19px'}} inline={true}/>Journey
                </Button>
                {(flightStore.flights!==null &&flightStore.flights.length>0)?(
                    <>
                        <h4>
                            {flightStore.airportCodeToDetailsMap.get( flightStore.flights[0].originLocationCode)?.name}
                            - to -
                            {flightStore.airportCodeToDetailsMap.get( flightStore.flights[0].destinationLocationCode)?.name}
                        </h4>
                    </>):(<></>)
                }
            </Container>

        </Segment>
            <Segment inverter={+true}  textAlign="center" vertical className="flight" style={{paddingTop: 0}}>

            <Container vertical={+true}  className="container">
                <FlightTable flights={flightStore.flights}/>
            </Container>

        </Segment>
        </>
    )
}

export default observer(FlightSearchResultsPage);