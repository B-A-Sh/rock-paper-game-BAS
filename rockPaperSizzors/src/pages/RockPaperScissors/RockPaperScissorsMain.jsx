/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import './RPS-style.css'
import { socket } from '../../utils/socket'
import OptionPanel from './OptionPanel'
import GameResult from './GameResult'
const RockPaperScissorsMain = ({gameMode}) => {
    
    const enemyHands = ['../src/assets/RPS-game images/hands-images/hand-rock-left.png',
                        '../src/assets/RPS-game images/hands-images/hand-paper-left.png',
                        '../src/assets/RPS-game images/hands-images/hand-scissors-left.png']
    const playerHands = ['../src/assets/RPS-game images/hands-images/hand-rock-right.png',
                        '../src/assets/RPS-game images/hands-images/hand-paper-right.png',
                        '../src/assets/RPS-game images/hands-images/hand-scissors-right.png']
    const [playerHand, setPlayerHand] = useState(0)
    const [enemyHand, setEnemyHand] = useState(0)
    const [isWaiting, setIsWaiting] = useState(true)  
    const [reloaderIndicator, setReloadIndicator] = useState(0) 
    const [gameOver, setGameOver] = useState(false)
    const [victory, setVictory] = useState(0)
    useEffect(() => {
        socket.on('enemyHand', (hand)=>{
            if(gameOver===false){
                setEnemyHand(hand);
                setIsWaiting(false);
                screenWinner(playerHand, enemyHand)
            }
        })
        if(reloaderIndicator >0){
            // console.log('if condition screen wining func invoked');
            screenWinner(playerHand, enemyHand)
        }
        return () => {
            socket.off('enemyHand')
        }
    }, [reloaderIndicator])
    

    // async function screenWinner(playerHand, enemyHand){
    const screenWinner = (playerHand, enemyHand)=>{
        // console.log('screen wining func invoked');
        // console.log('player hand'+playerHand);
        // console.log('enemy hand'+ enemyHand);
        if(playerHand===enemyHand){
            console.log('tie');
            setVictory(3)
        }else if(playerHand==0 && enemyHand==2){
            setVictory(1)
        }else if(playerHand==0 && enemyHand==1){
            setVictory(2)
        }else if(playerHand==1 && enemyHand==0){
            setVictory(1)
        }else if(playerHand==1 && enemyHand==2){
            setVictory(2)
        }else if(playerHand==2 && enemyHand==1){
            setVictory(1)
        }else if(playerHand==2 && enemyHand==0){
            setVictory(2)
        }
        setGameOver(true)
    }
    const clickHandler = (e)=>{
        if(e){
            setPlayerHand(e.target.dataset.hand)
            if(gameMode==='single'){
                // const randomHand = Math.floor(Math.random() * enemyHands.length);
                // setEnemyHand(randomHand);
                setEnemyHand(0);
                // setTimeout(() => {screenWinner(playerHand, enemyHand)},5);
                setReloadIndicator(reloaderIndicator+1)
            }else if(gameMode==='multi'){
                socket.emit('playerHand', e.target.dataset.hand)
                alert("waiting for the other player to choose")
            }
        }
    }
    const playAgainClickHandler = ()=>{
        setPlayerHand(0)
        setEnemyHand(0)
        setGameOver(false)
    }


  
    return (
    <div className='RockPaperScissorsMain'>
        <div className='board-game-PRS'>
            {gameMode==='multi'&& isWaiting? 
            <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
            </svg>:
            <div>
                <img src={enemyHands[enemyHand]} alt="enemyHand" />
            </div>}
            <br />
            <div>
                <img src={playerHands[playerHand]} alt="playerHand" />
            </div>
            <div className="cs-player">
                {gameOver?
                    <GameResult victory={victory} playAgainClickHandler={playAgainClickHandler} />
                :
                    <OptionPanel clickHandler={clickHandler} />}
            </div>
        </div>
    </div>
  )
}

export default RockPaperScissorsMain