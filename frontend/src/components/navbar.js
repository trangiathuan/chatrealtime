import axios from "axios";
import React, { useEffect, useState } from "react";
import ENDPOIN_API from "../configs/configAPI";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLoggedIn = !!localStorage.getItem('token');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        getInforUser()
    }, []);

    const getInforUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const res = await axios.post(`${ENDPOIN_API}/getInforUser`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            setUserName(res.data.data.userName)
        }
    }

    const handlelogout = () => {
        localStorage.removeItem('token')
    }

    return (
        <nav className="bg-blue-600 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}

                <a href="#" className="text-white text-2xl font-bold">
                    GIA THUẬN IS DEVELOPER
                </a>

                {/* Menu for larger screens */}
                <div className="hidden md:flex space-x-4">
                    <a href="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
                        Home
                    </a>
                    <a href="/message/67d7dfce5d544218bc32382a" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
                        Massage
                    </a>
                    <a href="/testMassage" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
                        testMessage
                    </a>
                    <a href="#" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
                        Services
                    </a>
                    {
                        isLoggedIn ?
                            <a href="/login" onClick={handlelogout} className="text-white hover:bg-blue-700 px-3 py-2 rounded">
                                Logout
                            </a>
                            :
                            <a href="/login" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
                                Login
                            </a>
                    }

                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white"
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-blue-500 text-white space-y-4 p-4">
                    <a href="/" className="block hover:bg-blue-700 px-3 py-2 rounded">
                        Home
                    </a>
                    <a href="/message/67d7dfce5d544218bc32382a" className="block hover:bg-blue-700 px-3 py-2 rounded">
                        Massage
                    </a>
                    <a href="#" className="block hover:bg-blue-700 px-3 py-2 rounded">
                        About
                    </a>
                    <a href="#" className="block hover:bg-blue-700 px-3 py-2 rounded">
                        Services
                    </a>
                    {
                        isLoggedIn ?
                            <a href="/login" onClick={handlelogout} className="block hover:bg-blue-700 px-3 py-2 rounded">
                                Logout
                            </a>
                            :
                            <a href="/login" className="block hover:bg-blue-700 px-3 py-2 rounded">
                                Login
                            </a>
                    }
                </div>
            )}
        </nav>
    );
}

export default Navbar;
