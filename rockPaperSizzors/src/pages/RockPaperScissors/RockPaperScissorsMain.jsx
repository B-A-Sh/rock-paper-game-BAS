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
    // const [gameOver, setGameOver] = useState(false)
    const [gameOver, setGameOver] = useState()
    const [victory, setVictory] = useState()
    useEffect(() => {
        if(gameMode==='multi'){
            
            socket.on('enemyHand', (hand)=>{
                // alert("the other player has chosen")
                console.log('in the socket before the if statement, gameover',gameOver)
                if(!gameOver){
                    console.log('inside the enemyHand event listener',gameOver)
                    setEnemyHand(hand);
                    setIsWaiting(false);
                    screenWinner(playerHand, enemyHand)
                    setGameOver(true)
                }
            })
        }

        if(reloaderIndicator >0 && gameOver){
            // console.log('if condition screen wining func invoked');
            screenWinner(playerHand, enemyHand)
        }
        return () => {
            socket.off('enemyHand')
        }
    }, [reloaderIndicator])
    

    // async function screenWinner(playerHand, enemyHand){
    const screenWinner = (playerHand, enemyHand)=>{

        if(playerHand===enemyHand){
            console.log('tie');
            // setVictory(0)
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
        console.log(`from the main screen this is the victory ${victory}`);
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
        if(gameMode==='multi'){
            setIsWaiting(true)
        }else{
            setEnemyHand(0)
        }
        setGameOver(false)
    }
  
    return (
    <div className='RockPaperScissorsMain'>
        <div className='board-game-PRS'>
            {gameMode==='multi'&& isWaiting? 
            <div>
                <h1>Waiting for the other player to choose</h1>
            </div>:
            <div>
                <img src={enemyHands[enemyHand]} alt="enemyHand" />
            </div>}
            <br />
            <div>
                <img src={playerHands[playerHand]} alt="playerHand" />
            </div>
            <div className="cs-player">
                {gameOver?
                    <GameResult victoryState={victory} playAgainClickHandler={playAgainClickHandler} />
                :
                    <OptionPanel clickHandler={clickHandler} />}
            </div>
        </div>
    </div>
  )
}

export default RockPaperScissorsMain