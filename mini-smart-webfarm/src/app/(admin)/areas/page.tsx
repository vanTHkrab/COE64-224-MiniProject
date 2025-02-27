"use client";
import React, { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import dynamic from "next/dynamic";


const PlantationAreaPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const MapDisplay = useMemo(() => dynamic(
        () => import("@/components/maps"),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    return (
        <div>
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 p-6 overflow-auto">
                <div className="panel">
                    <div className="panel-header">
                        <h1 className="text-2xl font-bold">Plantation Area (ประเทศไทย)</h1>
                    </div>
                    <div className="w-full h-[40rem]">
                        <MapDisplay posix={[13.736717, 100.523186]} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PlantationAreaPage;
