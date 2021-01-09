import React from 'react';
import { useState } from 'react';
import DFS from './DFS';
import FirstLoop from './FirstLoop';
import './Figures.css';
import CheckForEquals from './CheckForEquals';

const Figures = ({ col, innerIndex, index, setGameState, gameState, setScore, score, userSymbol, cpuSymbol, Play, positionParametars, multyplayer }) => {


    const [color, setColor] = useState("matrix__col text-dark");
    const [steps, setSteps] = useState(0);

    const CPUTurn = () => {

        const isSymbolAdded = [false];
        let CPU = gameState.matrix;
        let resultStr = FirstLoop(CPU, cpuSymbol, userSymbol, isSymbolAdded);


        if (resultStr == "END") {
            return "END";
        } else if (resultStr == "CPU WIN") {
            return "CPU WIN";
        }

        if (CheckForEquals(CPU)) {
            return "Equals"
        }

        if (multyplayer) {

            //var position = positionParametars.split(", ");
            //CPU[position[0]][position[1]] = cpuSymbol;

        } else {

            let couner = 0;
            while (couner < 30) {
                couner += 1;
                const cpuChoiseRow = Math.random() * 10;
                const cpuChoiseCol = Math.random() * 10;

                const row1 = (cpuChoiseRow % 2).toFixed(0);
                const col1 = (cpuChoiseCol % 2).toFixed(0);

                if (CPU[row1][col1] != userSymbol && CPU[row1][col1] != cpuSymbol) {
                    CPU[row1][col1] = cpuSymbol;
                    setGameState({
                        matrix: CPU,
                        winner: gameState.winner,
                    });
                    break;
                }
            }
        }

        resultStr = FirstLoop(CPU, cpuSymbol, userSymbol, isSymbolAdded);


        if (resultStr == "END") {
            return "END";
        } else if (resultStr == "CPU WIN") {
            return "CPU WIN";
        }
        if (CheckForEquals(CPU)) {
            return "Equals"
        }

        return "Continue"
    }

    const positionOnPush = () => {
        //console.log(index + " " + innerIndex);

        

        let matr = gameState.matrix;
        if (matr[index][innerIndex] == cpuSymbol || matr[index][innerIndex] == userSymbol || gameState?.winner[0]?.length > 0) {

        } else {
            matr[index][innerIndex] = userSymbol;
            setColor("matrix__col text-primary");



            if (multyplayer) {
                Play(`${index}, ${innerIndex}`);
            }

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

    return <span
        onClick={positionOnPush}
        className={color}
        key={innerIndex}>
        {col + " "}
    </span>

}

export default Figures;