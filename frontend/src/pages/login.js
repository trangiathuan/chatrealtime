import { useState } from "react";
import Navbar from "../components/navbar";
import axios from 'axios';
import ENDPOIN_API from "../configs/configAPI";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${ENDPOIN_API}/loginUser`, { email, password });

        const token = res.data.user.token
        localStorage.setItem('token', token)
        console.log(res.data.user);
        if (res.data.user.EC === 0) {
            toast.success(res.data.user.Message)
        }
        else {
            toast.warning(res.data.user.Message)
        }

        setTimeout(() => {
            navigate('/')
        }, 1000);

    };

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <ToastContainer />
            </div>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white w-80 p-8 rounded-lg shadow-lg -mt-20">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Login
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <a href="/register" className="text-blue-600 mt-3 font-bold">Create account</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;