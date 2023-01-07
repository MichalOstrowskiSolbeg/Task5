import React, { useState } from 'react';

function OrderDetailsTable(props) {
    const data = props.data
    return (
        <>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Cost</th>
                        <th>Brand</th>
                        <th>How many</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(x =>
                        <tr key={x.Id}>
                            <td>{x.Name}</td>
                            <td>{x.Description}</td>
                            <td>${x.Cost}</td>
                            <td>{x.Brand}</td>
                            <td>{x.Count}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default OrderDetailsTable