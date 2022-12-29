import React, { Component } from 'react';
import CartListTable from "./CartListTable";
import { useParams } from "react-router";

class CartList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: []
        }
    }

    getCartData() {
        const stored = JSON.parse(localStorage.getItem('cart'));
        if (stored) {
            this.setState({
                data: stored,
                isLoaded: true
            });
        } else {
            this.setState({
                isLoaded: true
            });
        }
    }

    componentDidMount() {
        this.getCartData()
    }

    render() {
        const { error, isLoaded, data } = this.state
        let content;

        if (error) {
            content = <p>Error: {error}</p>
        } else if (!isLoaded) {
            content = <p>Loading...</p>
        } else {
            content = <CartListTable data={data} updateCount={this.props.updateCount} />
        }

        return (
            <main>
                <h1>Products in cart</h1>
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

export default withRouter(CartList);