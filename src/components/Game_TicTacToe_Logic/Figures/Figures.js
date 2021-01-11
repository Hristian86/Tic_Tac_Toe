import React from 'react';
import { useState } from 'react';
import DFS from './DFS';
import FirstLoop from './FirstLoop';
import './Figures.css';
import CheckForEquals from './CheckForEquals';
import X_Symbol from '../../ConstantSymbols/X_Symbol';
import O_Symbol from '../../ConstantSymbols/O_Symbol';

const Figures = ({ col, innerIndex, index, setGameState, gameState, setScore, score, userSymbol, cpuSymbol, Play, positionParametars, multyplayer, gameEnd }) => {

    const [color, setColor] = useState("matrix__col text-dark");
    const [steps, setSteps] = useState(0);

    // Single player logic.
    const CPUTurn = () => {

        // CPU is the matrix for single player.
        let CPU = gameState.matrix;

        // Check all the posible ways for winner (user side).
        let resultStr = FirstLoop(CPU, cpuSymbol, userSymbol, false);


        if (resultStr === "END") {
            return "END";
        } else if (resultStr === "CPU WIN") {
            return "CPU WIN";
        }

        if (CheckForEquals(CPU)) {
            return "Equals"
        }

        let couner = 0;
        while (couner < 60) {
            couner += 1;
            const cpuChoiseRow = Math.random() * (CPU.length * 3);
            const cpuChoiseCol = Math.random() * (CPU.length * 3);

            const row1 = (cpuChoiseRow % (CPU.length - 1)).toFixed(0);
            const col1 = (cpuChoiseCol % (CPU.length - 1)).toFixed(0);

            // Check for free place to put the cpu symbol.
            if (CPU[row1][col1] != userSymbol && CPU[row1][col1] != cpuSymbol) {
                CPU[row1][col1] = cpuSymbol;
                setGameState({
                    matrix: CPU,
                    winner: gameState.winner,
                });
                break;
            }
        }

        // Check all the posible ways for winner(CPU side).
        resultStr = FirstLoop(CPU, cpuSymbol, userSymbol, false);


        if (resultStr === "END") {
            return "END";
        } else if (resultStr === "CPU WIN") {
            return "CPU WIN";
        }
        if (CheckForEquals(CPU)) {
            return "Equals"
        }

        return "Continue"
    }

    // Current user on click positioning.
    const positionOnPush = () => {
        //console.log(index + " " + innerIndex);


        // Here are all the checks for each player symbols.
        let matr = gameState.matrix;
        if (matr[index][innerIndex] == cpuSymbol || matr[index][innerIndex] == userSymbol || gameEnd || (gameState.winner[0]?.length > 0 && !multyplayer)) {

        } else {
            matr[index][innerIndex] = userSymbol;
            setColor("matrix__col text-primary");


            // Here is called perant method for position in the matrix.
            if (multyplayer) {
                Play(`${index}, ${innerIndex}`);
            } else {


                // CPU and user inputs. for single player.
                setGameState({
                    matrix: matr,
                    winner: gameState.winner,
                })

                setTimeout(() => {
                    const res = CPUTurn();

                    const currMatrix = gameState.matrix;
                    // Put in state for winner.
                    if (res == "END") {

                        let scr = score.user;
                        scr += 1;
                        let cpuScore = score.cpu;
                        setScore({
                            user: scr,
                            cpu: cpuScore,
                        });

                        setGameState({
                            matrix: currMatrix,
                            winner: ["User wins."],
                        });

                    } else if (res == "CPU WIN") {

                        let scr = score.user;
                        let cpuScore = score.cpu;
                        cpuScore += 1;
                        setScore({
                            user: scr,
                            cpu: cpuScore,
                        });

                        setGameState({
                            matrix: currMatrix,
                            winner: ["CPU wins."],
                        });
                    } else if (res == "Equals") {

                        setGameState({
                            matrix: currMatrix,
                            winner: ["Equlas."],
                        });
                    }

                    console.log(res);
                }, 300)
            }
        }
    }

    return <div
        onClick={positionOnPush}
        className={color}
        id={"col" + index + innerIndex}
        key={innerIndex}>
        {col == "X"
            ? <X_Symbol />
            : null}

        {col == "Y"
            ? <O_Symbol />
            : null}
    </div>

}

export default Figures;