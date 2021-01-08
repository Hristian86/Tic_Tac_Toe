import React, { useState } from 'react';
import Rows from './Rows/Rows';
import './Game.css';
import ResetMatrix from './ResetMatrix/ResetMatrix';
import OnlineConnectionWithSignalR from '../../components/SignaR/OnlineConnectionWithSignalR';

var matrix = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]];
const startField = "0";
const userSymbol = "X";
const cpuSymbol = "Y";
const winner = [];

const Game = () => {
    const [gameState, setGameState] = useState({
        matrix: matrix,
        winner: winner,
    });

    const [score, setScore] = useState({
        user: 0,
        cpu: 0,
    });

    const Reset = () => {
        ResetMatrix(matrix, startField);

        setGameState({
            matrix: matrix,
            winner: winner,
        })
    }

    return <div className="container d-flex justify-content-center bg-light">

        {/*<OnlineConnectionWithSignalR />*/}

        <div className="game__options">

            <h2 className="winner__holder">{gameState?.winner[0]}</h2>

            <div>
                user score: {score?.user}
                <br />
                cpu score: {score?.cpu}
            </div>


            <button className="btn btn-success" onClick={Reset}>Reset</button>

            {gameState?.matrix.map((row, index) => {
                return <Rows
                    userSymbol={userSymbol}
                    cpuSymbol={cpuSymbol}
                    score={score}
                    setScore={setScore}
                    gameState={gameState}
                    setGameState={setGameState}
                    key={index}
                    index={index}
                    row={row}
                />
            })}

        </div>

    </div>

}

export default Game;