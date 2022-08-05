import {observer} from "mobx-react-lite";
import React from "react";
import {Table} from "semantic-ui-react";
import LoadingComponent from "../../../components/LoadingComponent";
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
                    <Table.HeaderCell width={1}>From</Table.HeaderCell>
                    <Table.HeaderCell width={1}>To</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Departure</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Return</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Connections</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Duration</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Passengers</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Price</Table.HeaderCell>
                    <Table.HeaderCell width={1}></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {
                flights.map(flight => (<FlightTableItem key={flight.id} flight={flight} />))
            }
            </Table.Body>
        </Table>
    )
}

export default observer(FlightTable);