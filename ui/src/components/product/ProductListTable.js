import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';

function ProductListTable(props) {
    const data = props.data.Results
    const pageCount = props.data.PageCount
    const [products, setProducts] = useState([]);
    const [wordEntered, setWordEntered] = useState('');
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(9999);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setPage] = useState(props.data.PageIndex);

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

    const handleSearchFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        props.load(currentPage, searchWord, selectedBrand, selectedCategory, minValue, maxValue)
    };

    const handleFilterMinPrice = (event) => {
        const searchValue = event.target.value;
        setMinValue(searchValue);
        props.load(currentPage, wordEntered, selectedBrand, selectedCategory, searchValue, maxValue)
    };

    const handleFilterMaxPrice = (event) => {
        const searchValue = event.target.value;
        setMaxValue(searchValue);
        props.load(currentPage, wordEntered, selectedBrand, selectedCategory, minValue, searchValue)
    };

    const handleBrandChange = (event) => {
        const brand = event.target.value;
        setSelectedBrand(brand);
        props.load(currentPage, wordEntered, brand, selectedCategory, minValue, maxValue)
    }

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        props.load(currentPage, wordEntered, selectedBrand, category, minValue, maxValue)
    }

    const handlePageChange = (page) => {
        setPage(page)
        props.load(page, wordEntered, selectedBrand, selectedCategory, minValue, maxValue)
    }

    return (
        <>
            <div className="filter-div">
                Brands:
                <div className="radiobox-div">
                    <input type="radio" onChange={handleBrandChange} value="" checked={"" === selectedBrand} className="radiobox-input" />
                    All
                </div>
                {Array.from(props.brands).map(x =>
                    <div className="radiobox-div" key={x.Brand}>
                        <input type="radio" value={x.Brand} onChange={handleBrandChange} checked={x.Brand === selectedBrand} className="radiobox-input" />
                        {x.Brand}
                    </div>
                )}
            </div>
            <div className="filter-div">
                Categories:
                <div className="radiobox-div">
                    <input type="radio" onChange={handleCategoryChange} value="" checked={"" === selectedCategory} className="radiobox-input" />
                    All
                </div>
                {Array.from(props.categories).map(x =>
                    <div className="radiobox-div" key={x.Category}>
                        <input type="radio" value={x.Category} onChange={handleCategoryChange} checked={x.Category === selectedCategory} className="radiobox-input" />
                        {x.Category}
                    </div>
                )}
            </div>
            <div className="form">
                <label>Price from: </label>
                <input type="number" id="priceFrom"
                    onChange={handleFilterMinPrice} value={minValue} />
                <span></span>

                <label>Price to:</label>
                <input type="number" id="priceTo"
                    onChange={handleFilterMaxPrice} value={maxValue} />
                <span></span>

                <label>SEARCH</label>
                <input type="text" id="search"
                    onChange={handleSearchFilter} value={wordEntered}
                    placeholder='Search by name, description' />
                <span></span>

            </div>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Cost</th>
                        <th>Brand</th>
                        <th>Category</th>
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
                            <td>{x.Category}</td>
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
            <div className="pagination">
                {Array.from({ length: pageCount }).map((x, i) => (
                    <button
                        key={i+1}
                        onClick={() => handlePageChange(i+1)}
                        disabled={i + 1 === currentPage}
                        className={i +1 === currentPage ? 'active' : ''}>
                        {i+1}
                    </button>
                ))}
            </div>
        </>
    )
}

export default ProductListTable