import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getCurrentUser, isAuthenticated } from '../../helpers/UserHelper';
import { useNavigate } from "react-router-dom"
import { Checkout } from '../../api/ShoppingApiCalls';

function CartListTable(props) {
    const data = props.data
    const navigate = useNavigate();
    const [checkoutError, setError] = useState('');

    function removeProduct(index) {
        data.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(data));
        props.updateCount(count());
    }

    function count() {
        var c = 0;
        for (const object of data) {
            c = c + object.Count;
        }
        return c;
    }

    function totalCost() {
        var sum = 0;
        for (const object of data) {
            sum = sum + (object.Count * object.Product.Cost);
        }
        return sum;
    }

    function isEmpty() {
        return (data.length > 0)
    }

    async function checkout() {
        if (isAuthenticated()) {
            try {
                const res = await Checkout(data)
                const data2 = await res.data
                alert(data2)
            } catch (error) {
                console.log(error)
                setError(error)
            }

            localStorage.removeItem("cart")
            props.updateCount(0);
            navigate(0)
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
                        {data.map((key, index) => (
                            <tr key={index}>
                                <td>{key.Product.Name}</td>
                                <td>{key.Product.Description}</td>
                                <td>${key.Product.Cost}</td>
                                <td>{key.Product.Brand}</td>
                                <td>{key.Count}</td>
                                <td>
                                    <ul className="list-actions">
                                        <li><Link to={`/products/${key.Product.Id}`}
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
                <div className="form">
                    <div className="form-buttons">
                        <button onClick={() => checkout()}
                            className="checkout-button">CHECKOUT</button>
                        <span id="errorCheckout" className="errors-text">{checkoutError}</span>
                    </div>
                </div>
            </>
            :
            <p>Your cart is currently empty</p>
    )
}

export default CartListTable