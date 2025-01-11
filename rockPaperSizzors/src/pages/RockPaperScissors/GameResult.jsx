/* eslint-disable react/prop-types */
import React from 'react'

const GameResult = ({ victoryState, playAgainClickHandler }) => {
    let result
    console.log('victoryState', victoryState);
    console.log(`from the game result this is the victoryState ${victoryState}`);
    
    
    switch (victoryState) {
        case 0:
            result = (
                <>
                    <h1>🤝️It's a tie🤝️</h1>
                    <img className='gameResult' src="../src/assets/RPS-game images/score-tie.png" alt="gameResult" />
                    <button className='again-button' onClick={playAgainClickHandler}>🔄️play again🔄️</button>
                </>
            )
            break;
        case 1:
            result = (
                <>
                    <h1>🎉️You win🎉️</h1>
                    <img className='gameResult' src="../src/assets/RPS-game images/wining-images/winner-avatar-4.png" alt="gameResult" />
                    <button className='again-button' onClick={playAgainClickHandler}>🔄️play again🔄️</button>
                </>
            )
            break;
        case 2:
            result = (
                <>
                    <h1>😞️You lose😞️</h1>
                    <img className='gameResult' src="../src/assets/RPS-game images/losing-images/loser-avatar-4.png" alt="gameResult" />
                    <button className='again-button' onClick={playAgainClickHandler}>🔄️play again🔄️</button>
                </>
            )
            break;
        default:
            result = null;
    }

    return (
        <div>
            {result}
        </div>
    )
}

export default GameResult;