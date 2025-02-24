"use client"
import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import Image from "next/image";
import SignIn from "@/components/sign-in";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative">
            <div className="absolute inset-0 z-0">
                <Image src="/images/Bg.jpg" alt="Background" layout="fill" objectFit="cover" />
            </div>

            <SignIn />

        </div>
    );
};

export default AuthPage;
