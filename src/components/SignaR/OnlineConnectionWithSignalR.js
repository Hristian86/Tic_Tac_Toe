import React, { Component } from 'react';
import * as signalR from '@aspnet/signalr';
import url from '../BaseUrl/BaseUrl';
import getCookie from '../Cookies/GetCookie';
import StateStore from './StateStore';
import Game from '../../Pages/Game/Game';
import FirstLoop from '../../Pages/Game/Figures/FirstLoop';
import CheckForEquals from '../../Pages/Game/Figures/CheckForEquals';
import ResetMatrix from '../../Pages/Game/ResetMatrix/ResetMatrix';

const isSymbolAdded = null;
const cpuSymbol = "Y";
const userSymbol = "X";

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
            multyplayer: false,
            gameEnd: false,
            opponentWin: false,
            playAgain: "no",
            resetMultyplayerGame: false,
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

            this.state.hubConnection.on("play", (name, oppnentName, userTurn, cordinates, endGameWinner, playAgain) => {
                console.log(playAgain);
                // Here is play again.
                if (playAgain === "yes") {
                    console.log("hereeeeeeeeeee");
                    let matrix = this.state.matrix;

                    matrix = ResetMatrix(matrix, "0");

                    this.setState({
                        matrix: matrix,
                        playAgain: "no",
                        gameEnd: false,
                        resetMultyplayerGame: true,
                    })
                }

                // if opponent name equal current name.
                if (oppnentName == this.state.currentUser && !this.state.gameEnd) {
                    console.log("Here");
                    this.setState({
                        positionParametars: cordinates,
                    })


                    // Fixing this thing for impruvments.
                    if (name.length > 1 && cordinates.length > 2) {
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
                    console.log("Opponent winner" + endGameWinner);

                    console.log("Play again " + playAgain);
                }

                let resultStr = FirstLoop(this.state.matrix, cpuSymbol, userSymbol, isSymbolAdded);


                if (resultStr == "END") {
                    this.setState({
                        gameEnd: true,
                    })
                    //return "END";
                } else if (resultStr == "CPU WIN") {
                    this.setState({
                        gameEnd: true,
                        opponentWin: true,
                    })
                    //return "CPU WIN";
                }

                if (CheckForEquals(this.state.matrix)) {
                    this.setState({
                        gameEnd: true,
                    })
                    //return "Equals"
                }

            });

        });
    }

    playMoreGames = () => {
        let matrix = this.state.matrix;

        matrix = ResetMatrix(matrix, "0");

        this.setState({
            matrix: matrix,
            playAgain: "yes",
            gameEnd: false,
            resetMultyplayerGame: true,
        })

        setTimeout(() => {
            this.Play("");
        }, 100)
    }

    Play = (position) => {

        const user = getCookie("user");
        const opponent = "Admin1";

        const names = ["Admin1", "Admin"];
        console.log(this.state.playAgain);

        let endGameWinner = "";
        if (this.state.gameEnd) {
            endGameWinner = user;
        }

        this.state.hubConnection.invoke("play", user, this.state.opponent, names[this.state.turn], position, endGameWinner, this.state.playAgain)
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

    setGameMode = () => {
        this.setState({
            multyplayer: !this.state.multyplayer
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

                {this.state.gameEnd ? "End" : null}
                <button className="btn btn-warning ml-sm-5" onClick={this.playMoreGames}>Play again</button>

                <button className="btn btn-primary ml-sm-5" onClick={this.setGameMode}>Change game mode</button>

                <Game
                    resetMultyplayerGame={this.state.resetMultyplayerGame}
                    opponentWin={this.state.opponentWin}
                    opponent={this.state.opponent}
                    multyplayer={this.state.multyplayer}
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