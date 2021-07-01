import React from 'react';
import { NavItem, Table } from 'react-bootstrap'
import './css/MyOrders.css';

const MyOrders = () => {
    return (
        <>
        <div className="orders">MyOrders</div>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Price</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Mark bought what</td>
                <td>day</td>
                <td>$</td>
                </tr>

                <tr>
                <td>2</td>
                <td>Nic</td>
                <td>what did nic buy</td>
                <td>when</td>
                <td>$ how much</td>
                </tr>

                <tr>
                <td>3</td>
                <td colSpan="2">Larry the Bird</td>
                <td>$</td>
                </tr>

            </tbody>
            </Table>
            </>
    )
}

export default MyOrders