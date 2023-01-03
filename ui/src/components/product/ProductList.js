import React, { Component } from 'react';
import { getProductList } from '../../api/ProductApiCalls';
import { getBrands } from '../../api/BrandApiCalls';
import { getCategories } from '../../api/CategoryApiCalls';
import ProductListTable from "./ProductListTable";
import { useParams } from "react-router";

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            brands: [],
            categories: []
        }
    }

    async getProductsData(data) {
        try {
            const res = await getProductList(data)
            this.setState({
                isLoaded: true,
                data: res.data
            });
        } catch (error) {
            console.log(error)
        }
    }

    async getBrandsData() {
        try {
            const res = await getBrands()
            this.setState({
                brands: res.data
            });
        } catch (error) {
            console.log(error)
        }
    }

    async getCategoriesData() {
        try {
            const res = await getCategories()
            this.setState({
                categories: res.data
            });
        } catch (error) {
            console.log(error)
        }
    }

    async componentDidMount() {
        await this.getProductsData({})
        await this.getBrandsData()
        await this.getCategoriesData()
    }

    handlePageChange = (page, search, brand, category, priceFrom, priceTo) => {
        const request = {
            Page: page,
            PriceFrom: priceFrom,
            PriceTo: priceTo,
            Search: search,
            Brand: brand,
            Category: category
        }
        this.getProductsData(request);
    }

    render() {
        const { error, isLoaded, data, brands, categories } = this.state
        let content;

        if (error) {
            content = <p>Error: {error}</p>
        } else if (!isLoaded) {
            content = <p>Loading...</p>
        } else {
            content = <ProductListTable data={data} updateCount={this.props.updateCount} load={this.handlePageChange} brands={brands} categories={categories} />
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