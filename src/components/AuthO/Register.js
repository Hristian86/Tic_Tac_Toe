import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router';
import setCookie, { setCookieUser, setCookieToken } from '../Cookies/SetCookie';
import url from '../BaseUrl/BaseUrl';
import './style.css';
import RegAuth from './RegAuth';
//import { validateEmail } from '../Contact/Validate';
import style from './style.module.css';
import { useState } from 'react';
import { useStateValue } from '../ContextApi/StateProvider';
import { CHECK_USER } from '../ContextApi/Types';

const Register = () => {
    const [state, setState] = useState({});
    const history = useHistory();
    const [{ user }, dispatch] = useStateValue();
    //console.log(user);
    const addUser = (user) => {
        dispatch({
            type: CHECK_USER,
            user: {
                user: user
            },
        })
    }

    const signUpFunc = async (e) => {
        setState({
            buttonPushed: true
        });
        e.preventDefault();
        let error = document.getElementById('errors');
        const email = e.target.email.value;
        const userName = e.target.userName.value;
        const password = e.target.password.value;
        const passwordConf = e.target.passwordConf.value;

        try {

            error.innerHTML = "";
            if (password === passwordConf) {

                if (email.length > 5 && password.length > 5 && userName.length > 3 && userName.length <= 14) {
                    error.innerHTML = "Procesing...";

                    let payload = {
                        "email": email,
                        "userName": userName,
                        "password": password
                    }

                    const result = await RegAuth(payload);
                    const user = result;
                    console.log(result);
                    if (result === "User created") {
                        error.innerHTML = "Account created suceesfully";

                        setTimeout(function () {
                            history.push("/authO/login");
                        }, 700);
                    }else if (result.error) {
                        error.innerHTML = result.error;
                        setState({
                            buttonPushed: false
                        });

                    } else if (result.errors) {
                        setState({
                            buttonPushed: false
                        });
                        error.innerHTML = "";
                        
                        let arrayOfErrors = Object.values(result.errors);

                        arrayOfErrors.forEach((item, index) => {
                            error.innerHTML += item + "<br />";
                        });

                    } else if (user.email && user.token) {
                        // Adding user to the store
                        addUser(user);

                        // Setting cookie user
                        user.user ? setCookieUser(user.user) :
                            setCookieUser(user.email);
                        setCookie('XSRF-TOKEN', user.xsrfToken, 5);
                        setCookie('email', user.email, 5);
                        setCookieToken(user.token);
                        setCookie('expiration', user.expiration, 1);
                        //console.log(user);
                        error.innerHTML = "Account created suceesfully";

                        setTimeout(function () {
                            history.push("/");
                        }, 700);
                    }

                } else {
                    if (email.length < 6) {
                        setState({
                            buttonPushed: false
                        });
                        error.innerHTML = "Email addres lenght must be at least 6 symbols";

                    } else if (password.length < 6) {
                        setState({
                            buttonPushed: false
                        });
                        error.innerHTML = "Password length must be at least 6 symbols";
                    } else if (userName.length < 6) {
                        setState({
                            buttonPushed: false
                        });
                        error.innerHTML = "User name must be at least 6 symbols";
                    } else {
                        error.innerHTML = "Validation error";
                        setState({
                            buttonPushed: false
                        });
                    }
                }

            } else {
                setState({
                    buttonPushed: false
                });
                error.innerHTML = "Password does not match";
            }
        } catch (e) {
            console.log(e);
        }
    }

    const emailHandler = (e) => {
        let errorEmail = document.getElementById('emailError');
        const email = e.target.value;
        errorEmail.innerHTML = null;
        if (email.length < 4) {
            if (email.length < 4) {
                errorEmail.innerHTML = "Length must at least 6 symbols";
            } else {
                errorEmail.innerHTML = "Invalid email";
            }
        }
    }

    const userHandler = (e) => {
        const user = e.target.value;
        const error = document.getElementById('userError');
        error.innerHTML = null;
        if (user.length < 3) {
            error.innerHTML = "User name length must be at least 3 symbols";
        } else if (user.length > 13) {
            error.innerHTML = "User can be max 13 symbols";
        } else {
            setState({
                user: user
            });
        }
    }

    const passwordHandler = (e) => {
        const password = e.target.value;
        const pass = e.target.value;
        const error = document.getElementById('passError');
        error.innerHTML = null;
        if (pass.length < 6) {
            error.innerHTML = "Password length must be at least 6 symbols";
        } else {
            setState({
                password: pass
            });
        }
    }

    const confirmPassHandler = (e) => {
        const pass = e.target.value;
        const error = document.getElementById('confPassError');
        error.innerHTML = null;
        if (pass !== state.password) {
            error.innerHTML = "Passwords does not match";
        }
    }

    window.scrollTo(0, 0);

    return <div className="backgrounds">
        <h3 className="logo">Register</h3>

        <h3 id="errors" className="text-danger text-center error"></h3>
        <div className="container d-flex justify-content-center">

            <form className="registerForm text-center" onSubmit={signUpFunc}>

                <h3 className="text-white shadow-box">Email</h3>
                <FormControl className="userInput m-auto" onChange={emailHandler} type="email" name="email" maxLength="50" placeholder="Email" />
                <span id="emailError"></span>

                <h3 className="text-white shadow-box">User name</h3>
                <FormControl onChange={userHandler} type="text" className="passwordInput m-auto" maxLength="60" placeholder="User name" id="user" name="userName" />
                <span id="userError"></span>

                <h3 className="text-white shadow-box">Password</h3>
                <FormControl onChange={passwordHandler} type="password" className="passwordInput m-auto" maxLength="60" placeholder="Password" id="password" name="password" />
                <span id="passError"></span>

                <h3 className="text-white shadow-box">Confirm password</h3>
                <FormControl onChange={confirmPassHandler} type="password" className="passwordInput m-auto" maxLength="60" placeholder="Confirm password" name="passwordConf" />
                <span id="confPassError"></span>

                <h3></h3>
                {state.buttonPushed ? <em>Loading...</em> : <input type="submit" value="Submit to register" className="btn btn-primary buttons" />}

            </form>

            <div className="spacer"></div>
        </div>

    </div>
}

export default Register;