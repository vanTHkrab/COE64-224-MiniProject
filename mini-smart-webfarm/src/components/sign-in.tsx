"use client";
import {Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

interface SocialButtonProps {
    icon: React.ReactNode;
    ariaLabel: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({icon, ariaLabel}) => (
    <button
        aria-label={ariaLabel}
        className="w-10 h-10 md:w-8 md:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-green-500 hover:text-green-500 transition-colors duration-300"
    >
        <span className="text-xl">{icon}</span>
    </button>
);

export default function SignIn() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleSignInGoogle = async () => {
        await signIn("google");
    }

    const handleSubmit = async (formData: FormData) => {
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        try {
            await signIn("credentials", {
                email: data.email as string,
                password: data.password as string,
                redirect: true,
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold text-center">
                <FontAwesomeIcon icon={faRightToBracket} className="mr-2"/>
                Sign In
            </h1>

            <p className="text-gray-500 text-center">Sign in to your account to continue</p>
            <div className="flex items-center justify-center gap-2 my-4">
                <form
                    action={handleSignInGoogle}
                    className="w-10 h-10 md:w-8 md:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-green-500 hover:text-green-500 transition-colors duration-300"
                >
                    <SocialButton icon={"G"} ariaLabel="Sign in with Google"/>
                </form>
                <SocialButton icon={"F"} ariaLabel="Sign in with Facebook"/>
            </div>
            <div className="text-center mt-4">
                <span className="text-gray-500">Or sign in with email</span>
            </div>
            <form className="px-4 w-full h-full" action={handleSubmit}>
                <div className="mt-4">
                    <label htmlFor="email" className="block text-gray-600">Email Address</label>
                    <div className="relative transform transition-all duration-300 hover:translate-y-[-2px]">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-20">
                            <Mail/>
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="[email protected]"
                            required
                            className="w-full pl-10 pr-10 py-3 md:py-2 text-base md:text-sm border border-gray-200 rounded-xl md:rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label htmlFor="password" className="block text-gray-600">Password</label>
                    <div className="relative transform transition-all duration-300 hover:translate-y-[-2px]">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-20">
                            <Lock/>
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="********"
                            required
                            className="w-full pl-10 pr-10 py-3 md:py-2 text-base md:text-sm border border-gray-200 rounded-xl md:rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />

                        <button
                            type="button"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                        </button>

                    </div>

                    <div className="mt-2 text-right">
                        <Link href="#" className="text-green-500 hover:underline">Forgot password?</Link>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="remember" className="flex items-center">
                            <input type="checkbox" name="remember" id="remember" className="mr-2"/>
                            <span>Remember me</span>
                        </label>
                    </div>
                </div>

                <button type="submit" className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-md">Sign In
                </button>
            </form>
        </div>
    );
}