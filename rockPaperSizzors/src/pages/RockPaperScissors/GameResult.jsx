/* eslint-disable react/prop-types */
import React from 'react'

const GameResult = ({victory,playAgainClickHandler}) => {
    let result
    switch(victory){
        case  0:
            result = (
                <><h1>🤝️It's a tie🤝️</h1>
                <img className='gameResult' src="../src/assets/RPS-game images/score-tie.png" alt="gameResult" />
                <button className='again-button' onClick={playAgainClickHandler}>🔄️play again🔄️</button></>
            )
            break;
            case 1:
                result = (
                <><h1>🎉️You win🎉️</h1>
                <img className='gameResult' src="../src/assets/RPS-game images/wining-images/winner-avatar-4.png" alt="gameResult" />
                <button className='again-button' onClick={playAgainClickHandler}>🔄️play again🔄️</button></>
            )
            break;
            case 2:
                result = (
                <><h1>😢️You lose😢️</h1>
                <img className='gameResult' src="../src/assets/RPS-game images/defeat-images/defeat-4.png" alt="gameResult" />
                <button className='again-button' onClick={playAgainClickHandler}>🔄️play again🔄️</button></>
            )
            break;
        
        }
    return result
    // return victory==0? 
    // (
    //     <>
    // </>

    // )
}

export default GameResult