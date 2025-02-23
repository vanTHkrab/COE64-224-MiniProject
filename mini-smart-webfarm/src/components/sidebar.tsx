import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarChart3, ChevronDown, Droplet, Home, Leaf, Map, Settings, CloudSunRain } from "lucide-react";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const [activeMenu, setActiveMenu] = useState('');

    const menuItems = [
        { title: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/dashboard' },
        {
            title: 'Plant Management',
            icon: <Leaf className="w-5 h-5" />,
            submenu: [
                { name: 'Add Plant', path: '/plants/add' },
                { name: 'View Plants', path: '/plants/view' },
            ]
        },
        {
            title: 'Farm Areas',
            icon: <Map className="w-5 h-5" />,
            submenu: [
                { name: 'Manage Areas', path: '/areas/add' },
            ]
        },
        {
            title: 'Irrigation',
            icon: <Droplet className="w-5 h-5" />,
            submenu: [
                { name: 'Manage irrigation', path: '/irrigation/manages' },
            ]
        },
        {
            title: 'Analytics',
            icon: <BarChart3 className="w-5 h-5" />,
            submenu: [
                { name: 'Reports', path: '/analytics/reports' },
                { name: 'Trends', path: '/analytics/trends' },
                { name: 'Forecasts', path: '/analytics/forecasts' },
            ]
        },
        {
            title: 'Weather Information',
            icon: <CloudSunRain className="w-5 h-5" />,
            path: '/weather'
        },
        { title: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/settings' },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-gradient-to-b from-emerald-50 to-blue-50">
            <div className="p-6 bg-emerald-700">
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                    <Leaf className="w-6 h-6" />
                    Smart Farm
                </h2>
            </div>
            <ScrollArea className="flex-1 px-3">
                <div className="space-y-2 py-4">
                    {menuItems.map((item) => (
                        <div key={item.title} className="group">
                            {item.path ? (
                                <Link href={item.path} passHref>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start hover:bg-emerald-100 hover:text-emerald-700 text-slate-700
                                                 transition-colors duration-200"
                                    >
                                        <span className="flex items-center gap-3">
                                            {React.cloneElement(item.icon, {
                                                className: "w-5 h-5 text-emerald-600 group-hover:text-emerald-700"
                                            })}
                                            {item.title}
                                        </span>
                                    </Button>
                                </Link>
                            ) : (
                                <Button
                                    variant="ghost"
                                    className={`w-full justify-start hover:bg-emerald-100 text-slate-700
                                              transition-colors duration-200 ${
                                        activeMenu === item.title ? 'bg-emerald-100 text-emerald-700' : ''
                                    }`}
                                    onClick={() => setActiveMenu(activeMenu === item.title ? '' : item.title)}
                                >
                                    <span className="flex items-center gap-3">
                                        {React.cloneElement(item.icon, {
                                            className: `w-5 h-5 text-emerald-600 ${
                                                activeMenu === item.title ? 'text-emerald-700' : ''
                                            }`
                                        })}
                                        {item.title}
                                    </span>
                                    <ChevronDown className={`ml-auto h-4 w-4 transition-transform duration-200 text-emerald-600 ${
                                        activeMenu === item.title ? "rotate-180" : ""
                                    }`} />
                                </Button>
                            )}

                            {item.submenu && activeMenu === item.title && (
                                <div className="ml-4 mt-2 space-y-1 border-l-2 border-emerald-200">
                                    {item.submenu.map((subItem) => (
                                        <Link key={subItem.name} href={subItem.path} passHref>
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start pl-9 text-sm text-slate-600
                                                         hover:bg-emerald-50 hover:text-emerald-700"
                                            >
                                                {subItem.name}
                                            </Button>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );

    return (
        <>
            {/* Mobile Sidebar */}
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side="left" className="w-72 p-0">
                    <SheetTitle></SheetTitle>
                    <SidebarContent />
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block fixed inset-y-0 left-0 w-72 border-r border-emerald-100 shadow-lg">
                <SidebarContent />
            </div>
        </>
    );
};

export default Sidebar;