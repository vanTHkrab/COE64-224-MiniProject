import { signIn } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
    return (
        <div>
            <h1 className="text-center text-2xl font-bold">Sign in to an account</h1>
            <p className="mt-6 text-sm text-gray-600">*Indicates required field</p>
            <form
                action={async (formData) => {
                    "use server";
                    await signIn("credentials", formData);
                }}
                className="justify-center w-full"
            >
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition duration-200"
                    >
                        Sign in
                    </button>

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
            </form>

            <form
                action={async () => {
                    "use server";
                    await signIn("google");
                }}
                className="flex justify-center mt-5"
            >
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-gray-300 text-black font-semibold rounded-lg flex items-center justify-center gap-3 hover:bg-gray-400 transition duration-200">
                    <Image src="/images/google.png" alt="Google Logo" width="20" height="20" />
                    Sign in with Google
                </button>
            </form>

            <div>
                <Link href="#" className="mt-6 text-sm text-green-600 hover:underline">Create account</Link>
            </div>
        </div>

    );
}
