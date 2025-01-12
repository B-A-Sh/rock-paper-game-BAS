// Declare an object to keep track of users and their rooms
let roomUsers = {};

// When a user joins a room
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

// Example usage
let socket1 = { id: "user123" };
joinRoom(socket1, "room1"); // Adds 'room1' to 'user123'
console.log(roomUsers); // Output: { user123: ['room1'] }

let socket2 = { id: "user456" };
joinRoom(socket2, "room2"); // Adds 'room2' to 'user456'
console.log(roomUsers); // Output: { user123: ['room1'], user456: ['room2'] }


// -----------------
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  
    // Listen for the disconnect event
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
      
      // Perform any necessary cleanup or update roomUsers
      if (roomUsers[socket.id]) {
        delete roomUsers[socket.id];
      }
    });
  });
  