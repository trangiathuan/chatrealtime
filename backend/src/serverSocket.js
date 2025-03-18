const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Cho phép React client kết nối
        methods: ["GET", "POST"]
    }
});

// Khi một client kết nối đến server
io.on("connection", (socket) => {
    console.log(`🔵 User connected: ${socket.id}`);

    // Nhận tin nhắn từ client
    socket.on("sendMessage", (data) => {
        console.log("📩 Tin nhắn nhận được:", data);
        io.emit("receiveMessage", data); // Gửi tin nhắn đến tất cả client
    });

    // Khi một user rời khỏi
    socket.on("disconnect", () => {
        console.log(`🔴 User disconnected: ${socket.id}`);
    });
});

// Chạy server
server.listen(4000, () => {
    console.log("🚀 Server is running on port 4000");
});