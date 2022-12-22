import React, { Component } from 'react';
import { getProductList } from '../../api/ProductApiCalls';
import ProductListTable from "./ProductListTable";
import { useParams } from "react-router";

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: []
        }
    }

    async getProductData() {
        try {
            const res = await getProductList()
            console.log(res.data)
            this.setState({
                isLoaded: true,
                data: res.data
            });
        } catch (error) {
            console.log(error)
            this.setState({
                error: error
            });
        }
    }

    async componentDidMount() {
        await this.getProductData()
    }

    render() {
        const { error, isLoaded, data } = this.state
        let content;

        if (error) {
            content = <p>Error: {error}</p>
        } else if (!isLoaded) {
            content = <p>Loading...</p>
        } else {
            content = <ProductListTable data={data} updateCount={this.props.updateCount} />
        }

        return (
            <main>
                <h1>Products</h1>
                <p>List of available products</p>
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

export default withRouter(ProductList);