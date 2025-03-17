import { useEffect, useState, useRef } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import ENDPOIN_API from "../configs/configAPI";
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Sử dụng jwtDecode thay vì jwt_decode
import io from "socket.io-client";  // Import socket.io-client

const Message = () => {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState([]);
    const [message, setMessage] = useState("");  // State để lưu giá trị của ô input
    const { id } = useParams();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        getListUser();
        getUser();
    }, [userId, id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        getMessages();
    }, [messages]);

    const getMessages = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentUserId = decodedToken._id;
            setUserId(currentUserId);

            const res = await axios.get(`${ENDPOIN_API}/message/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.EC === 0) {
                setMessages(res.data.data);
            }
        }
    };

    const sendMessage = async (content) => {
        const token = localStorage.getItem("token");
        if (token && content.trim()) {
            const decodedToken = jwtDecode(token);
            const sender = decodedToken._id;
            const receiver = id;

            const newMessage = {
                sender,
                receiver,
                content,
            };

            await axios.post(
                `${ENDPOIN_API}/sendMessage`,
                newMessage,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        }
    };

    const getListUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const res = await axios.get(`${ENDPOIN_API}/getListUser`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (res.data.EC === 0) {
                setUsers(res.data.data);
            }
        }
    };

    const getUser = async () => {
        const res = await axios.get(`${ENDPOIN_API}/getUserMessage/${id}`);
        if (res.data.EC === 0) {
            setUser(res.data.data.fullName);
        }
    };

    const handleSendMessage = () => {
        sendMessage(message);
        setMessage(""); // Reset ô input sau khi gửi tin nhắn
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />

            <div className="flex flex-col lg:flex-row min-h-full">
                {/* Sidebar - danh sách người dùng */}
                <div className="bg-gray-800 text-white w-full min-h-screen lg:w-64 p-4">
                    <h2 className="text-xl font-bold mb-6">Chats</h2>
                    <div className="space-y-4">
                        {users.map((user) => (
                            <div key={user._id}>
                                <a href={`/message/${user._id}`} className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
                                    <img className="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                                    <div className="flex flex-col">
                                        <h4 className="text-lg font-medium">{user.fullName}</h4>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main content - cuộc trò chuyện */}
                <div className="flex-1 bg-white p-6 flex flex-col">
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-4">
                            <img className="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                            <h3 className="text-xl font-semibold">{user}</h3>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4 space-y-4" style={{ maxHeight: "800px" }}>
                        {messages.map((message) => (
                            <div key={message._id} className={`flex ${message.sender === userId ? 'justify-end' : 'justify-start'}`}>
                                <div className={`${message.sender === userId ? 'bg-blue-500 text-white' : 'bg-gray-200'} p-3 rounded-lg max-w-xs`}>
                                    <p className="text-sm">{message.content}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input gửi tin nhắn */}
                    <div className="flex items-center space-x-2 mt-4">
                        <input
                            type="text"
                            id="message-input"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage();
                                }
                            }}
                            className="flex-1 p-3 border border-gray-300 rounded-lg"
                            placeholder="Type a message"
                        />
                        <button
                            className="bg-blue-500 text-white p-3 rounded-full"
                            onClick={handleSendMessage}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 5.25L19.5 12 2.25 18.75M19.5 12l-17.25 6.75" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
