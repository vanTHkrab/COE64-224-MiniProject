import {Button} from "@/components/ui/button";
import {Bell, Menu} from "lucide-react";
import React from "react";

interface HeaderProps {
    onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50">
        <div className="flex items-center justify-between px-4 h-full">
            <div className="hidden lg:flex items-center gap-4">
                <h1 className="text-lg font-semibold lg:p-16">Smart Farm</h1>
            </div>
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={onMenuClick}
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>
                <div className="h-8 w-8 rounded-full bg-gray-200" />
            </div>
        </div>
    </header>
);
