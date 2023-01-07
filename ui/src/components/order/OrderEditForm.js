import React, { Component } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { changeOrderStatus, getOrder } from '../../api/OrderApiCalls';
import OrderDetailsTable from './OrderDetailsTable';
import { getFormattedDate } from "../../helpers/DateFormat";

class OrderEditForm extends Component {
    constructor(props) {
        super(props);
        const id = this.props.params.Id
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            Id: id,
            orderStatus: ''
        }
    }

    async getOrderData(Id) {
        try {
            const res = await getOrder(Id)
            this.setState({
                isLoaded: true,
                data: res.data,
                orderStatus: res.data.Status
            });
        } catch (error) {
            console.log(error)
            this.setState({
                error: error.message
            });
        }
    }

    async componentDidMount() {
        await this.getOrderData(this.state.Id)
    }

    onValueChange = (event) => {
        this.setState({
            orderStatus: event.target.value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { navigate } = this.props;
        //const isValid = this.validateForm()
        //if (isValid) {
            try {
                await changeOrderStatus(this.state.Id, this.state.orderStatus)
                await navigate(-1, { replace: true });
            } catch (error) {
                console.log(error)
            }
        //}
    }

    render() {
        const { error, isLoaded, data, orderStatus } = this.state
        let content;

        if (error) {
            content = <p>Error: {error}</p>
        } else if (!isLoaded) {
            content = <p>Loading...</p>
        } else {
            content =
                <>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <label className="filter-div">
                            Status: <span className="symbol-required"> *</span>
                        </label>
                        <div className="filter-div">
                            <div className="radiobox-div">
                            <input type="radio" value="Pending" checked={"Pending" === orderStatus} className="radiobox-input" onChange={this.onValueChange} />
                                Pending
                            </div>
                        <div className="radiobox-div">
                            <input type="radio" value="Accepted" checked={"Accepted" === orderStatus} className="radiobox-input" onChange={this.onValueChange} />
                                Accepted
                            </div>
                            <div className="radiobox-div">
                            <input type="radio" value="Rejected" checked={"Rejected" === orderStatus} className="radiobox-input" onChange={this.onValueChange} />
                                Rejected
                            </div>
                            <div className="radiobox-div">
                            <input type="radio" value="Completed" checked={"Completed" === orderStatus} className="radiobox-input" onChange={this.onValueChange} />
                                Completed
                            </div>
                        </div>
                        <span></span>

                        <label htmlFor="Date">Date</label>
                        <input type="text" name="Date" id="Date" value={getFormattedDate(data.Date)} disabled />
                        <span id="errorDate" className="errors-text"></span>

                        <label htmlFor="TotalCost">Total cost</label>
                        <input type="text" className="" name="TotalCost" id="TotalCost" value={data.TotalCost} disabled />
                        <span id="errorTotalCost" className="errors-text"></span>

                        <div className="form-buttons">
                            <input type="submit" className="form-button-submit" value="SAVE"/>
                            <Link to={`/order`} className="form-button-cancel">BACK</Link>
                        </div>
                    </form>
                    <OrderDetailsTable data={data.OrderProducts} />
                </>
        }

        return (
            <main>
                <h1>Edit Order</h1>
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

const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
};

export default withNavigate(withRouter(OrderEditForm));