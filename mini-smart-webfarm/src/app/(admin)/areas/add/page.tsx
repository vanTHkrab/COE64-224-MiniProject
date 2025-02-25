"use client"
import React from 'react';
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const center = {
    lat: 8.4333,
    lng: 99.9667,
}

const PlantationAreaPage = () => {

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <div>
            <Header onMenuClick={() => setIsSidebarOpen(true)}/>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>

            <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 p-6 overflow-auto">
                <div className="panel">
                    <div className="panel-header">
                        <h1 className="text-2xl font-bold">Plantation Area</h1>
                    </div>
                    <div className="panel-body">
                        <MapContainer center={center} zoom={10} style={{ height: "800px", width: "100%" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={center}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PlantationAreaPage;