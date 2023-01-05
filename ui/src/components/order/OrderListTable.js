import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { isAdmin } from "../../helpers/UserHelper";

function OrderListTable(props) {
    const data = props.data
    const pageCount = props.data.PageCount
    const [currentPage, setPage] = useState(props.data.PageIndex);

    const handlePageChange = (page) => {
        //setPage(page)
        //props.load(page, wordEntered, selectedBrand, selectedCategory, minValue, maxValue)
    }

    return (
        <>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Total cost</th>
                        <th>How many</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(x =>
                        <tr key={x.Id}>
                            <td>{x.Id}</td>
                            <td>${x.TotalCost}</td>
                            <td>{x.Count}</td>
                            <td>{x.Status}</td>
                            <td>
                                <ul className="list-actions">
                                    <li>
                                        <Link to={`/order/details/${x.Id}`} className="details-button">DETAILS</Link>
                                    </li>
                                    {isAdmin() &&
                                        <li>
                                            <Link to={`/order/edit/${x.Id}`} className="edit-button">EDIT</Link>
                                        </li>
                                    }
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

export default OrderListTable