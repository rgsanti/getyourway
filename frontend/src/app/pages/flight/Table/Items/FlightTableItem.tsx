import {observer} from "mobx-react-lite";
import React, {SyntheticEvent, useState} from "react";
import {Button, Table} from "semantic-ui-react";
import {Flight} from "../../../../models/flight";
import {useStore} from "../../../../store/store";
import {secondsToHms} from "../../../../util/util";

interface Props {
    flight: Flight
}

const FlightTableItem = ({ flight }: Props) => {
    const { flightStore } = useStore();
    const { saveSelectedFlight } = flightStore;
    const [target, setTarget] = useState('');

    function handleSaveSelectedFlight(e: SyntheticEvent<HTMLButtonElement>, id: number) {
        setTarget(e.currentTarget.name);
        saveSelectedFlight(id);
    }

    return (
        <Table.Row key={flight.id}>
            <Table.Cell>{flight.originLocationCode}</Table.Cell>
            <Table.Cell>{flight.destinationLocationCode}</Table.Cell>
            <Table.Cell>{flight.departureDate}</Table.Cell>
            <Table.Cell>{flight.returnDate}</Table.Cell>
            <Table.Cell>{flight.transferCount - 1}</Table.Cell>
            <Table.Cell>{secondsToHms(flight.time)}</Table.Cell>
            <Table.Cell>{flight.passengerCount}</Table.Cell>
            <Table.Cell>{flight.price} {flight.currencyCode}</Table.Cell>
            <Table.Cell textAlign={"center"}>
                <Button
                    name={flight.id}
                    loading={flightStore.loading && target === flight.id.toString()}
                    onClick={(e) => handleSaveSelectedFlight(e, flight.id)}
                    content="Add to journey"
                    color='facebook' />
            </Table.Cell>
        </Table.Row>
    );
}

export default observer(FlightTableItem);