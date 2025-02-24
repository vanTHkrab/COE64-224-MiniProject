"use client";
import React, { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Leaf, Pencil, Trash2, RefreshCw } from "lucide-react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AllCommunityModule } from "ag-grid-community";

interface Plant {
    id: number;
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
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchPlants().then();
    }, []);

    const fetchPlants = async () => {
        try {
            const response = await fetch("/api/plants");
            if (!response.ok) {
                throw new Error("Failed to fetch plants");
            }
            const data: Plant[] = await response.json();
            setPlants(data);
            setLoading(false);
        } catch (err) {
            setError((err as Error).message);
            setLoading(false);
        }
    };

    const ActionsCellRenderer = (props: any) => {
        return (
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={() => props.onEdit(props.data.id)}
                >
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => props.onDelete(props.data.id)}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        );
    };

    const handleEdit = (id: number) => {
        console.log("Edit plant with ID:", id);
    };

    const handleDelete = (id: number) => {
        console.log("Delete plant with ID:", id);
    };

    const columns: ColDef<Plant>[] = [
        {
            headerName: "ID",
            field: "id",
            sortable: true,
            filter: true,
            width: 100,
            headerClass: "bg-green-50"
        },
        {
            headerName: "Plant",
            field: "plant",
            sortable: true,
            filter: true,
            headerClass: "bg-green-50"
        },
        {
            headerName: "Area",
            field: "plantation_area",
            sortable: true,
            filter: true,
            headerClass: "bg-green-50"
        },
        {
            headerName: "Season",
            field: "plant_season",
            sortable: true,
            filter: true,
            headerClass: "bg-green-50"
        },
        {
            headerName: "Growth Stage",
            field: "growth_stage",
            sortable: true,
            filter: true,
            headerClass: "bg-green-50"
        },
        {
            headerName: "Pest Pressure",
            field: "pest_pressure",
            sortable: true,
            filter: true,
            headerClass: "bg-green-50",
            valueFormatter: (params) =>
                params.value !== undefined ? params.value.toFixed(2) : "N/A",
        },
        {
            headerName: "Crop Density",
            field: "crop_density",
            sortable: true,
            filter: true,
            headerClass: "bg-green-50",
            valueFormatter: (params) =>
                params.value !== undefined ? params.value.toFixed(2) : "N/A",
        },
        {
            headerName: "Actions",
            cellRenderer: ActionsCellRenderer,
            cellRendererParams: {
                onEdit: handleEdit,
                onDelete: handleDelete,
            },
            filter: false,
            sortable: false,
            width: 120,
            headerClass: "bg-green-50"
        },
    ];

    const filteredPlants = plants.filter(
        (plant) =>
            plant.id.toString().includes(searchTerm) ||
            plant.plant.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plant.plant_season.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plant.plantation_area.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-amber-100">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className="p-6">
                    <Card className="max-w-lg mx-auto">
                        <CardContent className="p-6 text-center">
                            <div className="text-red-600 mb-4">Error: {error}</div>
                            <Button
                                onClick={fetchPlants}
                                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Retry
                            </Button>
                        </CardContent>
                    </Card>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-amber-100">
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 p-6 overflow-auto">
                <Card className="shadow-lg bg-white rounded-lg border border-green-200">
                    <CardHeader className="bg-green-600 text-white py-4 rounded-t-lg flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Leaf className="w-5 h-5" />
                            Plant Information
                        </CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-green-600" />
                            <Input
                                placeholder="Search plants..."
                                className="pl-8 bg-white border-green-400 text-green-800 placeholder-green-500 focus:ring-green-400 focus:border-green-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        {loading ? (
                            <div className="text-center py-4 text-green-600">
                                <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-2" />
                                Loading plants...
                            </div>
                        ) : (
                            <div
                                className="ag-theme-alpine"
                                style={{ height: "600px", width: "100%" }}
                            >
                                <AgGridReact
                                    modules={[AllCommunityModule]}
                                    columnDefs={columns}
                                    rowData={filteredPlants}
                                    pagination={true}
                                    paginationPageSize={20}
                                    detailRowAutoHeight={true}
                                    defaultColDef={{
                                        flex: 1,
                                        minWidth: 100,
                                        resizable: true,
                                    }}
                                    rowClass="hover:bg-green-50"
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