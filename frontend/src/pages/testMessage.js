// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:4000"); // Kết nối đến server

// function App() {
//     const [message, setMessage] = useState("");
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         // Lắng nghe tin nhắn từ server
//         socket.on("receiveMessage", (data) => {
//             setMessages((prevMessages) => [...prevMessages, data]);
//             console.log("Tin nhắn: ", data);

//         });



//         return () => socket.off("receiveMessage");
//     }, []);

//     const sendMessage = () => {
//         socket.emit("sendMessage", message); // Gửi tin nhắn lên server
//         setMessage(""); // Xóa ô input sau khi gửi
//     };

//     return (
//         <div style={{ textAlign: "center", padding: "20px" }}>
//             <h1>💬 Chat Realtime</h1>
//             <div>
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Nhập tin nhắn..."
//                 />
//                 <button onClick={sendMessage}>Gửi</button>
//             </div>
//             <ul>
//                 {messages.map((msg, index) => (
//                     <li key={index}>{msg}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default App;
