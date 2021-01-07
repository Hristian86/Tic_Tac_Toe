import React, { Component } from 'react';
import setCookie from '../Cookies/SetCookie';
import url from '../BaseUrl/BaseUrl';
import './style.css';

const Logout = () => {
    //removeUser();

    const restartCookies = () => {
        setCookie('email', null, -1);
        setCookie("user", null, -1);
        setCookie("token", null, -1);
        setCookie("user_name", null, -1);
        setCookie("cheked", null, -1);
    }

    const logOutHandle = () => {
        setCookie('email', null, -1);
        setCookie("user", null, -1);
        setCookie("token", null, -1);
        setCookie("user_name", null, -1);
        setCookie("cheked", null, -1);
    }

    logOutHandle();
    //fire.auth().signOut();
    return <div className="text-center loading">
        Successfully loged out
            </div>

}
export default Logout;