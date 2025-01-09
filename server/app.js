import express from 'express'
import cors from "cors"
import http from 'http'
import { Server } from "socket.io";


const app = express();
const server = http.createServer(app)
const io = new Server(server,{
    cors:"*"
}) 

io.on("connection",(socket)=>{
    console.log("user connected");
    socket.on("playerHand",(hand)=>{
        console.log("player hand",hand);
        socket.broadcast.emit("enemyHand",hand)
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