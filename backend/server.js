const express = require("express");
const http = require("http");
const cors = require("cors");
const { connectDatabase } = require("./src/configs/databaseConfig");
require("dotenv").config();
const socketIo = require("socket.io");
const port = process.env.PORT || 8002;
const routerUser = require("./src/routes/userRotes");
const routerMessage = require('./src/routes/messageRoutes');
const { getMessageService } = require("./src/services/messageServices");
const Message = require("./src/models/message");
const { log } = require("console");
const app = express();

//Tạo HTTP server từ app Express
const server = http.createServer(app);

// Kết nối Socket.IO vào server
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000", // Đặt domain frontend của bạn ở đây
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", routerUser);
app.use("/api/v1", routerMessage);

io.on('connection', (socket) => {
    console.log('A user connected');

    // Lắng nghe sự kiện gửi tin nhắn
    socket.on('sendMessage', async (data) => {
        const { sender, receiver, content } = data;

        const newMessage = new Message({
            sender,
            receiver,
            content,
        });
        await newMessage.save();

        const messages = await getMessageService(sender, receiver);

        console.log("Sending message to receiver:", receiver); // Log để kiểm tra server gửi đúng người

        // Phát sự kiện nhận tin nhắn đến client
        if (sender !== receiver) {
            io.to(receiver).emit('receiveMessage', {
                sender,
                receiver,
                messages,
                newMessage: { sender, receiver, content, timestamp: newMessage.timestamp, status: 'sent' },
            });
            console.log('Message sent to receiver:', receiver); // Log để kiểm tra server phát sự kiện
        }
    });


    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

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
