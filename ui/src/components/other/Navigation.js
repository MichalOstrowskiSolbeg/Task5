import React from 'react';
import { NavLink } from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <ul>
                <li><NavLink to='/' >Home page</NavLink></li>
                <li><NavLink to='/products'>Products</NavLink></li>
                <li><NavLink to='/cart' >Shopping cart</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navigation;