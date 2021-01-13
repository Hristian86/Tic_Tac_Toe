import React, { Component, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import Register from './components/AuthO/Register';
import login from './components/AuthO/LogIn';
import Logout from './components/AuthO/Logout';
import Home from './Pages/Home/Home';
import Navbars from './components/Navbars';
import { useState } from 'react';
import { useStateValue } from './components/ContextApi/StateProvider';
import getCookie from './components/Cookies/GetCookie';
import setCookie from './components/Cookies/SetCookie';
import url from './components/BaseUrl/BaseUrl';
import NotFound from './Pages/NotFoundPage/NotFount';
import * as signalR from '@aspnet/signalr';
import { INSERT_HUB_CONNECTION } from './components/ContextApi/Types';


//import PrivateRoute from './components/Auth/PrivateRoute';
const App = () => {
     const [hubConnection, setHubConnection] = useState();

    useEffect(() => {
        let hubConnection1 = new signalR.HubConnectionBuilder()
            .withUrl(url("message"))
            .build();

        setHubConnection(hubConnection1);

    }, [])

    useEffect(() => {
        if (hubConnection) {
            hubConnection.start()
                .then(result => {
                    console.log('Connected!');

                })
                .catch(e => console.log('Connection failed: ', e));
        }

    }, [hubConnection])



    return <div className="App">
        <header className="App-header">
            <Layout>
                <Router>

                    <Navbars />

                    <Switch>

                        <Route exact path="/" >
                            <Home
                                hubConnection={hubConnection}
                            />
                        </Route>


                        <Route path="/AuthO/Register" component={Register}>
                        </Route>
                        <Route path="/AuthO/LogIn" component={login}>
                        </Route>
                        <Route path="/AuthO/Logout" component={Logout}>
                        </Route>

                        <Route path="*" component={NotFound}>
                        </Route>
                    </Switch>
                </Router>

            </Layout>

        </header>
    </div>
}
export default App;