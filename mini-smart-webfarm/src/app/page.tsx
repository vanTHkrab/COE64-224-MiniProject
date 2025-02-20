import SignIn from "@/components/sign-in";
import SignOut from "@/components/signout-button";
import { auth } from "@/auth";
import Header from "@/components/header";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from "next/link";


export default async function Home() {
    const session = await auth();
    console.log(session);

    return (

        <div className="flex container w-9/12">
            <div className="basis-1/2"></div>

            <div className="basis-1/2">

                <p className="text-lg font-semibold text-gray-700 mb-4 mt-32 text-center">Welcome to Our Platform</p>
                <div className="container mt-16 mx-auto p-10 bg-white rounded-xl shadow-2xl">

                    {/* ส่วนหัวข้อ */}
                    <h1 className="text-center text-2xl font-bold">Sign in to an account</h1>

                    {/* เว้นบรรทัดให้ถูกต้อง */}
                    <p className="mt-6 text-sm text-gray-600">*Indicates required field</p>

                    <div className="space-y-4">
                        {/* Email Field */}
                        <div>
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-green-600 focus:outline-none"
                                placeholder="*Enter your email"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <input
                                type="password"
                                id="password"
                                required
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-green-600 focus:outline-none"
                                placeholder="*Enter your password"
                            />
                        </div>

                        {/* Keep me logged in + Forgot Password */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="keep-logged-in"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="keep-logged-in" className="ml-2 text-sm text-gray-700">
                                    Keep me logged in
                                </label>
                            </div>
                            <a href="#" className="text-sm text-green-600 hover:underline">Forgot your password?</a>
                        </div>
                    </div>

                    {/* ปุ่ม Sign In */}
                    <div className="mt-6 flex justify-center">
                        <button
                            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200">
                            Sign In
                        </button>
                    </div>

                    {/* Sign in with Google */}

                    <div className="mt-6 flex justify-center">
                        <button
                            className="w-full py-2 px-4 bg-gray-300 text-black font-semibold rounded-lg flex items-center justify-center gap-3 hover:bg-gray-400 transition duration-200">
                            <Image src="/images/google.png" alt="Google Logo" width="20" height="20" />
                            <SignIn/>
                        </button>
                    </div>
                    <div>
                        <Link href="#" className="mt-6 text-sm text-green-600 hover:underline">Create account</Link>
                    </div>


                </div>
            </div>
        </div>


    );
}
