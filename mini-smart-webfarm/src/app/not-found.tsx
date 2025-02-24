import Link from "next/link";

export default function NotFound() {
    return (
        <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-emerald-900 to-blue-900">
            {/* Floating Blobs */}
            <div className="absolute w-72 h-72 bg-emerald-500 opacity-30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
            <div className="absolute w-64 h-64 bg-blue-500 opacity-30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

            {/* 404 Content */}
            <div className="text-center relative z-10">
                <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300 drop-shadow-lg">
                    404
                </h1>
                <p className="text-xl text-gray-200 mt-2">Oops! The page you are looking for doesn't exist.</p>
                <Link href="/">
                    <button className="mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-80 transition-all duration-300">
                        Go back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
}
