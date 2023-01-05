import React, { Component } from 'react';
import { useParams } from "react-router";
import { getOrderList } from '../../api/OrderApiCalls';
import OrderListTable from './OrderListTable';

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: []
        }
    }

    async getOrdersData() {
        try {
            const res = await getOrderList()
            this.setState({
                isLoaded: true,
                data: res.data
            });
        } catch (error) {
            console.log(error)
        }
    }

    async componentDidMount() {
        await this.getOrdersData()
    }

    render() {
        const { error, isLoaded, data } = this.state
        let content;

        if (error) {
            content = <p>Error: {error}</p>
        } else if (!isLoaded) {
            content = <p>Loading...</p>
        } else {
            content = <OrderListTable data={data} />
        }

        return (
            <main>
                <h1>Orders</h1>
                <p>List of orders</p>
                {content}
            </main>
        )
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams();
    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};

export default withRouter(OrderList);