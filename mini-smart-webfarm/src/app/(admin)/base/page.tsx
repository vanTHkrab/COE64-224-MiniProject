"use client"
import React from 'react';
import {Sidebar} from "@/components/sidebar";
import {Header} from "@/components/header";

const BasePage = () => {

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <div>
            <Header onMenuClick={() => setIsSidebarOpen(true)}/>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>

            <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 p-6 overflow-auto">
                <div className="panel">
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <p className="text-gray-500">Welcome to the admin panel</p>
                </div>
            </main>
        </div>
    );
};

export default BasePage;