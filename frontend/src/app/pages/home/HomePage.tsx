import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Header, Segment} from 'semantic-ui-react';
import {useStore} from '../../store/store';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';
import SkyLogo from '../../../assets/logo.svg';

const HomePage = () => {
    const { modalStore, userStore } = useStore();

    return (
        <Segment textAlign='center' vertical className='homepage'>
            <Container className='container' vertical={+true}>
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
                            <Button as={Link} to='/flights' primary>
                                Start
                            </Button>
                            <Button as={Link} to='/plan-journey'>
                                Your Upcoming Journeys
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