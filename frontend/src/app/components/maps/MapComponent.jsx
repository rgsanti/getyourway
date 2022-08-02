import React, {useEffect, useState, useRef} from 'react';
// import {Button, Container, Header, Segment} from 'semantic-ui-react';
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import {observer} from "mobx-react-lite";
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { Box, Flex, HStack, Input, ButtonGroup, Button, IconButton, Text } from '@chakra-ui/react'

const center = { lat: 51.5074, lng: 0.1272}

const MapComponent = () => {

    // const dotenv = require('dotenv');
    const google = window.google;

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places']
    })

    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

    const originRef = useRef();
    const destinationRef = useRef();

    while (!isLoaded) {
        return <h1>Loading...</h1>
    }
    
    async function calculateRoute() {
        if (originRef.current.value === '') {
            return
        }
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: google.maps.TravelMode.DRIVING
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destinationRef.current.value = ''
    }

    return (
        <Flex position='relative' flexDirection='column' alignItems='center' h='100vh' w='100vw'>
            <Box position='absolute' left={50} top={50} h='100%' w='100%'>
                <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: '50%', height: '70%' }}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
                onLoad={map => setMap(map)}>
                <Marker position={center}/>
                {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                )}
                </GoogleMap>
            </Box>

            <HStack spacing={2}>
                <Box>
                    <Autocomplete>
                        <Input type='text' placeholder='Origin' ref={originRef}/>
                    </Autocomplete>
                </Box>
                <Box>
                     <Autocomplete>
                        <Input type='text' placeholder='Destination' ref={destinationRef}/>
                    </Autocomplete>
                </Box>

                <ButtonGroup>
                    <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
                        Calculate Route
                    </Button>
                    <IconButton aria-label='center back' onClick={clearRoute}/>
                </ButtonGroup>
            </HStack>

            {/* <Text>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text> */}

        </Flex>
    )

}

export default MapComponent;