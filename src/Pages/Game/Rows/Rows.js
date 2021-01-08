import React from 'react';
import Figures from '../Figures/Figures';
import './Rows.css';

const Rows = ({ index, row, setGameState, gameState, setScore, score, userSymbol, cpuSymbol}) => {
    
    return <p
        className="matrix__row"
        key={index}>
        {row.map((col, innerIndex) => {
            return <Figures
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
    </p>

}

export default Rows;