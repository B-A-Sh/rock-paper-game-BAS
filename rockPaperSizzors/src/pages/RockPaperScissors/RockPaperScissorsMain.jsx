/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import './RPS-style.css'
import { socket } from '../../utils/socket'
import OptionPanel from './OptionPanel'
//mocking staff until merging
import chat from '../../assets/Mockedchat.js'
// import { Context } from "../../ChatHomePage";


// const RockPaperScissorsMain = ({gameMode,chat}) => {
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
            // socket.emit('joinRoom', {roomId, userId: currentUserId})            
            socket.on('enemyHand', (hand)=>{
                console.log('enemyHand',hand);
                
                if(!gameOver){
                    setEnemyHand(hand);
                    setIsWaiting(false);
                    // setGameOver(true)
                }
            })
            socket.on('gameResult', (victory)=>{
                setVictory(victory)
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
                    <OptionPanel clickHandler={disableButtons? null: clickHandler} />}
            </div>
        </div>
    </div>
  )
}

export default RockPaperScissorsMain