import React, { Component } from 'react';
import * as signalR from '@aspnet/signalr';
import url from '../BaseUrl/BaseUrl';
import getCookie from '../Cookies/GetCookie';
import StateStore from './StateStore';
import GameMode from './GameMode';
import { _cpuSymbol, _userSymbol, _startSymbol, _accept, _decline } from '../ConstantSymbols/ConstantSymbols';
import ResetMatrix from '../Game_TicTacToe_Logic/ResetMatrix/ResetMatrix';
import CheckForEquals from '../Game_TicTacToe_Logic/Figures/CheckForEquals';
import FirstLoop from '../Game_TicTacToe_Logic/Figures/FirstLoop';
import Game from '../Game_TicTacToe_Logic/Game';

const isSymbolAdded = null;
const cpuSymbol = _cpuSymbol;
const userSymbol = _userSymbol;
const startSymbol = _startSymbol;

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
            matrix: [[startSymbol, startSymbol, startSymbol],
            [startSymbol, startSymbol, startSymbol],
            [startSymbol, startSymbol, startSymbol]],
            multyplayer: false,
            gameEnd: false,
            opponentWin: false,
            playAgain: "no",
            resetMultyplayerGame: false,
            forceReset: false,
            gameResult: "",
            userTurn: "",
            userTurnCount: 0,
            gameModeChoise: false,
            currentGameWinner: "",
            challangeChoise: false,
            invatePlayer: false,
            userWins: 0,
            opponentWins: 0,
        }
    }

    componentDidMount = () => {
        const user = getCookie('user');
        this.setState({
            currentUser: user,
        })

        if (user == this.state.userTurn) {
            this.setState({
                gameEnd: false,
            })
        } else {
            if (this.state.userTurnCount > 0) {
                let count = 1 + this.state.userTurnCount;
                this.setState({
                    gameEnd: true,
                    userTurnCount: count,
                })
            } else {

                let count = 1 + this.state.userTurnCount;
                this.setState({
                    userTurnCount: count,
                })
            }
        }

        let hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(url("message"))
            .build();

        this.setState({ hubConnection }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on("send", (name, message, oppnentName, userTurn, cordinates) => {

                // Messages in the chat.
                let data = this.state.recevedMessage;
                //console.log(data);
                data.push(name + " " + message);
                this.setState({
                    recevedMessage: data,
                });

            });

            // To do make random user turn whe the game start for first time.
            this.state.hubConnection.on("turn", (turn) => {

            });

            // Ask to play again.
            this.state.hubConnection.on("playAgain", (player1, player2, p1Accept, p2Accept) => {
                this.playAgainResultUpdate(player1, player2, p1Accept, p2Accept);

            });

            // Invite.
            this.state.hubConnection.on("Invite", (player1, player2, p1Accept, p2Accept, options) => {

                if (user === player2 && p1Accept === _accept && !this.state.invitePlayer && options === "invited") {
                    this.setState({
                        invitePlayer: false,
                    })
                }

                if (user === player2 && p1Accept === _accept && !this.state.invitePlayer && options === "invite" && p2Accept.length === 0) {

                    const answer = window.confirm(`New challenge from ${player1}`);
                    if (answer) {
                        //some code

                        this.gameModeHandler(true, player1);
                        this.setState({
                            invitePlayer: true,
                        })

                        this.state.hubConnection.invoke("invite", user, this.state.opponent, p1Accept, _accept, "invited")
                            .catch(err => console.log(err));
                    }
                    else {
                        //some code
                        this.setState({
                            invitePlayer: false,
                        })

                        this.state.hubConnection.invoke("invite", user, this.state.opponent, p1Accept, _decline, "decline")
                            .catch(err => console.log(err));
                    }
                }

            });

            this.state.hubConnection.on("play", (name, oppnentName, userTurn, cordinates, endGameWinner, playAgain) => {
                //console.log(playAgain);
                console.log(endGameWinner);
                //console.log("User turn => " + userTurn);
                if (user == userTurn) {
                    this.setState({
                        gameEnd: false,
                    })
                } else {
                    this.setState({
                        gameEnd: true,
                    })
                }

                this.setState({
                    userTurn: userTurn,
                })

                //console.log("User turn is " + userTurn);
                // Here is play again.
                if (playAgain === "yes") {
                    this.playAgainResetState();
                }

                // if opponent name equal current name.
                if (oppnentName == this.state.currentUser && !this.state.gameEnd && this.state.multyplayer) {

                    this.setState({
                        positionParametars: cordinates,
                    })


                    // Fixing this thing for impruvments.
                    if (name.length > 1 && cordinates.length > 2) {
                        const position = cordinates.split(", ");
                        const matrix = this.state.matrix;
                        matrix[position[0]][position[1]] = cpuSymbol;
                        this.setState({
                            matrix: matrix,
                        })
                    }

                    console.log("Opponent winner" + endGameWinner);

                    //console.log("Play again " + playAgain);
                }

                this.checkLogicForEndGameResult();

            });

        });
    }

    playAgainResultUpdate(player1, player2, p1Accept, p2Accept) {
        const user = getCookie('user');

        //console.log(player1);
        //console.log(player2);
        //console.log(p1Accept);
        //console.log(p2Accept);

        if (player2 === this.state.opponent && p2Accept === _decline) {
            document.getElementById("playAgain").style.display = "inline-block";
            document.getElementById("waiting").innerHTML = "Declined.";
        }

        if ((player1 === user || (player2 === user) && (player1 === this.state.opponent || player2 === this.state.opponent))
            && p1Accept === _accept && p2Accept === _accept) {


            this.playMoreGames();

            setTimeout(() => {

                document.getElementById("playAgain").style.display = "inline-block";
                document.getElementById("waiting").innerHTML = "Accepted.";

            }, 100)
        } else {

            if ((user === player2 && user !== player1) && !this.state.challangeChoise && p2Accept !== _accept) {

                const answer = window.confirm(`New challenge from ${player1}`);
                if (answer) {
                    //some code
                    this.state.hubConnection.invoke("playAgain", player1, player2, p1Accept, _accept)
                        .catch(err => console.log(err));

                    this.setState({
                        challangeChoise: true,
                    })
                }
                else {
                    //some code
                    this.state.hubConnection.invoke("playAgain", player1, player2, p1Accept, _decline)
                        .catch(err => console.log(err));
                    this.setState({
                        challangeChoise: true,

                    })

                    document.getElementById("playAgain").style.display = "inline-block";
                    document.getElementById("waiting").innerHTML = "Declined.";

                }
            }

            //else if ((user === player1 && user !== player2) && !this.state.challangeChoise && p2Accept !== _accept) {
            //    debugger
            //    const answer = window.confirm(`New challenge from ${player2 }`);
            //    if (answer) {
            //        //some code
            //        this.state.hubConnection.invoke("playAgain", player1, player2, p1Accept, _accept)
            //            .catch(err => console.log(err));

            //        this.setState({
            //            challangeChoise: true,
            //        })
            //    }
            //    else {
            //        //some code

            //        this.setState({
            //            challangeChoise: true,
            //        })
            //    }
            //}
        }
    }

    checkLogicForEndGameResult = () => {
        const user = getCookie('user');
        let resultStr = FirstLoop(this.state.matrix, cpuSymbol, userSymbol, isSymbolAdded);
        //console.log("Result from mulyuplayer " + resultStr);
        
        if (resultStr == "END") {
            let userWin = this.state.userWins;
            userWin += 1;
            this.setState({
                gameEnd: true,
                gameResult: "Winner is " + user,
                currentGameWinner: user,
                userWins: userWin,
            })
            //return "END";
        } else if (resultStr == "CPU WIN") {
            let oppWin = this.state.opponentWins;
            oppWin += 1;
            this.setState({
                gameEnd: true,
                opponentWin: true,
                gameResult: "Winner is " + this.state.opponent,
                currentGameWinner: this.state.opponent,
                opponentWins: oppWin,
            })
            //return "CPU WIN";
        }

        if (CheckForEquals(this.state.matrix)) {
            this.setState({
                gameEnd: true,
                gameResult: resultStr,
            })
            //return "Equals"
        }
    }

    playAgainResetState = () => {

        let matrix = this.state.matrix;

        // Reset matrixx to origan state.
        matrix = ResetMatrix(matrix, startSymbol);

        this.setState({
            matrix: matrix,
            playAgain: "no",
            gameEnd: false,
            resetMultyplayerGame: true,
            opponentWin: false,
            gameResult: "",
            currentGameWinner: "",
        })
    }

    playMoreGames = () => {
        let matrix = this.state.matrix;

        matrix = ResetMatrix(matrix, startSymbol);

        this.setState({
            matrix: matrix,
            playAgain: "yes",
            gameEnd: false,
            resetMultyplayerGame: true,
            forceReset: true,
            currentGameWinner: "",
            challangeChoise: false,
        })

        setTimeout(() => {
            this.Play("");
            this.setState({
                playAgain: "no",
                opponentWin: false,
                forceReset: false,
                gameResult: "",
                currentGameWinner: "",
                challangeChoise: false,
            })
        }, 200)
    }

    Play = (position) => {
        const user = getCookie("user");

        //console.log("User turn => " + this.state.userTurn);

        if (user == this.state.userTurn) {
            this.setState({
                gameEnd: false,
            })
        } else {
            this.setState({
                gameEnd: true,
            })
        }

        //this.checkLogicForEndGameResult();

        this.state.hubConnection.invoke("play", user, this.state.opponent, this.state.opponent, position, this.state.currentGameWinner, this.state.playAgain)
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

    playAgainHub = () => {

        document.getElementById("playAgain").style.display = "none";
        document.getElementById("waiting").innerHTML = "Waiting for responce";

        const user = getCookie('user');
        this.state.hubConnection.invoke("playAgain", user, this.state.opponent, "yes", "")
            .catch(err => console.log(err));

    }

    inviteToPlay = () => {
        setTimeout(() => {

            const user = getCookie('user');
            this.state.hubConnection.invoke("invite", user, this.state.opponent, "yes", "", "invite")
                .catch(err => console.log(err));
        }, 100);
    }

    // Chat messages
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

    // To Do.
    AskForSession = (player2) => {

    }

    gameModeHandler = (option, selectedUser) => {
        console.log(selectedUser);
        if (option == true) {
            this.AskForSession(selectedUser);

            this.setState({
                multyplayer: true,
                gameModeChoise: true,
                opponent: selectedUser,
            })

            setTimeout(() => {
                this.inviteToPlay();
            }, 200);

        } else {
            this.setState({
                multyplayer: false,
                gameModeChoise: true,
            })
        }
    }

    render() {

        return (
            <div className="container-fluid">

                {/*<form>
                    <input
                        value={this.state.opponent} onChange={this.opponentHandler} />

                    <button type="sybmit">Add Player</button>

                </form>

                <button onClick={() => this.Play("asd")}>Play</button>*/}

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

                {/*{this.state.gameEnd ? "End" : null}
                <button className="btn btn-warning ml-sm-5" onClick={this.playMoreGames}>Play again</button>

                <button className="btn btn-primary ml-sm-5" onClick={this.setGameMode}>Change game mode</button>*/}

                {this.state?.gameModeChoise ? <Game
                    opponentWins={this.state.opponentWins}
                    userWins={this.state.userWins}
                    playAgainHub={this.playAgainHub}
                    setGameMode={this.setGameMode}
                    playMoreGames={this.playMoreGames}
                    userTurn={this.state.userTurn}
                    gameResult={this.state.gameResult}
                    forceReset={this.state.forceReset}
                    gameEnd={this.state.gameEnd}
                    resetMultyplayerGame={this.state.resetMultyplayerGame}
                    opponentWin={this.state.opponentWin}
                    opponent={this.state.opponent}
                    multyplayer={this.state.multyplayer}
                    matrix={this.state.matrix}
                    positionParametars={this.state.positionParametars}
                    Play={this.Play}
                />
                    : <GameMode
                        playAgainHub={this.playAgainHub}
                        gameModeHandler={this.gameModeHandler}
                    />}

                {this.props.children}
                <div></div>
            </div>
        )
    }
}