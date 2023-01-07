import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { isAdmin, isAuthenticated } from '../../helpers/UserHelper';

function Header(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!isAdmin()) {
            navigate('/cart');
        }
    };

    return (
        <header>
            <div className="logo-container">
                <Link to={'/'}><img src="logo512.png" alt="Logo" /></Link>
                <h1>Michal's electronics</h1>
            </div>
            <div className="right-container" >
                <div onClick={handleClick}>
                    <i className={`fas fa-shopping-cart`}></i>
                    <span>Items ({props.count})</span>
                </div>
                {!isAuthenticated() && 
                    <>
                        <Link to='/login' className="login-button">Sign in</Link>
                        <Link to='/register' className="register-button">Sign up</Link>
                    </>
                }
                {isAuthenticated() &&
                    <>
                        <button onClick={() => props.handleLogout()} className="log-out-button">Log out</button>
                    </>
                }
            </div>
        </header>
    );
}

export default Header;