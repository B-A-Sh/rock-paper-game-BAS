/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import './RPS-style.css'
import { socket } from '../../utils/socket'
import OptionPanel from './OptionPanel'
//mocking staff until merging
import chat from '../../assets/Mockedchat.js'
import GameResult from './gameResult.jsx'
// import { Context } from "../../ChatHomePage";


// const RockPaperScissorsMain = ({gameMode,chat}) => {
const RockPaperScissorsMain = ({gameMode}) => {
    
    const enemyHands = ['../src/assets/RPS-game images/hands-images/hand-rock-left.png',
                        '../src/assets/RPS-game images/hands-images/hand-paper-left.png',
                        '../src/assets/RPS-game images/hands-images/hand-scissors-left.png',
                        '../src/assets/RPS-game images/question-sign.png']
    const playerHands = ['../src/assets/RPS-game images/hands-images/hand-rock-right.png',
                        '../src/assets/RPS-game images/hands-images/hand-paper-right.png',
                        '../src/assets/RPS-game images/hands-images/hand-scissors-right.png',
                        '../src/assets/RPS-game images/question-sign.png'] 
    const [playerHand, setPlayerHand] = useState(3)
    const [enemyHand, setEnemyHand] = useState(3)
    const [isWaiting, setIsWaiting] = useState(true)  
    const [reloaderIndicator, setReloadIndicator] = useState(0) 
    const [disableButtons, setDisableButtons] = useState(false)
    const [gameOver, setGameOver] = useState()
    const [victory, setVictory] = useState()
    //------- take care in merging stage
    const roomId = chat.chatId
    const [currentUserId, setCurrentUserId] = useState(Date.now())  
    // const currentUserObject = useContext(Context);
    // const [currentUserId, setCurrentUserId] = useState(currentUserObject.id)  

    useEffect(() => {
        if(gameMode==='multi'){
            socket.emit('join-room',roomId)
            socket.on('enemyHand', (hand)=>{
                console.log('enemyHand',hand);
                
                if(!gameOver){
                    setEnemyHand(hand);
                    setIsWaiting(false);
                    // setGameOver(true)
                }
            })
            socket.on("handsState", (hands)=>{
                hands.forEach((user)=>{
                    if(user.userId!==currentUserId){
                        setEnemyHand(user.hand)
                        setIsWaiting(false)
                    }
                })
            })
            socket.on('gameResult', (victory)=>{
                if(victory===currentUserId){
                    setVictory(1)
                }else if(victory<1){
                    setVictory(0)
                }else if(victory!==currentUserId){
                    setVictory(2)
                }
                console.log('victory',victory);
                
                setGameOver(true)
            })
        }

        return () => {
            // socket.off('enemyHand')
        }
    }, [socket,reloaderIndicator])
    

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
                socket.emit('playerHand', {userId: currentUserId, hand: e.target.dataset.hand})
                setDisableButtons(true)
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
        setDisableButtons(false)
    }
  
    return (
    <div className='RockPaperScissorsMain'>
        <div className='board-game-PRS'>
            {gameMode==='multi'&& isWaiting? 
            <div>
                <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
                {/* <h1>Waiting for the other player to choose</h1> */}
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
                    <OptionPanel clickHandler={disableButtons? null: clickHandler} />}
            </div>
        </div>
    </div>
  )
}

export default RockPaperScissorsMain