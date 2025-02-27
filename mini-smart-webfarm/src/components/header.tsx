import { Button } from "@/components/ui/button";
import { Menu, Sun, Moon, Leaf } from "lucide-react";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { AlertButton } from "@/components/alert-button";
import Image from "next/image";

interface HeaderProps {
    onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    const { data: session } = useSession(); // ดึงข้อมูล session
    const [isDark, setIsDark] = useState(false);

    const userName = session?.user?.name || "Guest";
    const imageUrl = session?.user?.image;

    const initials = userName
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-emerald-100 shadow-sm z-50">
            <div className="flex items-center justify-between px-6 h-full max-w-screen-2xl mx-auto">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-emerald-50 lg:hidden"
                        onClick={onMenuClick}
                    >
                        <Menu className="h-5 w-5 text-slate-600" />
                    </Button>

                    <div className="flex items-center gap-2">
                        {/*<Leaf className="h-6 w-6 text-emerald-600" />*/}
                        <Image src="/images/Logo_2.jpg" alt={"Logo"} width={50} height={250} />
                        <h1 className="text-xl font-semibold text-slate-800">HighTech</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* ใช้ AlertButton เพื่อแสดงการแจ้งเตือน */}
                    <AlertButton />

                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-emerald-50"
                        onClick={() => setIsDark(!isDark)}
                    >
                        {isDark ? (
                            <Moon className="h-5 w-5 text-slate-600" />
                        ) : (
                            <Sun className="h-5 w-5 text-slate-600" />
                        )}
                    </Button>

                    <div className="flex items-center gap-3 ml-2">
                        <div className="hidden sm:block">
                            <p className="text-sm font-medium text-slate-700">{userName}</p>
                            <p className="text-xs text-slate-500">Farm Manager</p>
                        </div>
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={userName}
                                width={36}
                                height={36}
                                className="rounded-full"
                            />
                        ) : (
                            <div className="h-9 w-9 rounded-full bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center text-emerald-700 font-medium text-sm">
                                {initials}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
