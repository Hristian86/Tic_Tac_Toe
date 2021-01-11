import React from 'react';
import Figures from '../Figures/Figures';
import './Rows.css';

const Rows = ({ index, row, setGameState, gameState, setScore, score, userSymbol, cpuSymbol, Play, positionParametars, multyplayer, gameEnd }) => {
    
    return <div
        className="matrix__row row"
        id={"row" + index}
        key={index}>
        {row.map((col, innerIndex) => {
            return <Figures
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
                key={innerIndex}
                index={index}
                col={col}
                innerIndex={innerIndex}
            />
        })}
    </div>

}

export default Rows;