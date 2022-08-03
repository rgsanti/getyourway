import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import '../../styles/navbar.css';
import React from 'react';
import {useStore} from "../../store/store";
import LogoutForm from "../../pages/user/LogoutForm";

const Navbar = () => {
    const { modalStore, userStore } = useStore();

    return (
        <>
        {userStore.isLoggedIn ? (
    <nav className="navbar">
            {/* sets the components of the navbar with some basic styling */}
            <div className='brand'>
            <Link to='/' style={{
                    margin: '4px',
                }}>getyourway</Link>
            </div>
            <div className='mainlinks'>
                <Link to='/plan-journey' style={{
                    margin: '5px',
                }}>Your Upcoming Journeys</Link>
                 <Link to='/' style={{
                    margin: '5px',
                    borderLeftStyle: 'solid',
                    borderRightStyle: 'solid',
                    borderColor: '#08d2fb',
                    padding: '8px'
                }}>Home</Link>
                 <Link to='/account' style={{
                    margin: '5px',
                }}>My Account</Link>
                </div>
            <div className='loginlink'>
                 <Link to='#' onClick={() => modalStore.openModal(<LogoutForm />)} style={{
                    border: '2px solid #08d2fb',
                    borderRadius: '8px',
                    margin: '4px',
                    padding: '14px'
                }}>Log Out</Link>
                </div>
        </nav>
            ):(<></>)}
        </>
    );
}

export default observer(Navbar);