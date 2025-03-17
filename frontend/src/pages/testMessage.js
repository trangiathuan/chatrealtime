// client/src/App.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Navbar from '../components/navbar';


const socket = io('http://localhost:8888');  // Đảm bảo cổng khớp với backend

const TestMess = () => {
    const [userId, setUserId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [joined, setJoined] = useState(false);  // State to track if user has joined a room

    useEffect(() => {
        // Lắng nghe tin nhắn từ server
        socket.on('receiveMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Cleanup event listener khi component unmounts
        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const joinRoom = () => {
        // Kiểm tra nếu cả userId và roomId đều có giá trị
        if (userId && roomId) {
            socket.emit('joinRoom', { roomId, userId });
            setJoined(true);  // Update state to reflect that the user has joined
        }
    };

    const sendMessage = () => {
        if (message && joined) {
            socket.emit('sendMessage', { roomId, userId, message });
            setMessage(''); // Clear message input
        }
    };

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10 ">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 -mt-28">
                    <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Phòng Chat</h1>

                    {/* Kiểm tra nếu userId hoặc roomId chưa nhập thì yêu cầu nhập */}
                    {!joined ? (
                        <div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Nhập ID của bạn"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Nhập ID phòng"
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button
                                onClick={joinRoom}
                                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
                            >
                                Tham gia phòng
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div
                                id="messages"
                                className="max-h-96 overflow-y-auto bg-gray-50 p-4 rounded-md shadow-inner mb-4"
                            >
                                {messages.map((msg, index) => (
                                    <p key={index} className="mb-2">
                                        <span className="font-semibold text-blue-600">{msg.userId}:</span> {msg.message}
                                    </p>
                                ))}
                            </div>

                            <form onSubmit={(e) => {
                                e.preventDefault(); // Ngăn form tự động submit
                                sendMessage(); // Gọi hàm gửi tin nhắn
                            }}>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Nhập tin nhắn..."
                                        className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
                                    >
                                        Gửi
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default TestMess;
