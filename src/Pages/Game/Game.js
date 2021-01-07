import React, { useState } from 'react';
import Rows from './Rows/Rows';
import './Game.css';

const Game = () => {
    const [gameState, setGameState] = useState({
        matrix: [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]],
    });

    const [score, setScore] = useState({
        user: 0,
        cpu: 0,
    });

    const Reset = () => {
        const matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        setGameState({
            matrix: matrix,
        })
    }

    return <div className="container d-flex justify-content-center bg-light">



        <div className="game__options">

            <div>
                user score: {score?.user}
                <br />
                cpu score: {score?.cpu}
            </div>

            <button className="btn btn-success" onClick={Reset}>Reset</button>

            {gameState?.matrix.map((row, index) => {
                return <Rows
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