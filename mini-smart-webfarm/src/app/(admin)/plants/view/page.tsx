"use client";
import React, { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

interface Plant {
    id: number;
    sensor_id: number;
    plant: string;
    plant_season: string;
    plantation_area: string;
    growth_stage: string;
    pest_pressure?: number;
    crop_density?: number;
}

const ViewPlantsPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [plants, setPlants] = useState<Plant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPlants().then();
    }, []);

    const fetchPlants = async () => {
        try {
            const response = await fetch('/api/plants');
            if (!response.ok) {
                throw new Error('Failed to fetch plants');
            }
            const data: Plant[] = await response.json();
            setPlants(data);
            setLoading(false);
        } catch (err) {
            setError((err as Error).message);
            setLoading(false);
        }
    };

    const columns: ColDef<Plant>[] = [
        { headerName: "Sensor ID", field: "sensor_id", sortable: true, filter: true },
        { headerName: "Plant", field: "plant", sortable: true, filter: true },
        { headerName: "Season", field: "plant_season", sortable: true, filter: true },
        { headerName: "Area", field: "plantation_area", sortable: true, filter: true },
        { headerName: "Growth Stage", field: "growth_stage", sortable: true, filter: true },
        {
            headerName: "Pest Pressure",
            field: "pest_pressure",
            sortable: true,
            filter: true,
            valueFormatter: params => params.value !== undefined ? params.value.toFixed(2) : "N/A"
        },
        {
            headerName: "Crop Density",
            field: "crop_density",
            sortable: true,
            filter: true,
            valueFormatter: params => params.value !== undefined ? params.value.toFixed(2) : "N/A"
        }
    ];

    const filteredPlants = plants.filter(plant =>
        plant.plant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.plant_season.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.plantation_area.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className="p-6">
                    <div className="text-center text-red-600">
                        Error: {error}
                        <Button onClick={fetchPlants} className="ml-4">
                            Retry
                        </Button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div>
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 p-6 overflow-auto">
                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Plant Information</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search plants..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="text-center py-4">Loading...</div>
                        ) : (
                            <div className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
                                <AgGridReact
                                    modules={[AllCommunityModule]}
                                    columnDefs={columns}
                                    rowData={filteredPlants}
                                    pagination={true}
                                    paginationPageSize={20}
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>

        </div>
    );
};

export default ViewPlantsPage;
