import React from 'react'
import MapComponent from '../../../components/maps/MapComponent'
import {observer} from "mobx-react-lite";
import {Button, Container, Header, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import { Box } from "@chakra-ui/react";


const MapPage = () => {
  return (
    <>

        <Segment inverter textAlign="center" vertical className="flight" style={{paddingBottom: 0}}>
            <Container vertical className="container">
                <Header as="h1" inverted style={{
                    textShadow: "1px 1px black",
                    display: "inline-block",
                    fontSize: '36px'
                }}>
                    Plan your Journey
                </Header>
                
            </Container>
        </Segment>
        <MapComponent/>

    </>
  )
}

export default observer(MapPage);