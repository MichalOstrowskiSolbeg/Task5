import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getCurrentUser, isAuthenticated } from '../../helpers/UserHelper';
import { useNavigate } from "react-router-dom"
import { Checkout } from '../../api/ShoppingApiCalls';

function CartListTable(props) {
    const data = props.data
    const navigate = useNavigate();

    function removeProduct(index) {
        data.splice(index, 1);
        localStorage.setItem('cart2', JSON.stringify(data));
        props.updateCount(data.length);
    }

    function totalCost() {
        var sum = 0;
        for (const [key, value] of data) {
            sum = sum + (key.Cost * value);
        }
        return sum;
    }

    function isEmpty() {
        return (data.length > 0)
    }

    async function checkout() {
        console.log(getCurrentUser())
        if (isAuthenticated()) {
            try {
                const res = await Checkout()
                console.log(res)
                alert(res.data)
            } catch (error) {
                console.log(error)
            }
            
            localStorage.removeItem("cart2")
            props.updateCount(0);
            //navigate("/")
        } else {
            navigate("/login")
        }
    }

    return (
        isEmpty() ?
            <>
                <p>List of products added to your cart</p>
                <table className="table-list">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Cost</th>
                            <th>Brand</th>
                            <th>How many</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(([key, value], index) => (
                            <tr key={index}>
                                <td>{key.Name}</td>
                                <td>{key.Description}</td>
                                <td>${key.Cost}</td>
                                <td>{key.Brand}</td>
                                <td>{value}</td>
                                <td>
                                    <ul className="list-actions">
                                        <li><Link to={`/products/${key.Id}`}
                                            className="details-button">DETAILS</Link></li>
                                        <li><button onClick={() => removeProduct(index)}
                                            className="remove-button">REMOVE</button></li>
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="price">Total cost: ${totalCost()}</p>

                <form className="form">
                    <div className="form-buttons">
                        <button onClick={() => checkout()}
                            className="checkout-button">CHECKOUT</button>
                        </div>
                </form>
            </>
            :
            <p>Your cart is currently empty</p>
    )
}

export default CartListTable