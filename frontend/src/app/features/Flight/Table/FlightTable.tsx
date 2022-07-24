import {observer} from "mobx-react-lite";
import React from "react";
import {Table} from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import {Flight} from "../../../models/flight";
import {useStore} from "../../../store/store";
import FlightTableItem from "./Items/FlightTableItem";

interface Props {
    flights: Flight[]
}

const FlightTable = ({ flights }: Props) => {


    const { flightStore } = useStore();
    
    if (flightStore.loadingInitial) return <LoadingComponent content='Please wait...' />;
    if (flightStore.loadingSearch) return <LoadingComponent content='Searching...' />

    return (
        <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={2}>Origin</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Destination</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Departure Date</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Return Date</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Passengers</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Transfers</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Duration</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Price</Table.HeaderCell>
                    <Table.HeaderCell width={1}></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {
                flights.map(flight => (<FlightTableItem flight={flight} />))
            }
            </Table.Body>
        </Table>
    )
}

export default observer(FlightTable);