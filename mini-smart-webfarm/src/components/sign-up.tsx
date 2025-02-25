"use client";
import React, { useState } from "react";
import { Lock, Mail, User, Eye, EyeOff } from "lucide-react";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirm-password"),
        };

        console.log(data);
    };

    return (
        <div className="w-full">
            <div className="w-full max-w-md p-6 ">
                <h1 className="text-2xl font-bold text-gray-800 text-center">Sign Up</h1>
                <p className="text-gray-500 text-center">Create an account to get started.</p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="name" className="block text-gray-600 font-medium">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Email Address */}
                    <div>
                        <label htmlFor="email" className="block text-gray-600 font-medium">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-gray-600 font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="********"
                                required
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirm-password" className="block text-gray-600 font-medium">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirm-password"
                                placeholder="********"
                                required
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold text-lg hover:bg-green-600 transition-all"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
