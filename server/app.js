import express from 'express'
import cors from "cors"
import http from 'http'
import { Server } from "socket.io";


const app = express();
const server = http.createServer(app)
const io = new Server(server,{
    cors:"*"
}) 

let playerHand = 0
let enemyHand = 0
let isWaiting = true  
let reloaderIndicator = 0
let gameOver = false
let victory = undefined
let gameUsersAndHands = []

const screenWinner = (playerHand, enemyHand)=>{
    if(playerHand===enemyHand){
        victory = 0
    }else if(playerHand==0 && enemyHand==2){
        victory = 1
    }else if(playerHand==0 && enemyHand==1){
        victory = 2
    }else if(playerHand==1 && enemyHand==0){
        victory = 1
    }else if(playerHand==1 && enemyHand==2){
        victory = 2
    }else if(playerHand==2 && enemyHand==1){
        victory = 1
    }else if(playerHand==2 && enemyHand==0){
        victory = 2
    }
    console.log('victory',victory);
    gameOver = true
}


io.on("connection",(socket)=>{
    console.log("user connected", socket.id);
    socket.on("playerHand",(hand)=>{
        console.log("player hand",hand);
        // socket.broadcast.emit("enemyHand",hand) ----{userId,hand}
        gameUsersAndHands.push(hand)
        if(gameUsersAndHands.length===2){
            console.log('gameUsersAndHands',gameUsersAndHands);
            gameUsersAndHands.forEach((user)=>{
                if(user.userId!==hand.userId){
                    socket.broadcast.emit("enemyHand",user.hand)
                }
            })
            gameUsersAndHands = []
        }
    })

    socket.on("disconnect",()=>{
        console.log("user disconnected");
    })
    
})




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true }));

server.listen(8080,()=>{
    console.log('server is listening in port 8080');
    
})