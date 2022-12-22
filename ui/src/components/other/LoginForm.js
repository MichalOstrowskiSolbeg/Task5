import React from 'react';
import { useParams, useNavigate } from "react-router";
import { Login } from '../../api/AuthApiCalls';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                Username: '',
                Password: ''
            },
            errors: {
                Username: '',
                Password: ''
            },
            error: ''
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        const user = { ...this.state.user }
        user[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            user: user,
            errors: errors
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { navigate } = this.props;
        const isValid = this.validateForm()
        if (isValid) {
            console.log(this.state.user)
            try {
                const res = await Login(this.state.user)
                const data = await res.data
                console.log(data)
                const userString = JSON.stringify(data)
                this.props.handleLogin(userString)
                navigate("/", { replace: true });
            } catch (error) {
                console.log(error)
                this.setState({
                    error: error.response.data
                })
            }
        }
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'Username') {
            if (!fieldValue) {
                errorMessage = `Required`
            }
        }
        if (fieldName === 'Password') {
            if (!fieldValue) {
                errorMessage = `Required`
            }
        }

        return errorMessage
    }

    validateForm = () => {
        const user = this.state.user
        const errors = this.state.errors
        for (const fieldName in user) {
            const fieldValue = user[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors();
    }

    hasErrors = () => {
        const errors = this.state.errors
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true
            }
        }
        return false
    }

    render() {
        const content =
        <>
            <form className="form" onSubmit={this.handleSubmit}>
                <label htmlFor="Username">Username: <span
                    className="symbol-required"> *</span></label>
                <input type="text" name="Username" id="Username" onChange={this.handleChange}
                    placeholder='Username'
                    className={this.state.errors.Username ? 'error-input' : ''} />
                <span id="errorUsername" className="errors-text">{this.state.errors.Username}</span>

                <label htmlFor="Password">Password: <span
                    className="symbol-required"> *</span></label>
                <input type="password" name="Password" id="Password" onChange={this.handleChange}
                    placeholder='Password'
                    className={this.state.errors.Password ? 'error-input' : ''} />
                <span id="errorPassword" className="errors-text">{this.state.errors.Password}</span>

                <span id="loginErrors" className="errors-text">{this.state.error}</span>

                <div className="form-buttons">
                        <input type="submit" value="LOGIN" className="form-button-submit" />
                </div>
            </form>
        </>

        return (
            <main>
                <h1>
                    Login
                </h1>
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

export default withNavigate(withRouter(LoginForm))