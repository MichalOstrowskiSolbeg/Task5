import React, { Component } from 'react';
import { getProduct } from '../../api/ProductApiCalls';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

class ProductDetails extends React.Component {
    constructor(props) {
        super(props);
        const id = this.props.params.Id
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            Id: id
        }
    }

    async getProductData(Id) {
        try {
            const res = await getProduct(Id)
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
        await this.getProductData(this.state.Id)
    }

    render() {
        const { error, isLoaded, data } = this.state
        let content;

        if (error) {
            content = <p>Error: {error}</p>
        } else if (!isLoaded) {
            content = <p>Loading...</p>
        } else {
            content = <form className="form">
                <label htmlFor="Name">Name</label>
                <input type="text" className="" name="Name" id="Name" value={data.Name} disabled />
                <span id="errorName" className="errors-text"></span>

                <label htmlFor="Description">Description</label>
                <input type="text" className="" name="Description" id="Description" value={data.Description} disabled />
                <span id="errorDescription" className="errors-text"></span>

                <label htmlFor="Brand">Brand</label>
                <input type="text" className="" name="Brand" id="Brand" value={data.Brand} disabled />
                <span id="errorBrand" className="errors-text"></span>

                <label htmlFor="Cost">Cost $</label>
                <input type="text" className="" name="Cost" id="Cost" value={data.Cost} disabled />
                <span id="errorCost" className="errors-text"></span>

                <label htmlFor="Category">Category</label>
                <input type="text" className="" name="Category" id="Category" value={data.Category} disabled />
                <span id="errorCategory" className="errors-text"></span>

                <div className="form-buttons">
                    <Link to={`/products`} className="form-button-cancel">BACK</Link>
                </div>
            </form>
        }

        return (
            <main>
                <h1>Product details</h1>
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

export default withRouter(ProductDetails);