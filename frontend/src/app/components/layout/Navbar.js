import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import '../../styles/navbar.css';
import React from 'react';
import {useStore} from "../../store/store";
import LogoutForm from "../../pages/user/LogoutForm";
import RegisterForm from '../../pages/user/RegisterForm';
import LoginForm from "../../pages/user/LoginForm";

const Navbar = () => {
    const { modalStore, userStore } = useStore();

    return (
        <>
        {userStore.isLoggedIn ? (
    <nav className="navbar">
            {/* sets the components of the navbar with some basic styling */}
            <div className='brand'>
            <Link to='/flights' style={{
                    margin: '4px',
                }}>getyourway</Link>
            </div>
            <div className='mainlinks'>
            <Link to='/flights' style={{
                    margin: '5px',
                }}>Home</Link>
                <Link to='/plan-journey' style={{
                    borderLeftStyle: 'solid',
                    borderColor: '#08d2fb',
                    padding: '8px'
                }}>Plan Your Journey</Link>
                 <Link to='/' style={{
                    margin: '5px',
                    borderLeftStyle: 'solid',
                    borderRightStyle: 'solid',
                    borderColor: '#08d2fb',
                    padding: '8px'
                }}>Dashboard</Link>
                 <Link to='/account' style={{
                    margin: '5px',
                }}>My Account</Link>
                </div>
            <div className='loginlink'>
                 <Link onClick={() => modalStore.openModal(<LogoutForm />)} style={{
                    border: '2px solid #08d2fb',
                    borderRadius: '8px',
                    margin: '4px',
                    padding: '14px'
                }}>Log Out</Link>
                </div>
        </nav>
            ):( <nav className="navbar">
            {/* sets the components of the navbar with some basic styling */}
            <div className='brand'>
            <Link to='/flights' style={{
                    margin: '4px',
                }}>getyourway</Link>
            </div>
            <div className='mainlinks'>
            <Link to='/flights' style={{
                    margin: '5px',
                }}>Home</Link>
                <Link to='/plan-journey' style={{
                    borderLeftStyle: 'solid',
                    borderColor: '#08d2fb',
                    padding: '8px'
                }}>Plan Your Journey</Link>
                 <Link to='/' style={{
                    margin: '5px',
                    borderLeftStyle: 'solid',
                    borderRightStyle: 'solid',
                    borderColor: '#08d2fb',
                    padding: '8px'
                }}>Dashboard</Link>
                 <Link to='/account' style={{
                    margin: '5px',
                }}>My Account</Link>
                </div>
            <div className='loginlink'>
                 <Link onClick={() => modalStore.openModal(<LoginForm />)} style={{
                    border: '2px solid #08d2fb',
                    borderRadius: '8px',
                    margin: '4px',
                    padding: '14px'
                }}>Log In</Link>
                <Link onClick={() => modalStore.openModal(<RegisterForm />)} style={{
                    border: '2px solid #08d2fb',
                    borderRadius: '8px',
                    margin: '4px',
                    padding: '14px'
                }}>Register</Link>
                </div>
        </nav>)}
        </>
    );
}

export default observer(Navbar);