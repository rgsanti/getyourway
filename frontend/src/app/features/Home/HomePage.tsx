import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Header, Segment} from 'semantic-ui-react';
import {useStore} from '../../store/store';
import LoginForm from '../User/LoginForm';
import LogoutForm from '../User/LogoutForm';
import RegisterForm from '../User/RegisterForm';
import SkyLogo from '../../../assets/logo.svg';

const HomePage = () => {
    const { modalStore, userStore } = useStore();

    return (
        <Segment inverter textAlign='center' vertical className='homepage'>
            <Container className='container' vertical>
                <Header as='h1' inverted>
                    Get Your Way
                </Header>
                <img src={SkyLogo} alt="sky-logo" width={300} />
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted>
                            You are logged as: {userStore.user?.username}
                        </Header>

                        <Button.Group size='huge' widths='3' vertical>
                            <Button as={Link} to='/plan-journey' primary>
                                Plan Your Journey
                            </Button>
                            <Button onClick={() => modalStore.openModal(<LogoutForm />)} inverted>
                                Logout
                            </Button>
                        </Button.Group>
                    </>
                )
                    :
                    (
                        <>
                            <Button.Group size='huge' widths='3'>
                                <Button
                                    onClick={() => modalStore.openModal(<LoginForm />)} >
                                    Login
                                </Button>

                                <Button
                                    onClick={() => modalStore.openModal(<RegisterForm />)} inverted>
                                    Register
                                </Button>
                            </Button.Group>
                        </>
                    )}
            </Container>
        </Segment>
    )
}

export default HomePage;