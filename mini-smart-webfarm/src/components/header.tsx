import { Button } from "@/components/ui/button";
import { Bell, Menu, Sun, Moon, Leaf } from "lucide-react";
import React, { useState } from "react";

interface HeaderProps {
    onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    const [isDark, setIsDark] = useState(false);

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
                        <Leaf className="h-6 w-6 text-emerald-600" />
                        <h1 className="text-xl font-semibold text-slate-800">Smart Farm</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-emerald-50 relative"
                    >
                        <Bell className="h-5 w-5 text-slate-600" />
                        <span className="absolute top-2 right-2 h-2 w-2 bg-emerald-500 rounded-full"></span>
                    </Button>

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
                            <p className="text-sm font-medium text-slate-700">John Doe</p>
                            <p className="text-xs text-slate-500">Farm Manager</p>
                        </div>
                        <div className="h-9 w-9 rounded-full bg-emerald-100 border-2 border-emerald-200
                                      flex items-center justify-center text-emerald-700 font-medium text-sm">
                            JD
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;