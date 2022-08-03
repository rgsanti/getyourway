import React from "react";
import {useStore} from "../../store/store";
import {Container, Table} from "semantic-ui-react";

const Account = () => {
    const {userStore, flightStore} = useStore();

    return (
        <div className="Account">
            <p></p>
            <h1 style={{textAlign: "center"}}>My Account</h1>

            <Container vertical={+true} className="container" style={{paddingLeft:0,paddingRight:0}}>

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

        </div>
    )
}

export default Account;