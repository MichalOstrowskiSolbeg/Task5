import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';

function ProductListTable(props) {
    const data = props.data
    const [products, setProducts] = useState([]);
    const [filteredData, setFilteredData] = useState(data);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.Name.toLowerCase().includes(searchWord.toLowerCase()) ||
                value.Description.toLowerCase().includes(searchWord.toLowerCase()) ||
                value.Brand.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData(data);
        } else {
            setFilteredData(newFilter);
        }
    };

    useEffect(() => {
        const stored = (localStorage.getItem('cart'));
        if (stored) {
            setProducts(JSON.parse(stored));
        }
    }, []);

    function addProduct(item) {
        var isInMap = false;
        let id, value
        for (let i = 0; i < products.length; i++) {
            const a = products[i]
            if (a.Product.Id === item.Id) {
                isInMap = true;
                id = i
                value = a.Count + 1
            }
        }

        if (!isInMap) {
            products.push({ "Product": item, "Count": 1 })
            localStorage.setItem('cart', JSON.stringify(products));
            props.updateCount(count());
        } else {
            products.splice(id, 1)
            products.push({ "Product": item, "Count": value })
            localStorage.setItem('cart', JSON.stringify(products));
            props.updateCount(count());
        }
    }

    function count() {
        var c = 0;
        for (const object of products) {
            c = c + object.Count;
        }
        return c;
    }

    return (
        <>
            <div className="form">
                <label>SEARCH</label>
                    <input type="text" id="search"
                        className=""
                        onChange={handleFilter} value={wordEntered}
                        placeholder='Search by name, description or brand' />

            </div>
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
                    {filteredData.map(x =>
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