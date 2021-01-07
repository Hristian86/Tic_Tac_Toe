import React from 'react';
import { useState } from 'react';
import DFS from './DFS';
import FirstLoop from './FirstLoop';
import './Figures.css';
import CheckForEquals from './CheckForEquals';

const Figures = ({ col, innerIndex, index, setGameState, gameState, setScore, score }) => {
    const [color, setColor] = useState("matrix__col text-dark");
    const [steps, setSteps] = useState(0);

    const CPUTurn = () => {
        let CPU = gameState.matrix;
        let resultStr = FirstLoop(CPU);
        if (resultStr == "END") {
            return "END";
        } else if (resultStr == "CPU WIN") {
            return "CPU WIN";
        } else if (CheckForEquals(CPU)) {
            return "Equals"
        }


        let couner = 0;
        while (couner < 30) {
            couner += 1;
            const cpuChoiseRow = Math.random() * 10;
            const cpuChoiseCol = Math.random() * 10;

            const row1 = (cpuChoiseRow % 2).toFixed(0);
            const col1 = (cpuChoiseCol % 2).toFixed(0);

            if (CPU[row1][col1] != "X" && CPU[row1][col1] != "Y") {
                CPU[row1][col1] = "Y";
                setGameState({
                    matrix: CPU,
                });
                break;
            }
        }

        resultStr = FirstLoop(CPU);
        if (resultStr == "END") {
            return "END";
        } else if (resultStr == "CPU WIN") {
            return "CPU WIN";
        } else if (resultStr != "Continue") {
            return "Equals"
        } else if (CheckForEquals(CPU)) {
            return "Equals"
        }

        //if (couner == 30) {
        //    return "CPU WIN"
        //}

        return "Continue"
    }

    const positionOnPush = () => {
        console.log(index + " " + innerIndex);

        let matr = gameState.matrix;
        if (matr[index][innerIndex] == "Y" || matr[index][innerIndex] == "X") {

        } else {
            matr[index][innerIndex] = "X";
            setColor("matrix__col text-primary");

            setGameState({
                matrix: matr,
            })

            setTimeout(() => {
                const res = CPUTurn();
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
                        matrix: [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]],
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
                        matrix: [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]],
                    });
                } else if (res == "Equals") {

                    setGameState({
                        matrix: [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]],
                    });
                }
                console.log(res);
            }, 100)
        }
    }

    return <span
        onClick={positionOnPush}
        className={color}
        key={innerIndex}>
        {col + " "}
    </span>

}

export default Figures;