"use client";
import React, { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Search,
    Leaf,
    Pencil,
    Trash2,
    RefreshCw,
    Save,
    Plus,
    X,
    Check
} from "lucide-react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AllCommunityModule } from "ag-grid-community";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Plant {
    id: number;
    plant: string;
    plant_season: string;
    plantation_area: string;
    growth_stage: string;
    timestamp: string;
    pest_pressure?: number;
    crop_density?: number;
}

const ViewPlantsPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [plants, setPlants] = useState<Plant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    // New state variables for CRUD operations
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentPlant, setCurrentPlant] = useState<Plant | null>(null);
    const [formData, setFormData] = useState<Partial<Plant>>({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchPlants().then();
    }, []);

    const fetchPlants = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/plants");
            if (!response.ok) {
                throw new Error("Failed to fetch plants");
            }
            const data: Plant[] = await response.json();
            console.log("Fetched plants:", data);
            setPlants(data);
            setLoading(false);
        } catch (err) {
            setError((err as Error).message);
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value === "" ? undefined : parseFloat(value)
        });
    };

    const resetForm = () => {
        setFormData({});
        setCurrentPlant(null);
    };

    const openAddDialog = () => {
        resetForm();
        setIsAddDialogOpen(true);
    };

    const openEditDialog = (id: number) => {
        const plant = plants.find(p => p.id === id);
        if (plant) {
            setCurrentPlant(plant);
            setFormData({ ...plant });
            setIsEditDialogOpen(true);
        }
    };

    const openDeleteDialog = (id: number) => {
        const plant = plants.find(p => p.id === id);
        if (plant) {
            setCurrentPlant(plant);
            setIsDeleteDialogOpen(true);
        }
    };

    const handleAddPlant = async () => {
        try {
            setIsSaving(true);
            const response = await fetch("/api/plants", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    plant: formData.plant || "New Plant",
                    plant_season: formData.plant_season || "Spring",
                    plantation_area: formData.plantation_area || "Field A",
                    growth_stage: formData.growth_stage || "Seedling",
                    pest_pressure: formData.pest_pressure,
                    crop_density: formData.crop_density,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to add plant");
            }
            const newPlant: Plant = await response.json();
            setPlants([...plants, newPlant]);
            setIsAddDialogOpen(false);
            resetForm();
            console.log("Plant added successfully:", newPlant);
            setIsSaving(false);
        } catch (err) {
            console.error("Error adding plant:", err);
            setIsSaving(false);
        }
    };

    const handleUpdatePlant = async () => {
        if (!currentPlant) return;
        try {
            setIsSaving(true);
            const response = await fetch("/api/plants", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: currentPlant.id,
                    ...formData,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to update plant");
            }
            const updatedPlant: Plant = await response.json();
            const updatedPlants = plants.map((p) =>
                p.id === updatedPlant.id ? updatedPlant : p
            );
            setPlants(updatedPlants);
            setIsEditDialogOpen(false);
            resetForm();
            console.log("Plant updated successfully:", updatedPlant);
            setIsSaving(false);
        } catch (err) {
            console.error("Error updating plant:", err);
            setIsSaving(false);
        }
    };

    const handleDeletePlant = async () => {
        if (!currentPlant) return;
        try {
            setIsSaving(true);
            const response = await fetch("/api/plants", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: currentPlant.id }),
            });
            if (!response.ok) {
                throw new Error("Failed to delete plant");
            }
            const deletedPlant: Plant = await response.json();
            const filteredPlants = plants.filter((p) => p.id !== deletedPlant.id);
            setPlants(filteredPlants);
            setIsDeleteDialogOpen(false);
            resetForm();
            console.log("Plant deleted successfully:", deletedPlant);
            setIsSaving(false);
        } catch (err) {
            console.error("Error deleting plant:", err);
            setIsSaving(false);
        }
    };

    const ActionsCellRenderer = (props: any) => {
        return (
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={() => openEditDialog(props.data.id)}
                >
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => openDeleteDialog(props.data.id)}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        );
    };

    const columns: ColDef<Plant>[] = [
        {
            headerName: "ID",
            field: "id",
            sortable: true,
            filter: true,
            width: 80,
            headerClass: "bg-green-100 text-green-800"
        },
        {
            headerName: "Plant",
            field: "plant",
            sortable: true,
            filter: true,
            headerClass: "bg-green-100 text-green-800"
        },
        {
            headerName: "Area",
            field: "plantation_area",
            sortable: true,
            filter: true,
            headerClass: "bg-green-100 text-green-800"
        },
        {
            headerName: "Season",
            field: "plant_season",
            sortable: true,
            filter: true,
            headerClass: "bg-green-100 text-green-800"
        },
        {
            headerName: "Growth Stage",
            field: "growth_stage",
            sortable: true,
            filter: true,
            headerClass: "bg-green-100 text-green-800"
        },
        {
            headerName: "Pest Pressure",
            field: "pest_pressure",
            sortable: true,
            filter: true,
            headerClass: "bg-green-100 text-green-800",
            valueFormatter: (params) =>
                params.value !== undefined ? params.value.toFixed(2) : "N/A",
        },
        {
            headerName: "Crop Density",
            field: "crop_density",
            sortable: true,
            filter: true,
            headerClass: "bg-green-100 text-green-800",
            valueFormatter: (params) =>
                params.value !== undefined ? params.value.toFixed(2) : "N/A",
        },
        {
            headerName: "Created At",
            field: "timestamp",
            sortable: true,
            filter: true,
            width: 180,
            headerClass: "bg-green-100 text-green-800",
            valueFormatter: (params) =>
                params.value ? new Date(params.value).toLocaleString() : "N/A",
        },
        {
            headerName: "Actions",
            cellRenderer: ActionsCellRenderer,
            filter: false,
            sortable: false,
            width: 120,
            headerClass: "bg-green-100 text-green-800"
        },
    ];

    const filteredPlants = plants?.filter(
        (plant) =>
            plant?.id?.toString().includes(searchTerm) ||
            plant?.plant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plant?.plant_season?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plant?.plantation_area?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const growthStages = ["Seedling", "Vegetative", "Flowering"];
    const seasons = ["June", "September", "March"];
    const areas = ["North", "Center", "South"];

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
                        <div className="flex items-center gap-4">
                            <div className="relative w-64">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-green-600" />
                                <Input
                                    placeholder="Search plants..."
                                    className="pl-8 bg-white border-green-400 text-green-800 placeholder-green-500 focus:ring-green-400 focus:border-green-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button
                                onClick={openAddDialog}
                                className="bg-green-700 hover:bg-green-800 text-white flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" />
                                Add Plant
                            </Button>
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
                                    onGridReady={(params) => {
                                        params.api.sizeColumnsToFit();
                                    }}
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>

            {/* Add Plant Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-green-700">
                            <Plus className="w-5 h-5" />
                            Add New Plant
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="plant" className="text-right">
                                Plant Name
                            </Label>
                            <div className="col-span-3 relative">
                                <div className="absolute left-2.5 top-2.5 text-green-600">
                                    <Leaf className="h-4 w-4" />
                                </div>
                                <Input
                                    id="plant"
                                    name="plant"
                                    placeholder="e.g., Tomato"
                                    className="pl-9"
                                    value={formData.plant || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="plant_season" className="text-right">
                                Season
                            </Label>
                            <div className="col-span-3">
                                <Select
                                    value={formData.plant_season || ""}
                                    onValueChange={(value) => handleSelectChange("plant_season", value)}
                                >
                                    <SelectTrigger className="pl-9 relative">
                                        <div className="absolute left-2.5 top-2.5 text-green-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun">
                                                <circle cx="12" cy="12" r="4" />
                                                <path d="M12 2v2" />
                                                <path d="M12 20v2" />
                                                <path d="m4.93 4.93 1.41 1.41" />
                                                <path d="m17.66 17.66 1.41 1.41" />
                                                <path d="M2 12h2" />
                                                <path d="M20 12h2" />
                                                <path d="m6.34 17.66-1.41 1.41" />
                                                <path d="m19.07 4.93-1.41 1.41" />
                                            </svg>
                                        </div>
                                        <SelectValue placeholder="Select season" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {seasons.map((season) => (
                                            <SelectItem key={season} value={season}>
                                                {season}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="plantation_area" className="text-right">
                                Area
                            </Label>
                            <div className="col-span-3">
                                <Select
                                    value={formData.plantation_area || ""}
                                    onValueChange={(value) => handleSelectChange("plantation_area", value)}
                                >
                                    <SelectTrigger className="pl-9 relative">
                                        <div className="absolute left-2.5 top-2.5 text-green-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map">
                                                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                                                <line x1="9" x2="9" y1="3" y2="18" />
                                                <line x1="15" x2="15" y1="6" y2="21" />
                                            </svg>
                                        </div>
                                        <SelectValue placeholder="Select area" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {areas.map((area) => (
                                            <SelectItem key={area} value={area}>
                                                {area}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="growth_stage" className="text-right">
                                Growth Stage
                            </Label>
                            <div className="col-span-3">
                                <Select
                                    value={formData.growth_stage || ""}
                                    onValueChange={(value) => handleSelectChange("growth_stage", value)}
                                >
                                    <SelectTrigger className="pl-9 relative">
                                        <div className="absolute left-2.5 top-2.5 text-green-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sprout">
                                                <path d="M7 20h10" />
                                                <path d="M10 20c0-3.37 0-8.5 0-12a2 2 0 0 0-2-2H4" />
                                                <path d="M14 20c0-3.37 0-8.5 0-12a2 2 0 0 1 2-2h4" />
                                            </svg>
                                        </div>
                                        <SelectValue placeholder="Select growth stage" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {growthStages.map((stage) => (
                                            <SelectItem key={stage} value={stage}>
                                                {stage}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="pest_pressure" className="text-right">
                                Pest Pressure
                            </Label>
                            <div className="col-span-3 relative">
                                <div className="absolute left-2.5 top-2.5 text-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bug">
                                        <path d="m8 2 1.88 1.88" />
                                        <path d="M14.12 3.88 16 2" />
                                        <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
                                        <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
                                        <path d="M12 20v-9" />
                                        <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
                                        <path d="M6 13H2" />
                                        <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
                                        <path d="M17.47 9c1.93-.2 3.53-1.9 3.53-4" />
                                        <path d="M18 13h4" />
                                        <path d="M21 21c0-2.1-1.7-3.9-3.8-4" />
                                    </svg>
                                </div>
                                <Input
                                    id="pest_pressure"
                                    name="pest_pressure"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="100"
                                    placeholder="0-100"
                                    className="pl-9"
                                    value={formData.pest_pressure === undefined ? "" : formData.pest_pressure}
                                    onChange={handleNumberChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="crop_density" className="text-right">
                                Crop Density
                            </Label>
                            <div className="col-span-3 relative">
                                <div className="absolute left-2.5 top-2.5 text-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rows">
                                        <path d="M18 3v18" />
                                        <rect width="8" height="6" x="6" y="3" rx="2" />
                                        <rect width="8" height="6" x="6" y="15" rx="2" />
                                    </svg>
                                </div>
                                <Input
                                    id="crop_density"
                                    name="crop_density"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="100"
                                    placeholder="0-100"
                                    className="pl-9"
                                    value={formData.crop_density === undefined ? "" : formData.crop_density}
                                    onChange={handleNumberChange}
                                />
                            </div>
                        </div>

                        {/* Visual separator */}
                        <div className="border-t border-green-100 my-2"></div>

                        <div className="flex justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant="outline" className="gap-1 hover:bg-red-50 hover:text-red-600 border-red-200">
                                    <X className="w-4 h-4" />
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                onClick={handleAddPlant}
                                className="bg-green-600 hover:bg-green-700 gap-1"
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Check className="w-4 h-4" />
                                )}
                                Save Plant
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Plant Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-blue-700">
                            <Pencil className="w-5 h-5" />
                            Edit Plant {currentPlant?.id}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-plant" className="text-right">
                                Plant Name
                            </Label>
                            <Input
                                id="edit-plant"
                                name="plant"
                                placeholder="e.g., Tomato"
                                className="col-span-3"
                                value={formData.plant || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-plant_season" className="text-right">
                                Season
                            </Label>
                            <div className="col-span-3">
                                <Select
                                    value={formData.plant_season || ""}
                                    onValueChange={(value) => handleSelectChange("plant_season", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select season" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {seasons.map((season) => (
                                            <SelectItem key={season} value={season}>
                                                {season}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-plantation_area" className="text-right">
                                Area
                            </Label>
                            <div className="col-span-3">
                                <Select
                                    value={formData.plantation_area || ""}
                                    onValueChange={(value) => handleSelectChange("plantation_area", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select area" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {areas.map((area) => (
                                            <SelectItem key={area} value={area}>
                                                {area}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-growth_stage" className="text-right">
                                Growth Stage
                            </Label>
                            <div className="col-span-3">
                                <Select
                                    value={formData.growth_stage || ""}
                                    onValueChange={(value) => handleSelectChange("growth_stage", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select growth stage" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {growthStages.map((stage) => (
                                            <SelectItem key={stage} value={stage}>
                                                {stage}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-pest_pressure" className="text-right">
                                Pest Pressure
                            </Label>
                            <Input
                                id="edit-pest_pressure"
                                name="pest_pressure"
                                type="number"
                                step="0.1"
                                min="0"
                                max="100"
                                placeholder="0-100"
                                className="col-span-3"
                                value={formData.pest_pressure === undefined ? "" : formData.pest_pressure}
                                onChange={handleNumberChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-crop_density" className="text-right">
                                Crop Density
                            </Label>
                            <Input
                                id="edit-crop_density"
                                name="crop_density"
                                type="number"
                                step="0.1"
                                min="0"
                                max="50"
                                placeholder="0-100"
                                className="col-span-3"
                                value={formData.crop_density === undefined ? "" : formData.crop_density}
                                onChange={handleNumberChange}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" className="gap-1">
                                <X className="w-4 h-4" />
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            onClick={handleUpdatePlant}
                            className="bg-blue-600 hover:bg-blue-700 gap-1"
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Update Plant
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-700">
                            <Trash2 className="w-5 h-5" />
                            Delete Plant
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-center">
                            Are you sure you want to delete <span className="font-semibold">{currentPlant?.plant}</span> (ID: {currentPlant?.id})?
                        </p>
                        <p className="text-center text-gray-500 mt-2">
                            This action cannot be undone.
                        </p>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" className="gap-1">
                                <X className="w-4 h-4" />
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            onClick={handleDeletePlant}
                            className="bg-red-600 hover:bg-red-700 gap-1"
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                                <Trash2 className="w-4 h-4" />
                            )}
                            Delete Plant
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ViewPlantsPage;