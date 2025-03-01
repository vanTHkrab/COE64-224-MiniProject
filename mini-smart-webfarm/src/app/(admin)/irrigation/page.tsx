"use client"
import React, { useState, useEffect } from 'react';
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import MyTable from "@/components/irrigation-table";

const IrrigationManagePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div>
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 overflow-auto  from-green-100 via-blue-50to-amber-100">
                <MyTable />
            </main>
        </div>
    );
};

export default IrrigationManagePage;
