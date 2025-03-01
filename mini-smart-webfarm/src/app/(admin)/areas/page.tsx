"use client";
import React, { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import dynamic from "next/dynamic";
import {FooterDashboard} from "@/components/footer";

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
        <div className="">
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 overflow-auto from-green-100 via-blue-50 to-amber-100">
                <div className="panel">
                    <div className="panel-header">
                        <h1 className="text-2xl font-bold">Plantation Area (ประเทศไทย)</h1>
                    </div>
                    <div className="w-full">
                        <MapDisplay posix={[13.736717, 100.523186]} />
                    </div>
                </div>
                <FooterDashboard />

            </main>
        </div>
    );
};

export default PlantationAreaPage;
