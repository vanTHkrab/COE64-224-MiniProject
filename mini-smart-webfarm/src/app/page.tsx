"use client"
import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl h-[500px] flex relative overflow-hidden">
                {/* Main Container */}
                <div className="w-full flex relative">
                    {/* Sign In Form */}
                    <div
                        className={`w-1/2 p-8 transition-all duration-700 ease-in-out absolute ${
                            isLogin
                                ? 'translate-x-0 opacity-100 z-10'
                                : 'translate-x-[-100%] opacity-0 z-0'
                        }`}
                    >
                        <h2 className="text-2xl font-bold mb-6">Sign In</h2>




                        <div className="flex gap-4 mb-6">
                            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-purple-500 hover:text-purple-500 transition-colors duration-300">
                                <span className="text-xl">G</span>
                            </button>
                            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-purple-500 hover:text-purple-500 transition-colors duration-300">
                                <span className="text-xl">f</span>
                            </button>
                            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-purple-500 hover:text-purple-500 transition-colors duration-300">
                                <span className="text-xl">in</span>
                            </button>
                        </div>

                        <p className="text-gray-500 text-sm mb-6">or use your email for sign in</p>

                        <form className="space-y-4">
                            <div className="relative transform transition-all duration-300 hover:translate-y-[-2px]">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>

                            <div className="relative transform transition-all duration-300 hover:translate-y-[-2px]">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </button>
                            </div>

                            <div className="text-right">
                                <a href="#" className="text-sm text-purple-600 hover:text-purple-700">Forgot
                                    Password?</a>
                            </div>

                            <button
                                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg">
                                Sign In
                            </button>
                        </form>
                    </div>

                    {/* Sign Up Form */}
                    <div
                        className={`w-1/2 p-8 transition-all duration-700 ease-in-out absolute ${
                            !isLogin
                                ? 'translate-x-full opacity-100 z-10'
                                : 'translate-x-[200%] opacity-0 z-0'
                        }`}
                    >
                        <h2 className="text-2xl font-bold mb-6">Create Account</h2>

                        <div className="flex gap-4 mb-6">
                            <button
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-purple-500 hover:text-purple-500 transition-colors duration-300">
                                <span className="text-xl">G</span>
                            </button>
                            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-purple-500 hover:text-purple-500 transition-colors duration-300">
                                <span className="text-xl">f</span>
                            </button>
                            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-purple-500 hover:text-purple-500 transition-colors duration-300">
                                <span className="text-xl">in</span>
                            </button>
                        </div>

                        <p className="text-gray-500 text-sm mb-6">or use your email for registration</p>

                        <form className="space-y-4">
                            <div className="relative transform transition-all duration-300 hover:translate-y-[-2px]">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>

                            <div className="relative transform transition-all duration-300 hover:translate-y-[-2px]">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>

                            <div className="relative transform transition-all duration-300 hover:translate-y-[-2px]">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </button>
                            </div>

                            <div className="relative transform transition-all duration-300 hover:translate-y-[-2px]">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </button>
                            </div>

                            <button
                                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg">
                                Sign Up
                            </button>
                        </form>
                    </div>

                    {/* Purple Section */}
                    <div
                        className={`absolute w-1/2 h-full bg-gradient-to-br from-purple-600 to-purple-700 text-white p-8 flex flex-col items-center justify-center transition-all duration-700 ease-in-out transform ${
                            isLogin ? 'translate-x-full' : 'translate-x-0'
                        }`}
                        style={{
                            borderRadius: isLogin ? '3rem 0 0 3rem' : '0 3rem 3rem 0'
                        }}
                    >
                        <h3 className="text-2xl font-bold mb-4 text-center">
                            {isLogin ? 'Hello, Friend!' : 'Welcome Back!'}
                        </h3>
                        <p className="text-center mb-8 text-gray-100">
                            {isLogin
                                ? 'Register with your personal details to use all site features'
                                : 'Enter your personal details to use all site features'
                            }
                        </p>
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="border-2 border-white text-white px-8 py-2 rounded-lg hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;