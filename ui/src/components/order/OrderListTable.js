import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { isAdmin } from "../../helpers/UserHelper";
import { getFormattedDate } from "../../helpers/DateFormat";

function OrderListTable(props) {
    const data = props.data

    return (
        <>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Total cost</th>
                        <th>How many products</th>
                        <th>Status</th>
                        <th>Date</th>
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
                            <td>{getFormattedDate(x.Date)}</td>
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
        </>
    )
}

export default OrderListTable