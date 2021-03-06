import React, { useState } from 'react';
import Rows from './Rows/Rows';
import './Game.css';
import ResetMatrix from './ResetMatrix/ResetMatrix';
import { useStateValue } from '../../components/ContextApi/StateProvider';
import { useEffect } from 'react';
import getCookie from '../../components/Cookies/GetCookie';
import PopUpComponent from '../PopUp/PopUpComponent';

const startField = "0";
const userSymbol = "X";
const cpuSymbol = "Y";
const winner = [];

const Game = ({ Play, positionParametars, matrix, multyplayer, opponentWin, opponent, resetMultyplayerGame, forceReset, gameResult, gameEnd, userTurn, playMoreGames, setGameMode, playAgainHub, userWins, opponentWins }) => {
    const user = getCookie('user');
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
        //if (multyplayer) {
        //    setGameState({
        //        matrix: matrix,
        //        winner: [gameResult],
        //    })
        //}

        //if (opponentWin) {

        //    setGameState({
        //        matrix: matrix,
        //        winner: ["Winner is " + opponent],
        //    })
        //}

        //if (resetMultyplayerGame) {
        //    setGameState({
        //        matrix: matrix,
        //        winner: [""],
        //    })
        //}        //if (multyplayer) {
        //    setGameState({
        //        matrix: matrix,
        //        winner: [gameResult],
        //    })
        //}

        //if (opponentWin) {

        //    setGameState({
        //        matrix: matrix,
        //        winner: ["Winner is " + opponent],
        //    })
        //}

        //if (resetMultyplayerGame) {
        //    setGameState({
        //        matrix: matrix,
        //        winner: [""],
        //    })
        //}

        if (forceReset) {
            setGameState({
                matrix: matrix,
                winner: [""],
            })
        }

    }, [forceReset])

    // Reset single player game.
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

                    <PopUpComponent />


                    {multyplayer ?
                        <div id="playAgain" className="btn btn-success" onClick={playAgainHub}>Play again</div>
                        : null}
                </div>

                {/*<div className="">
                    <div className="btn btn-primary ml-5" onClick={setGameMode}>Change game mode</div>
                </div>*/}

                {multyplayer ? <div className="opponet__perant">Opponent {opponent}</div> : null}

            </div>

            <div className="game__perant">
                {multyplayer && userTurn?.length > 0 && gameResult?.length == 0 ? userTurn === user
                    ? <h2 className="winner__holder">Your turn</h2>
                    : <h2 className="winner__holder">Opponent turn</h2>
                    : null}

                {multyplayer
                    ? <h2 className="winner__holder">{gameResult}</h2>
                    : <h2 className="winner__holder">{gameState?.winner[0]}</h2>}

                {multyplayer ?
                    <div>
                        user score: {userWins}
                        <br />
                        opponent score: {opponentWins}
                    </div>
                    : <div>
                        user score: {score?.user}
                        <br />
                        cpu score: {score?.cpu}
                    </div>}

                {multyplayer ? null : <div>
                    <button className="btn btn-success" onClick={Reset}>Reset</button>

                </div>}

            </div>

            <div className="matrix__win" id="matrix__win">
                <div className="matrix__perant">

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

        </div>

    </div>

}

export default Game;