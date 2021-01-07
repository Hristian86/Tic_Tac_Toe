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

    //let matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    //matrix[2][0] = 1;

    return <div className="container d-flex justify-content-center bg-light">



        <div className="game__options">

            <div>
                user score: {score?.user}
                <br />
                cpu score: {score?.cpu}
            </div>

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