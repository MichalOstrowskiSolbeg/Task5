import React from 'react';
import { NavLink } from "react-router-dom";
import { isAdmin, isClient } from '../../helpers/UserHelper';

function Navigation() {
    return (
        <nav>
            <ul>
                <li><NavLink to='/' >Home</NavLink></li>
                <li><NavLink to='/products'>Products</NavLink></li>
                <li><NavLink to='/cart' >Shopping cart</NavLink></li>
                {isAdmin() &&
                    <li><NavLink to='/admin_panel'>Admin panel</NavLink></li>
                }
                {isClient() &&
                    <li><NavLink to='/my_orders'>My orders</NavLink></li>
                }
            </ul>
        </nav>
    )
}

export default Navigation;