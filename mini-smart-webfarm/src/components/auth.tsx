"use client";
import React from "react";
import SignIn from "@/components/sign-in";
import SignUp from "@/components/sign-up";
import Image from "next/image";

export default function AuthComponent() {
    const [isLogin, setIsLogin] = React.useState(true);

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md relative z-10 p-4 md:hidden">
                {isLogin ? <SignIn /> : <SignUp />}
                <div className="text-center pb-6">
                      <span className="text-base text-gray-600">

                          {isLogin ? "Don't have an account? " : "Already have an account? "}
                      </span>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-base text-green-600 hover:underline font-medium"
                    >
                        {isLogin ? "Sign Up" : "Sign In"}
                    </button>
                </div>
            </div>

            {/* Desktop view */}
            <div
                className="hidden md:block bg-white rounded-3xl shadow-xl w-full max-w-5xl h-[600px] overflow-hidden relative z-10">
                <div className="w-full h-full relative">
                    <div
                        className={`absolute justify-center items-center  w-1/2 h-full p-8 flex transition-all duration-700 ease-in-out transform ${
                            isLogin ? "translate-x-0" : "translate-x-[100%]"
                        }`}
                        style={{
                            borderRadius: isLogin ? "3rem 0 0 3rem" : "0 3rem 3rem 0",
                        }}
                    >
                        {isLogin ? <SignIn /> : <SignUp />}
                    </div>

                    <div
                        className={`absolute w-1/2 h-full bg-gradient-to-br from-green-600 to-green-700 text-white p-8 flex flex-col items-center justify-center transition-all duration-700 ease-in-out transform ${
                            isLogin ? "translate-x-full" : "translate-x-0"
                        }`}
                        style={{
                            borderRadius: isLogin ? "3rem 0 0 3rem" : "0 3rem 3rem 0",
                        }}
                    >
                        <Image src="/images/Logo_3.png" alt={"Logo"} width={200} height={200} className={"mb-12"} />
                        <h3 className="text-2xl font-bold text-center translate-y-[-20%] mb-4">
                            {isLogin ? "Wellcome To HighTech" : "Entry To HighTech"}
                        </h3>
                        <p className="text-center text-gray-100 mb-4">
                            {isLogin
                                ? "Register with your personal details to use all site features"
                                : "Enter your personal details to use all site features"}
                        </p>
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="border-2 border-white text-white px-8 py-2 rounded-lg hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
                        >
                            {isLogin ? "Sign Up" : "Sign In"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}