import React, { Component } from 'react';
import * as signalR from '@aspnet/signalr';
import url from '../BaseUrl/BaseUrl';
import getCookie from '../Cookies/GetCookie';
import StateStore from './StateStore';
import Game from '../../Pages/Game/Game';

export default class OnlineConnectionWithSignalR extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: null,
            message: "",
            recevedMessage: [],
            opponent: "",
            gameState: {},
            turn: 0,
            positionParametars: null,
            matrix: [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]],
        }
    }

    componentDidMount = () => {
        const user = getCookie('user');
        this.setState({
            currentUser: user,
        })
        let hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(url("message"))
            .build();

        this.setState({ hubConnection }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on("send", (name, message, oppnentName, userTurn, cordinates) => {

                let data = this.state.recevedMessage;
                console.log(data);
                data.push(name + " " + message);
                this.setState({
                    recevedMessage: data,
                });

            });

            this.state.hubConnection.on("play", (name, oppnentName, userTurn, cordinates) => {

                if (oppnentName == this.state.currentUser) {
                    console.log("Here");
                    this.setState({
                        positionParametars: cordinates,
                    })

                    // Fixing this thing for impruvments.
                    if (cordinates.length > 1) {
                        const position = cordinates.split(", ");
                        const matrix = this.state.matrix;
                        matrix[position[0]][position[1]] = "Y";
                        this.setState({
                            matrix: matrix,
                        })
                    }

                    console.log("aaa");

                    console.log(name);
                    console.log(oppnentName);
                    console.log(userTurn);
                    console.log(cordinates);
                }

            });

        });
    }

    Play = (position) => {

        const user = getCookie("user");
        const opponent = "Admin1";

        const names = ["Admin1", "Admin"];
        console.log(this.state);
        this.state.hubConnection.invoke("play", user, this.state.opponent, names[this.state.turn], position)
            .catch(err => console.error(err));

        if (this.state.turn == 0) {
            this.setState({
                turn: 1,
            })
        } else {
            this.setState({
                turn: 0,
            })
        }
    };

    sendMessage = (e) => {
        e.preventDefault();

        const userName = getCookie('user');
        const opponent = "Admin1";

        this.state.hubConnection.invoke("send", userName, this.state.message, opponent, userName, "1, 1")
            .catch(err => console.error(err));

        this.setState({ message: '' });
    };

    opponentHandler = (e) => {
        this.setState({
            opponent: e.target.value,
        })

    }

    render() {

        return (
            <div className="container-fluid">

                <form>
                    <input
                        value={this.state.opponent} onChange={this.opponentHandler} />

                    <button type="sybmit">Add Player</button>

                </form>

                <button onClick={() => this.Play("asd")}>Play</button>

                <form
                    className="col-sm-2 chat__home"
                    onSubmit={this.sendMessage}>

                    <input
                        type="text"
                        value={this.state.message}
                        onChange={(e) => this.setState({ message: e.target.value })} />

                    <button
                        type="submit"
                        className="btn btn-sm btn-success">Send</button>

                    {this.state?.recevedMessage?.reverse()?.map((data, index) => <div
                        className="static__chield"
                        key={index}>
                        {data}
                    </div>)}
                </form>


                <Game
                    matrix={this.state.matrix}
                    positionParametars={this.state.positionParametars}
                    Play={this.Play}
                />

                {this.props.children}
                <div></div>
            </div>
        )
    }
}