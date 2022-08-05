import React, {useRef, useState} from 'react';
import {Autocomplete, DirectionsRenderer, GoogleMap, useJsApiLoader} from '@react-google-maps/api'
import {Box, Button, ButtonGroup, Center, ChakraProvider, Flex, HStack, Input, Text, theme} from '@chakra-ui/react'
import {useStore} from '../../store/store';

const center = {lat: 51.5074, lng: 0.1272}

const MapComponent = ({flightOriginCode}) => {

    const google = window.google;

    const {flightStore} = useStore();

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places']
    })

    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

    const originRef = useRef();
    // const destinationRef = useRef();
    // const destinationRef = airportDetail.city;
    // const destinationRef = flightStore.ukAirports.find(x => x.value === flightOriginCode).text.slice(6);

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
            destination: flightStore.ukAirports.find(x => x.value === flightOriginCode).text.slice(6),
            travelMode: google.maps.TravelMode.DRIVING
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    return (
        <Center>
            <Flex position='relative' flexDirection='column' alignItems='center' h='100vh' w='100vw'>

                <ChakraProvider theme={theme}>

                    <HStack spacing={2}>
                        <Box>
                            <Autocomplete>
                                <Input type='text' placeholder='Enter your origin' ref={originRef}
                                       style={{backgroundColor: "white", width: "215px"}}/>
                            </Autocomplete>
                        </Box>

                        <ButtonGroup>
                            <Button colorScheme='facebook' type='submit' onClick={calculateRoute}>
                                Find Route
                            </Button>
                        </ButtonGroup>
                    </HStack>

                    {distance !== '' ?
                        <>
                            <HStack>
                                <Text style={{textShadow: "1px 1px black", color: 'white', fontSize: '20px', textAlign:"left"}}>
                                    <br/> Driving Distance: <strong>{distance}</strong> <br/> Driving Duration: <strong>{duration}</strong>
                                </Text>
                            </HStack>
                            <Box position='relative' left='8%' top='2%' h='100%' w='100%'>
                                <GoogleMap
                                    center={center}
                                    zoom={15}
                                    mapContainerStyle={{width: '85%', height: '95%'}}
                                    options={{
                                        zoomControl: false,
                                        streetViewControl: false,
                                        mapTypeControl: false,
                                        fullscreenControl: false,
                                    }}
                                    onLoad={map => setMap(map)}>
                                    {directionsResponse && (
                                        <DirectionsRenderer directions={directionsResponse}/>
                                    )}
                                </GoogleMap>
                            </Box>
                        </>
                        : <></>
                    }


                </ChakraProvider>

            </Flex>
        </Center>
    )

}

export default MapComponent;