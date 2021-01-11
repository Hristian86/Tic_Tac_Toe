import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Button, FormControl, Form } from 'react-bootstrap';
import { Collapse, Container, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Link } from 'react-router-dom';
import Register from './AuthO/Register';
import LogIn from './AuthO/LogIn';
import propsy from './SendingProps';
import getCookie from './Cookies/GetCookie';
import Home from '../Pages/Home/Home';
import { useState } from 'react';
import { useEffect } from 'react';
import url from './BaseUrl/BaseUrl';
import { useStateValue } from './ContextApi/StateProvider';
import Logout from './AuthO/Logout';
import setCookie from './Cookies/SetCookie';
import { useRef } from 'react';

const Navbars = () => {
    const [state, setState] = useState({});
    const [state1, setState1] = useState({});
    const [store, dispatch] = useStateValue();
    let user = store.user;

    const logOutHandle = () => {
        setCookie('email', null, -1);
        setCookie("user", null, -1);
        setCookie("token", null, -1);
        setCookie("user_name", null, -1);
        setCookie("cheked", null, -1);
        dispatch({
            type: 'REMOVE_USER',
            user: {
                user: []
            },
        });
        //const { history } = this.props;
        //setTimeout(function () {
        //    history.push('/');
        //    window.location.reload(false);
        //}, 700);
    }


    const retriveData = () => {

        const user = getCookie('user');

        if (user?.length > 1) {
            setTimeout(() => {
                setState({
                    user: {
                        user: user
                    }
                });
            }, 250)
        } else {

        }

    }

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            // Your useEffect code here to be run on update
            setState({
                user: user[0] != undefined ? user[0].user : null
            });
        }


        setTimeout(() => {
            setState({
                user: user[0] != undefined ? user[0].user : null
            });
        }, 200);

        retriveData();

    }, [user])

    const prevDef = () => {
        console.log(store);
        console.log(user);
        console.log(state?.user?.user);
        console.log(state.user.user);
    }

    const removefromBasket = () => {
        console.log("removing");
        dispatch({
            type: 'REMOVE_ITEM_FROM_BASKET',
            removefromBasket: {
                id: 3
            },
        });
    }

    return <Navbar bg="light" expand="lg">
        <Link to="/" onClick={() => prevDef}>Home</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="mr-auto">

                <Link
                    className="text-info ml-sm-3"
                    to="/"
                    onClick={() => prevDef}>
                    Game
                    </Link>
               

            </Nav>

            <Form inline className="mr-3">
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
            </Form>

            <Link
                to={state.user ? "/" : "/AuthO/Register"} className="text-info mr-3"
                onClick={() => prevDef}>
                {state.user?.user ? state.user.user + "'s management" : "Register"}
            </Link>

            <Link
                to={state.user ? "/AuthO/Logout" : "/AuthO/LogIn"}
                className="mr-3 text-info"
                onClick={logOutHandle}>
                {state.user ? "Log out" : "LogIn"}
            </Link>

            <Link to="/" className="mr-3 text-info" onClick={prevDef}>{store?.basket?.length}</Link>

            <button onClick={removefromBasket}>removefromBasket</button>

            <div className="mr-3 text-info" onClick={prevDef}>{user?.length}</div>

        </Navbar.Collapse>
    </Navbar>

}




export default Navbars;