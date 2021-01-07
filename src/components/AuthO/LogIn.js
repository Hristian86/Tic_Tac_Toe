import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import LogInSuccess from './LogInSuccess';
import { Redirect, useHistory, useParams } from 'react-router';
import { setCookieToken, setCookieUser } from '../Cookies/SetCookie';
import url from '../BaseUrl/BaseUrl';
import './style.css';
import LogInHandler from './LogInHandler';
import setCookie from '../Cookies/SetCookie';
import { useState } from 'react';
import { useStateValue } from '../ContextApi/StateProvider';
import { CHECK_USER } from '../ContextApi/Types';
import { Link } from 'react-router-dom';
import { upPage } from '../UpPage/Uppage';
import FetchData from '../AuthListener/FetchData';

const Login = (props) => {
    const history = useHistory();
    const [passwordState, setPasswordState] = useState("");
    const [emailState, setEmailState] = useState("");

    const [{ user }, dispatch] = useStateValue();
    //console.log(user);
    const contextUser = user;
    const addUser = (user) => {
        dispatch({
            type: CHECK_USER,
            user: {
                user: user
            },
        })
    }

    const [state, setState] = useState({});
    const [historyState, setHistoryState] = useState({
        history: false,
    });
    let { payment } = useParams();

    console.log(history.location);

    const loginFunc = async (e) => {
        setState({
            buttonPresed: true
        });
        e.preventDefault();
        let error = document.getElementById('errors');
        //const { history } = props;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {

            if (email.length > 5 && password.length > 5) {

                error.innerHTML = "Procesing...";

                let payload = {
                    "email": email,
                    "password": password
                }

                let notLoged = false;

                let user = await LogInHandler(payload);
                console.log(user);
                if (user.email && user.token) {

                    // Adding user to the store
                    addUser(user);
                    if (user.role[0] !== undefined) {
                        setCookie("role", user.role, 5);
                    }
                    // Setting cookie user
                    user.user ? setCookieUser(user.user) :
                        setCookieUser(user.email);
                    setCookie('email', user.email, 5);
                    setCookieToken(user.token);
                    setCookie('expiration', user.expiration, 1);
                    //console.log(user);
                    const forgery = await FetchData("api/antiForgery", null, "GET");
                    if (await forgery) {
                        setCookie('XSRF-TOKEN', forgery.cookieToken, 5);
                    }
                    error.innerHTML = "Success";

                    if (payment === "return") {
                        history.goBack();
                    } else {
                        setTimeout(function () {
                            history.push('/');
                            //window.location.reload(false);
                        }, 700);
                    }
                } else if (user.errors) {
                    setState({
                        buttonPushed: false
                    });
                    error.innerHTML = "";

                    let arrayOfErrors = Object.values(user.errors);

                    arrayOfErrors.forEach((item, index) => {
                        error.innerHTML += item + "<br />";
                    });

                } else if (user.error) {
                    error.innerHTML = user.error;
                } else {
                    setState({
                        buttonPresed: false
                    });
                    error.innerHTML = "Wrong email or password";
                }

            } else {
                if (email.length < 6) {
                    setState({
                        buttonPresed: false
                    });
                    error.innerHTML = "Email addres lenght must be at least 6 symbols";

                } else if (password.length < 6) {
                    setState({
                        buttonPresed: false
                    });

                    error.innerHTML = "Password length must be at least 6 symbols";

                }
            }

        } catch (e) {
            setState({
                buttonPresed: false
            });
            error.innerHTML = "server error";
        }

    }

    const emailHandler = (e) => {
        const email = e.target.value;
        const error = document.getElementById('emailError');
        error.innerHTML = null;
        if (email.length < 6) {
            error.innerHTML = "Email addres lenght must be at least 6 symbols";
        }

        // add regex
        if (email.length <= 20) {
            setEmailState(email);
        }
    }

    const passwordHandler = (e) => {
        const password = e.target.value;
        const pass = e.target.value;
        const error = document.getElementById('passError');
        error.innerHTML = null;
        if (pass.length < 6) {
            error.innerHTML = "Password length must be at least 6 symbols";
        }

        // add regex
        if (pass.length <= 10) {
            setPasswordState(password);
        }
    }

    return (<div>
        <div className="backgrounds">
            <h3 className="logo">Log in</h3>
            <h3 id="errors" className="text-danger text-center error" ></h3>

            <div className="container d-flex justify-content-center">

                <form className="registerForm text-center" onSubmit={loginFunc}>

                    <h3 className="text-white shadow-box">Email</h3>
                    <FormControl
                        onChange={emailHandler}
                        className="userInput m-auto"
                        value={emailState}
                        type="Email"
                        name="email"
                        maxLength="50"
                        placeholder="Email"
                    />
                    <span id="emailError"></span>

                    <h3 className="text-white shadow-box">Password</h3>
                    <FormControl
                        type="password"
                        onChange={passwordHandler}
                        className="passwordInput m-auto"
                        maxLength="60"
                        value={passwordState}
                        placeholder="Password"
                        name="password"
                    />
                    <span id="passError"></span>

                    <h3></h3>
                    {state.buttonPresed ? <em>Loading..</em> : <input
                        type="submit"
                        value="Log in"
                        className="btn btn-primary buttons"
                    />}

                    <Link
                        to="/authO/register"
                        className="mr-3 text-infos">
                        <div className="">
                            <span className="header__optionsLineOne">Dont have account </span>< br />
                            <span className="register__link text-white shadow-box">Create new account</span>
                        </div>
                    </Link>


                    <a
                        href={url("Identity/Account/ForgotPassword")}
                        className="mr-3 text-infos">
                        <div className="">
                            <span className="register__link text-white shadow-box">Forgot your password?</span>
                        </div>
                    </a>

                </form>



                <div className="spacer"></div>
            </div>
        </div>

    </div>)
}
export default Login