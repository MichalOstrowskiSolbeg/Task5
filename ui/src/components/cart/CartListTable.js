import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { isAuthenticated } from '../../helpers/UserHelper';
import { useNavigate } from "react-router-dom"

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
        for (var i = 0; i < data.length; i++) {
            sum = sum + data[i].Cost;
        }
        return sum;
    }

    function isEmpty() {
        return (data.length > 0)
    }

    function checkout() {
        if (isAuthenticated()) {
            alert("Thank you for purchase")
            navigate("/")
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((x, index) =>
                            <tr key={x.Id}>
                                <td>{x.Name}</td>
                                <td>{x.Description}</td>
                                <td>${x.Cost}</td>
                                <td>{x.Brand}</td>
                                <td>
                                    <ul className="list-actions">
                                        <li><Link to={`/products/${x.Id}`}
                                            className="details-button">DETAILS</Link></li>
                                        <li><button onClick={() => removeProduct(index)}
                                            className="remove-button">REMOVE</button></li>
                                    </ul>
                                </td>
                            </tr>
                        )}
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