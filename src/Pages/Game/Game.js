import React, { useState } from 'react';
import Rows from './Rows/Rows';
import './Game.css';
import ResetMatrix from './ResetMatrix/ResetMatrix';
import { useStateValue } from '../../components/ContextApi/StateProvider';
import { useEffect } from 'react';

const startField = "0";
const userSymbol = "X";
const cpuSymbol = "Y";
const winner = [];

const Game = ({ Play, positionParametars, matrix, multyplayer, opponentWin, opponent, resetMultyplayerGame, forceReset, gameResult, gameEnd, userTurn, playMoreGames, setGameMode }) => {
    const [{ fetchData }, dispatch] = useStateValue();
    const [gameState, setGameState] = useState({
        matrix: matrix,
        winner: winner,
    });

    const [score, setScore] = useState({
        user: 0,
        cpu: 0,
    });

    useEffect(() => {
        if (multyplayer) {
            setGameState({
                matrix: matrix,
                winner: [gameResult],
            })
        }

        if (opponentWin) {

            setGameState({
                matrix: matrix,
                winner: ["Winner is " + opponent],
            })
        }

        if (resetMultyplayerGame) {
            setGameState({
                matrix: matrix,
                winner: [""],
            })
        }

        if (forceReset) {
            setGameState({
                matrix: matrix,
                winner: [""],
            })
        }



    }, [opponentWin, resetMultyplayerGame, forceReset, multyplayer])

    const Reset = () => {
        ResetMatrix(matrix, startField);
        console.log(fetchData);
        setGameState({
            matrix: matrix,
            winner: winner,
        })
    }

    return <div className="container d-flex justify-content-center bg-light game__container">



        <div className="game__options text-center">

            <div className="pb-5">

                <div className="">
                    
                    <div className="btn btn-success" onClick={playMoreGames}>Play again</div>
                </div>

                {/*<div className="">
                    <div className="btn btn-primary ml-5" onClick={setGameMode}>Change game mode</div>
                </div>*/}

                {multyplayer ? <div className="opponet__perant">Opponent {opponent}</div> : null}

            </div>

            <div className="game__perant">
                {multyplayer && userTurn?.length > 0 && gameResult?.length == 0 ? <h2 className="winner__holder">{userTurn} Turn</h2> : null}

                {multyplayer
                    ? <h2 className="winner__holder">{gameResult}</h2>
                    : <h2 className="winner__holder">{gameState?.winner[0]}</h2>}

                <div>
                    user score: {score?.user}
                    <br />
                    cpu score: {score?.cpu}
                </div>

                {multyplayer ? null : <div>
                    <button className="btn btn-success" onClick={Reset}>Reset</button>

                </div>}

            </div>

            {gameState?.matrix.map((row, index) => {
                return <Rows
                    gameEnd={gameEnd}
                    multyplayer={multyplayer}
                    positionParametars={positionParametars}
                    Play={Play}
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