import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';

function ProductListTable(props) {
    const data = props.data
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('cart2'));
        if (stored) {
            setProducts(stored);
        }
    }, []);

    function addProduct(item) {
        console.log(products)
        if (!products.some(e => e.Name === item.Name && e.Id === item.Id)) {
            products.push(item)
            setProducts(products);

            //console.log(products)
            localStorage.setItem('cart2', JSON.stringify(products));

            props.updateCount(products.length);
        }
    }


    return (
        <>
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
                    {data.map(x =>
                        <tr key={x.Id}>
                            <td>{x.Name}</td>
                            <td>{x.Description}</td>
                            <td>${x.Cost}</td>
                            <td>{x.Brand}</td>
                            <td>
                                <ul className="list-actions">
                                    <li><Link to={`/products/${x.Id}`}
                                        className="details-button">DETAILS</Link></li>

                                    <li><button className="add-to-cart-button" onClick={() => addProduct(x)}>ADD TO CART</button></li>
                                </ul>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default ProductListTable