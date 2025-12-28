import { Server } from "socket.io";

let connections = {};
let message = {};
let timeOnline = {};

const connectToServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin:["http://localhost:3000","https://videocallfrontend-p929.onrender.com"]
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("SOMETHING CONNECTED");
    socket.on("join-call", (path) => {
      if (connections[path] === undefined) {
        connections[path] = [];
      }
      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();

      // connections[path].forEach((elm, idx) => {
      //   io.to(elm);
      // });

      for (let i = 0; i < connections[path].length; i++) {
        io.to(connections[path][i]).emit(
          "user-joined",
          socket.id,
          connections[path]
        );
      }

      if (message[path] !== undefined) {
        for (let i = 0; i < message[path].length; ++i) {
          io.to(socket.id).emit(
            "chat-message",
            message[path][i]["data"],
            message[path][i]["sender"],
            message[path][i]["socket-id-sender"]
          );
        }
      }
    });
    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });
    socket.on("chat-message", (data, sender) => {
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([room, isFound], [roomKey, roomValue]) => {
          if (!isFound && roomValue.includes(socket.id)) {
            return [roomKey, true];
          }
          return [roomKey, isFound];
        },
        ["", false]
      );
      if (found == true) {
        if (message[matchingRoom] === undefined) {
          message[matchingRoom] = [];
        }
        message[matchingRoom].push({
          sender: sender,
          data: data,
          "socket-id-sender": socket.id,
        });
        console.log("message", matchingRoom, ":", sender, data);
        connections[matchingRoom].forEach((elem) => {
          io.to(elem).emit("chat-message", data, sender, socket.id);
        });
      }
    });
    socket.on("disconnect", () => {
      let diffTime = Math.abs(timeOnline[socket.id] - new Date());
      var key;
      for (const [k, v] of JSON.parse(
        JSON.stringify(Object.entries(connections))
      )) {
        for (let a = 0; a < v.length; ++a) {
          if (v[a] === socket.id) {
            key = k;
            for (let b = 0; b < connections[key].length; ++b) {
              io.to(connections[key][b]).emit("user-left", socket.id);
            }
            let index = connections[key].indexOf(socket.id);
            connections[key].splice(index, 1);
            if (connections[key].length === 0) {
              delete connections[key];
            }
          }
        }
      }
    });
  });
  return io;
};

export default connectToServer;
