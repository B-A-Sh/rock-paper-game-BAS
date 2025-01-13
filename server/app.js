import express from 'express'
import cors from "cors"
import http from 'http'
import { Server } from "socket.io";
import { game_RPS,roomUsersReset } from './sockets/Socket-game-RPS.js';


const app = express();
const server = http.createServer(app)
const io = new Server(server,{
    cors:"*"
})

io.on("connection",(socket)=>{
    console.log("user connected", socket.id);

    game_RPS(io,socket)

    socket.on("disconnect",()=>{
        console.log("user disconnected");
        roomUsersReset(socket)
        // if (roomUsers[socket.id]) {
        //     delete roomUsers[socket.id];
        //   }    
    })
    
})


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true }));

server.listen(8080,()=>{
    console.log('server is listening in port 8080');
    
})