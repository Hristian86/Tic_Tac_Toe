import React, { Component, useReducer, useCallback, useContext, createContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import Tests from '../../components/Tests';
import propsy from '../../components/SendingProps';
import login from '../../components/AuthO/LogIn';
import getCookie from '../../components/Cookies/GetCookie';
import OnlineConnectionWithSignalR from '../../components/SignaR/OnlineConnectionWithSignalR';
import './Home.css';

export const UserContext = createContext({ user: null });

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null,
            loading: false,
            dataAis: []
        }
        this.data = [];

        this.retriveData = this.retriveData.bind(this);
    }

    async componentDidMount() {
        await this.retriveData();
    }

    async retriveData() {
        try {
            const user = getCookie('user');
            if (user) {
                this.setState({
                    user: user
                });
            } else {
                this.setState = null;
            }
        } catch (e) {
            console.log(e);
        }
    }

    getDataFromStore = () => {
        return this.state.dataAis ? this.state.dataAis.map((data, index) => <tr key={index}>
            <td>{data.id}</td>
            <td>{data.createdOn}</td>
            <td>{data.subject}</td>
            <td>{data.userId}</td>
        </tr>) : null;
    }

    getDataFromFire = () => {
        return this.state.dataAis ? this.state.dataAis.map((data, index) =>
            <tr key={index}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.lastName}</td>
                <td>{data.age}</td>
                <td>{data.token}</td>
            </tr>
        ) : null;
    }

    logetUserChek = () => {

    }

    render() {
        //let usr = this.state.user;
        //let fireQuery = new fireDB();
        //console.log(this.props?.hubConnection);
        return (
            <div>
                <div className="chat__hom">
                    <OnlineConnectionWithSignalR
                        hubConnection={this.props?.hubConnection}
                    >

                        

                    </OnlineConnectionWithSignalR>
                </div>


                <div className="spacer"></div>
            </div>
        )
    }
}