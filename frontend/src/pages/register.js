import { useState } from "react";
import Navbar from "../components/navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import ENDPOIN_API from "../configs/configAPI";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${ENDPOIN_API}/createUser`, { email, password, fullName });
        if (res.data.EC === 0) {
            toast.success(res.data.Message);
        }
        else {
            toast.error(res.data.Message);
        }
        setEmail('');
        setPassword('');
        setFullName('');
    }

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <ToastContainer />
            </div>
            <div className="flex items-center justify-center bg-gray-100 min-h-screen">
                <div className="rounded-lg bg-white shadow-lg w-80 p-8 -mt-20">
                    <h2 className="flex justify-center text-2xl font-bold mb-5 ">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">User name</label>
                            <input
                                type="text"
                                id="fullName"
                                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập tên người dùng"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Đăng ký
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <a href="/login" className="text-blue-600 mt-3 font-bold">Đăng nhập</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default Register;