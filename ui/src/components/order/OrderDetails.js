import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getOrder } from '../../api/OrderApiCalls';
import { isAdmin } from '../../helpers/UserHelper';
import OrderDetailsTable from './OrderDetailsTable';
import { getFormattedDate } from "../../helpers/DateFormat";

class OrderDetails extends Component {
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

    async getOrderData(Id) {
        try {
            const res = await getOrder(Id)
            this.setState({
                isLoaded: true,
                data: res.data
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

    render() {
        const { error, isLoaded, data } = this.state
        let content;

        if (error) {
            content = <p>Error: {error}</p>
        } else if (!isLoaded) {
            content = <p>Loading...</p>
        } else {
            content =
                <>
                    <form className="form">
                        <label htmlFor="Status">Status</label>
                        <input type="text" name="Status" id="Status" value={data.Status} disabled />
                        <span id="errorStatus" className="errors-text"></span>

                        <label htmlFor="Date">Date</label>
                        <input type="text" name="Date" id="Date" value={getFormattedDate(data.Date)} disabled />
                        <span id="errorDate" className="errors-text"></span>

                        <label htmlFor="TotalCost">Total cost</label>
                        <input type="text" name="TotalCost" id="TotalCost" value={data.TotalCost} disabled />
                        <span id="errorTotalCost" className="errors-text"></span>

                        <div className="form-buttons">
                            {isAdmin() &&
                                <>
                                    <Link to={`/order/edit/${data.Id}`} className="form-button-edit">EDIT</Link>
                                    <Link to={`/admin_panel`} className="form-button-cancel">BACK</Link>
                                </>
                            }
                            {!isAdmin() &&
                                <Link to={`/order`} className="form-button-cancel">BACK</Link>
                            }
                        </div>
                    </form>
                    <OrderDetailsTable data={data.OrderProducts} />
                </>
        }

        return (
            <main>
                <h1>Order details</h1>
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

export default withRouter(OrderDetails);