const express = require("express");
const http = require("http");
const cors = require("cors");
const { connectDatabase } = require("./configs/databaseConfig");
require("dotenv").config();
const socketIo = require("socket.io");
const port = process.env.PORT || 8002;
const routerUser = require("./routes/userRotes");
const routerMessage = require('./routes/messageRoutes');
const { getMessageService, sendMessageService } = require("./services/messageServices");
const Message = require("./models/message");
const { log } = require("console");
const app = express();

//Tạo HTTP server từ app Express
const server = http.createServer(app);

// Kết nối Socket.IO vào server
const io = socketIo(server, {
    cors: {
        origin: "*",  // Đặt domain frontend của bạn ở đây
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", routerUser);
app.use("/api/v1", routerMessage);

io.on("connection", (socket) => {
    console.log("User connection soket id: ", socket.id);

    socket.on("sendMessage", (message) => {
        const { sender, receiver, content } = message

        const newMessage = new Message({
            sender,
            receiver,
            content
        })
        console.log(newMessage);

        sendMessageService(newMessage);

        io.emit("receiveMessage", message)
    })
    socket.on("disconnect", () => {
        console.log(`🔴 User disconnected: ${socket.id}`);
    });

})

// Kết nối database và chạy server
const conn = async () => {
    try {
        const result = await connectDatabase();
        console.log(result);
        server.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    } catch (error) {
        console.log("Error connecting to DB", error);
    }
};
conn();
