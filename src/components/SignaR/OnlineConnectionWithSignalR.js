import React, { Component } from 'react';
import * as signalR from '@aspnet/signalr';
import url from '../BaseUrl/BaseUrl';

export default class OnlineConnectionWithSignalR extends Component {
    constructor() {
        super()

        
    }

    connectionWithHub = () => {
        let connection = new signalR.HubConnectionBuilder()
            .withUrl(url("/api/chat"))
            .build();

        connection.on("send", data => {
            console.log(data);
        });

        connection.start()
            .then(() => connection.invoke("send", "Hello"));
    }

    render() {
        this.connectionWithHub();
        return (
            <div>
                asd
            </div>
            )
    }
}