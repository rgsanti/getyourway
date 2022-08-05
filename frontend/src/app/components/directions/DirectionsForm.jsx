import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Grid} from "semantic-ui-react";

const DirectionsForm = () => {
    return (
        <>
            <Form>
                <Grid>
                    <Grid.Row columns={3}>
                        <Grid.Column xs={5}>
                            <Form.Group
                                className="mb-3 ta-left"
                                controlId="formOrigin"
                            >
                                <Form.Label>Starting Location: </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="AB1 2CD"
                                />
                            </Form.Group>
                        </Grid.Column>
                        <Grid.Column xs={5}>
                            <Form.Group>
                                <Form.Label>Mode of transport: </Form.Label>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Transit"
                                />
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Driving"
                                />
                            </Form.Group>
                        </Grid.Column>
                        <Grid.Column xs={2}>
                            <Button variant="primary" type="submit">
                                Go
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                    
                </Grid>
            </Form>
        </>
    );
};

export default DirectionsForm;
