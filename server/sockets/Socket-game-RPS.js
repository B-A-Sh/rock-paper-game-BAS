
let playerHand = 0
let enemyHand = 0
let victory = undefined
let gameUsersAndHands = []
let activeRooms = {}
let roomUsers = {}


export function roomUsersReset(socket) {
    if (roomUsers[socket.id]) {
        delete roomUsers[socket.id];
    }
}
function joinRoom(socket, room) {
    if (roomUsers[socket.id]) {
      if (!roomUsers[socket.id].includes(room)) {
        roomUsers[socket.id].push(room);
      } else {
        console.log("User is already in room");
      }
    } else {
      roomUsers[socket.id] = [room];
    }
  }
//----------------  

const winningCalculationRPS = (playerOneHand, playerTwoHand)=>{
    if(playerOneHand.hand===playerTwoHand.hand){
        victory = 0
    }else if(playerOneHand.hand==0 && playerTwoHand.hand==2){
        victory = playerOneHand.userId
    }else if(playerOneHand.hand==0 && playerTwoHand.hand==1){
        victory = playerTwoHand.userId
    }else if(playerOneHand.hand==1 && playerTwoHand.hand==0){
        victory = playerOneHand.userId
    }else if(playerOneHand.hand==1 && playerTwoHand.hand==2){
        victory = playerTwoHand.userId
    }else if(playerOneHand.hand==2 && playerTwoHand.hand==1){
        victory = playerOneHand.userId
    }else if(playerOneHand.hand==2 && playerTwoHand.hand==0){
        victory = playerTwoHand.userId
    }
    console.log('victory is',victory);
}

export const game_RPS = (io,socket) =>{
    console.log('roomUsers',roomUsers);
    
    socket.on('join-room',(room)=>{
        socket.join(room)
        console.log(`socket-- ${socket.id} added to RPS game room name -- ${room}`);
        activeRooms[room] = activeRooms[room] ? activeRooms[room]+1 : 1
        if(activeRooms[room]>2){
            socket.leave(room)
            activeRooms[room] = 2
        }
        joinRoom(socket, room)
        // roomUsers[socket.id]? roomUsers[socket.id].push(room) : console.log("user is already in room");        
        // roomUsers[socket.id] = room

        console.log("roomUsers",roomUsers);        
        
    })


    socket.on("playerHand",(hand)=>{
        console.log("player hand",hand);
        // socket.broadcast.emit("enemyHand",hand) ----{userId,hand}
        gameUsersAndHands.push(hand)
        if(gameUsersAndHands.length===2){
            console.log("enter to the two hands if");
            
            // io.in(roomUsers[socket.id][0]).emit("handsState", gameUsersAndHands)
            // io.in('1').emit("handsState", gameUsersAndHands)
            
            io.emit("handsState", gameUsersAndHands)
            winningCalculationRPS(hand,gameUsersAndHands[0])
            io.emit("gameResult", victory)  
            gameUsersAndHands = []
        }
    })
}

//  if(gameUsersAndHands.length===2){
//             console.log('gameUsersAndHands',gameUsersAndHands);
//             gameUsersAndHands.forEach((user)=>{
//                 console.log('user',user);
                
//                 if(user.userId!==hand.userId){
//                     console.log('send to my self');
                    
//                     // socket.to(socket.id).emit("enemyHand",hand.hand)
//                     socket.emit("enemyHand",user.hand)
//                     // socket.to(room).emit("gameResult",victory)
//                     // io.in(roomUsers[socket.id][0]).emit("gameResult", victory)
//                 }else{
//                     console.log('send to the opponent');
//                     // socket.to(`${roomUsers[socket.id][1]}`).emit("enemyHand",user.hand)
                    
//                     socket.to("1").emit("enemyHand",user.hand)
//                 }
//             })
//             // winningCalculationRPS(hand,gameUsersAndHands[0])
//             gameUsersAndHands = []
//         }

