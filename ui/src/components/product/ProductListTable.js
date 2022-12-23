import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';

function ProductListTable(props) {
    const data = props.data
    const [products, setProducts] = useState(new Map());

    useEffect(() => {
        const stored = (localStorage.getItem('cart2'));
        if (stored) {
            setProducts(new Map(JSON.parse(stored)));
        }
    }, []);

    function addProduct(item) {
        var isInMap = false;
        for (const [key, value] of (products)) {
            if (key.Id === item.Id) {
                isInMap = true;
            }
        }


        if (!isInMap) {
            products.set(item, 1)
            setProducts(new Map(products));

            localStorage.setItem('cart2', JSON.stringify(Array.from(products)));
            props.updateCount(products.size);
        } else {
            console.log("is in map")
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