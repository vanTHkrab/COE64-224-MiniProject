"use client"
import React from 'react';
import {signIn} from "next-auth/react";
import SignUp from "@/components/sign-up";
import SignIn from "@/components/sign-in";
import AuthComponent from "@/components/auth";

const SignInPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative">
            <AuthComponent />
        </div>
    );
};

export default SignInPage;