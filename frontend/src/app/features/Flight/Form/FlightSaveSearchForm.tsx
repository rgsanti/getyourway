import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import {Button, Grid, Label} from 'semantic-ui-react';
import {useStore} from '../../../store/store';
import {ErrorMessage, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {currencyOptions} from '../../../common/options/CurrencyOptions';
import React from 'react';
import CustomDateInput from '../../../common/form/CustomDateInput';
import CustomTextInput from '../../../common/form/CustomTextInput';
import CustomSelectInput from '../../../common/form/CustomSelectInput';
import {AxiosError} from 'axios';
import {toast} from 'react-toastify';
import {Icon} from "@iconify/react";

const FlightSaveSearchForm = () => {
    const { flightStore } = useStore();
    const { airports, loadingInitial, searchSavedFlights } = flightStore;

    const initialValues = {
        'originLocationCode': '',
        'destinationLocationCode': '',
        'departureDate': null,
        'returnDate': null,
        'currencyCode': 'GBP',
        'passengerCount': 1,
        errorPassenger: null,
        errorCurrency: null
    }

    const validationSchema = {
        originLocationCode:
            Yup.string(),
        destinationLocationCode:
            Yup.string(),
        passengerCount:
            Yup.number()
                .integer('Passenger Count must be integer number!')
                .moreThan(0, 'Passenger Count must be between 1 and 9!')
                .lessThan(10, 'Passenger Count must be between 1 and 9!')
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={(values, { setErrors }) => searchSavedFlights(values)
                .catch((error: AxiosError) => {
                    const { data, status } = error.response!;

                    switch (status) {
                        case 400:
                            if (data.passengerCount) setErrors({ errorPassenger: data.passengerCount });
                            if (data.currencyCode) setErrors({ errorCurrency: data.currencyCode });
                            break;
                        case 403:
                            toast.error("Unauthorized access!");
                            break;
                        case 500:
                            console.log(data);
                            toast.error('Internal server error! See console log!')
                            break;
                    }
                })}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form
                    className='ui form'
                    onSubmit={handleSubmit}
                    autoComplete='off'
                >
                    <Grid>
                        <Button as={Link} to='/' style={{ marginLeft: '1rem' }} centered>
                            <Icon icon="ion:arrow-back" style={{ fontSize: '24px' }} inline={true}/>
                        </Button>
                        <Grid.Row columns={3} centered>

                            <Grid.Column>
                                <CustomSelectInput options={airports} placeholder='Origin Location Code' name='originLocationCode' />
                            </Grid.Column>

                            <Grid.Column>
                                <CustomSelectInput options={airports} placeholder='Destination Location Code' name='destinationLocationCode' />
                            </Grid.Column>

                            <Grid.Column>
                                <CustomTextInput type='number' name='passengerCount' placeholder='Passenger Count' />
                                <ErrorMessage
                                    name='errorPassenger'
                                    render={() => (<Label basic color='red' content={errors.errorPassenger} />)} />
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row columns={3} centered>

                            <Grid.Column>
                                <CustomDateInput name='departureDate' title='Departure Date' />
                            </Grid.Column>

                            <Grid.Column>
                                <CustomDateInput name='returnDate' title='Return Date' />
                            </Grid.Column>

                            <Grid.Column>
                                <CustomSelectInput options={currencyOptions} name='currencyCode' placeholder='Currency' />
                                <ErrorMessage
                                    name='errorCurrency'
                                    render={() => (<Label basic color='red' content={errors.errorCurrency} />)} />
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row columns={1}>

                            <Grid.Column centered>

                                <Button.Group size='huge' widths='4'>
                                    <Button
                                        disabled={isSubmitting || loadingInitial}
                                        loading={isSubmitting || loadingInitial}
                                        content='Search'
                                        type='submit'
                                        primary
                                    />
                                </Button.Group>

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default observer(FlightSaveSearchForm);