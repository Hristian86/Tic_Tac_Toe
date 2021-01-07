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
import Game from './Pages/Game/Game';
//import PrivateRoute from './components/Auth/PrivateRoute';
const App = () => {

    //const [state, setState] = useState({});
    //const [state1, setState1] = useState({});
    //const [{ fetchData }, { user }, dispatch] = useStateValue();

    //useEffect(() => {
    //    const getData = async () => {
    //        const result = await authListener("categoriesApi");
    //        if (result) {
    //            setState1({
    //                data: result
    //            });
    //        }
    //    }
    //    getData();
    //}, []);

    //const addUser = () => {
    //    dispatch({
    //        type: 'CHEK_USER',
    //        user: {},
    //    })
    //}

    //const authListener = async (apiController) => {
    //    const user = getCookie('user');
    //    if (user) {
    //        setState({
    //            user: user
    //        });
    //    } else {
    //        setState({
    //            user: null
    //        });
    //    }

    //    const token = getCookie('token');
    //    const result = await fetch(url(apiController),
    //        {
    //            "headers": {
    //                'Accept': 'application/json',
    //                'Content-Type': 'application/json',
    //                'Authorization': `Bearer ${token}`
    //            }
    //        }
    //    )
    //        .then(data => data.json())
    //        .catch(err => console.log(err));

    //    return result;
    //}
    //console.log(state);
    //console.log(state1);


    return <div className="App">
        <header className="App-header">
            <Layout>
                <Router>

                    <Navbars />

                    <Switch>

                        <Route exact path="/" component={Home}>
                        </Route>

                        <Route exact path="/game" component={Game}>
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

//const PrivateRoute = ({ component: Component, ...rest }) => {
//    var resut = authListener();
//    var rs = { ...rest };
//    var chek = false;
//    resut.then(res => res);
//    setTimeout(() => {
//        console.log(useraaa);
//        if (useraaa.email !== undefined) {
//            return <Route {...rest} render={(props) => (
//                chek ? <Component {...props} /> : <Redirect to="/Auth/LogIn" />
//            )
//            } />
//        }
//    }, 1000);

//    if (rs !== undefined) {
//        chek = true;
//    }

//    return <Route {...rest} render={(props) => (
//        chek ? <Component {...props} /> : <Redirect to="/Auth/LogIn" />
//    )
//    } />
//}

//async function authListener() {
//    let chek = false;
//    const users = await fire.auth().onAuthStateChanged(user => {
//        if (user) {
//            chek = true;
//        } else {
//        }
//    });
//    return chek;
//}