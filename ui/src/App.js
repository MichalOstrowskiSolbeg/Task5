import React, { Component } from 'react';
import {
    Routes,
    Route, BrowserRouter,
} from "react-router-dom";
import Header from './components/other/Header';
import Footer from './components/other/Footer';
import MainPage from './components/other/MainPage';
import Navigation from './components/other/Navigation';
import ProductList from './components/product/ProductList';
import ProductDetails from './components/product/ProductDetails';
import CartList from './components/cart/CartList';
import LoginForm from './components/other/LoginForm';
import RegisterForm from './components/other/RegisterForm';
import { getCurrentUser } from "./helpers/UserHelper";
import RequireAuth from "./helpers/RequireAuth";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            count: 0
        }
    }

    updateCount = newCount => {
        this.setState({ count: newCount });
    };

    handleLogin = (user) => {
        localStorage.setItem("userToken", user)
        this.setState({ user: user })
    }

    handleLogout = () => {
        localStorage.removeItem("userToken")
        this.setState({ user: undefined })
    }

    count = (data) => {
        var c = 0;
        for (const object of data) {
            c = c + object.Count;
        }
        return c;
    }

    componentDidMount() {
        const currentUser = getCurrentUser()
        const stored = JSON.parse(localStorage.getItem('cart'));
        if (stored) {
            this.setState(
                {
                    user: currentUser,
                    count: this.count(stored)
                })
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Header count={this.state.count} handleLogout={this.handleLogout} />
                <Navigation />
                <Routes>
                    <Route path="/" element={<MainPage />} />

                    <Route path="/login" element={<LoginForm handleLogin={this.handleLogin} />} />
                    <Route path="/register" element={<RegisterForm />} />

                    <Route path="/products" element={<ProductList updateCount={this.updateCount} />} />
                    <Route path="/products/:Id" element={<ProductDetails />} />

                    <Route path="/cart" element={<CartList updateCount={this.updateCount} />} />
                    <Route element={<RequireAuth />}>
                        <Route path="/checkout" element={<MainPage />} />
                    </Route>
                </Routes>
                <Footer />
            </BrowserRouter>
            );
    }
}