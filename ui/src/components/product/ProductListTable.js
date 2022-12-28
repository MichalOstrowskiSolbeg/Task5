import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';

function ProductListTable(props) {
    const data = props.data
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const stored = (localStorage.getItem('cart2'));
        if (stored) {
            setProducts(JSON.parse(stored));
        }
    }, []);

    function addProduct(item) {
        var isInMap = false;
        let id, value
        for (const [key, [p, v]] of (products).entries()) {
            //console.log(key + " => " + p + " " + v)
            if (p.Id === item.Id) {
                isInMap = true;
                id = key
                value = v+1
            }
        }

        if (!isInMap) {
            products.push([item, 1])
            localStorage.setItem('cart2', JSON.stringify(products));
            props.updateCount(count());
        } else {
            products.splice(id, 1)
            products.push([item, value])
            localStorage.setItem('cart2', JSON.stringify(products));
            props.updateCount(count());
        }
    }

    function count() {
        var c = 0;
        for (const [key, value] of products) {
            c = c + value;
        }
        return c;
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