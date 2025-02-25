"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import AuthComponent from "@/components/auth";
import Link from "next/link";

const WelcomePage = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            <div className="absolute inset-0 z-0">
                <Image src="/images/Bg.jpg" alt="Farm Background" layout="fill" objectFit="cover" />
            </div>

            <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-green-500"></div>
                </div>
            )}

            {!loading && (
                session ? (
                    <div className="z-10 bg-green-50 p-8 rounded-lg shadow-lg max-w-md w-full border-4 border-green-700">
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold mb-2 text-green-800">Welcome to the Farm, {session.user.name}!</h1>
                            <p className="text-green-700">Your harvest is waiting for you.</p>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/dashboard"
                                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md text-center transition duration-300 flex items-center justify-center"
                            >
                                <span className="mr-2">🌱</span> View Your Farmland
                            </Link>

                            <button
                                onClick={() => signOut()}
                                className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 flex items-center justify-center"
                            >
                                <span className="mr-2">🚜</span> Leave the Farm
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="z-10 w-full">
                        <AuthComponent />
                    </div>
                )
            )}
        </div>
    );
};

export default WelcomePage;
