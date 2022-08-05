import React from "react";
import {useStore} from "../../store/store";
import {Container, Header, Segment, Table} from "semantic-ui-react";

const Account = () => {
    const {userStore, flightStore} = useStore();

    return (
        <div className="Account">
            <Segment inverter={+true} textAlign="center" vertical className="flight">
                <Container vertical={+true} className="container">
                    <Header as="h1" inverted
                            style={{textShadow: "1px 1px black", display: "inline-block", fontSize: '36px'}}>
                        My Account
                    </Header>
                    <Table definition>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell width={2}>Username</Table.Cell>
                                <Table.Cell>{userStore.user.username}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell width={2}>Firstname</Table.Cell>
                                <Table.Cell>{userStore.user.firstname}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell width={2}>Lastname</Table.Cell>
                                <Table.Cell>{userStore.user.lastname}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell width={2}>Home Airport</Table.Cell>
                                <Table.Cell>{flightStore.ukAirports.find(x => x.value === userStore.user.homeAirportCode)?.text}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell width={2}>Phone Number</Table.Cell>
                                <Table.Cell>{userStore.user.phoneNumber}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Email</Table.Cell>
                                <Table.Cell>{userStore.user.email}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Container>
            </Segment>
        </div>
    )
}

export default Account;