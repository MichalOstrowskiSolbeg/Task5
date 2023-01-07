import React from 'react';
import { useParams, useNavigate } from "react-router";
import { Register } from '../../api/AuthApiCalls';
import { checkTextRange } from '../../helpers/ValidationHelpers'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                FirstName: '',
                LastName: '',
                Username: '',
                Password: '',
                Password2: ''
            },
            errors: {
                FirstName: '',
                LastName: '',
                Username: '',
                Password: '',
                Password2: ''
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
            try {
                 await Register(this.state.user)
                 await navigate("/", { replace: true });
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
        if (fieldName === 'FirstName') {
            if (!checkTextRange(fieldValue, 2, 50)) {
                errorMessage = `This field requires from 2 to 50 characters`
            }
            if (!fieldValue) {
                errorMessage = `Required`
            }
        }
        if (fieldName === 'LastName') {
            if (!checkTextRange(fieldValue, 2, 50)) {
                errorMessage = `This field requires from 2 to 50 characters`
            }
            if (!fieldValue) {
                errorMessage = `Required`
            }
        }
        if (fieldName === 'Username') {
            if (!checkTextRange(fieldValue, 2, 50)) {
                errorMessage = `This field requires from 2 to 50 characters`
            }
            if (!fieldValue) {
                errorMessage = `Required`
            }
        }
        if (fieldName === 'Password') {
            if (!checkTextRange(fieldValue, 2, 20)) {
                errorMessage = `This field requires from 2 to 20 characters`
            }
            if (!fieldValue) {
                errorMessage = `Required`
            }
        }
        if (fieldName === 'Password2') {
            if (fieldValue !== this.state.user.Password) {
                errorMessage = `Password values should be the same`
            }
            if (!checkTextRange(fieldValue, 2, 20)) {
                errorMessage = `This field requires from 2 to 20 characters`
            }
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
                    <label htmlFor="FirstName">First Name: <span
                        className="symbol-required"> *</span></label>
                    <input type="text" name="FirstName" id="FirstName" onChange={this.handleChange}
                        placeholder='First Name'
                        className={this.state.errors.FirstName ? 'error-input' : ''} />
                    <span id="errorFirstName" className="errors-text">{this.state.errors.FirstName}</span>

                    <label htmlFor="LastName">Last Name: <span
                        className="symbol-required"> *</span></label>
                    <input type="text" name="LastName" id="LastName" onChange={this.handleChange}
                        placeholder='Last Name'
                        className={this.state.errors.LastName ? 'error-input' : ''} />
                    <span id="errorLastName" className="errors-text">{this.state.errors.LastName}</span>

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

                    <label htmlFor="Password2">Password: <span
                        className="symbol-required"> *</span></label>
                    <input type="password" name="Password2" id="Password2" onChange={this.handleChange}
                        placeholder='Password'
                        className={this.state.errors.Password2 ? 'error-input' : ''} />
                    <span id="errorPassword2" className="errors-text">{this.state.errors.Password2}</span>

                    <div className="form-buttons">
                        <input type="submit" value="REGISTER" className="form-button-submit" />
                        <span id="loginErrors" className="errors-text">{this.state.error}</span>
                    </div>
                </form>
            </>

        return (
            <main>
                <h1>
                    Register
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

export default withNavigate(withRouter(RegisterForm))