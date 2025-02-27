"use client";
import React, { useEffect, useState } from "react";
import {
    BarChart,
    Info,
    Search,
    Plus,
    Edit,
    Trash2,
    Save,
    X,
    Droplets,    // สำหรับ Irrigation Frequency
    Sprout,      // สำหรับ Fertilizer Usage
    CloudRain,   // สำหรับ Water Source
    Percent,     // สำหรับ Water Usage Efficiency
    CalendarDays // สำหรับ Date & Time
} from "lucide-react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
    AllCommunityModule,
    ModuleRegistry,
    ClientSideRowModelModule,
    ColumnAutoSizeModule,
} from "ag-grid-community";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

ModuleRegistry.registerModules([ClientSideRowModelModule, ColumnAutoSizeModule]);

interface IrrigationData {
    id: number;
    irrigation_frequency: number;
    fertilizer_usage: number;
    water_source_type: string;
    timestamp: string;
    water_usage_efficiency: number;
}

const emptyRecord: Omit<IrrigationData, "id"> = {
    irrigation_frequency: 1,
    fertilizer_usage: 10,
    water_source_type: "Well",
    timestamp: new Date().toISOString(),
    water_usage_efficiency: 80, // default value
};

const IrrigationDashboard = () => {
    const [data, setData] = useState<IrrigationData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("table");
    const [searchTerm, setSearchTerm] = useState("");
    const [gridApi, setGridApi] = useState<any>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // State for modal and editing
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<IrrigationData | null>(null);
    const [formData, setFormData] = useState<any>(emptyRecord);
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

    useEffect(() => {
        fetchData().then();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("/api/irrigation");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const result: IrrigationData[] = await response.json();
            setData(result);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const onGridReady = (params: any) => {
        setGridApi(params.api);
        setTimeout(() => {
            if (params.columnApi) {
                const allDisplayedColumns = params.columnApi.getAllDisplayedColumns();
                if (allDisplayedColumns && allDisplayedColumns.length > 0) {
                    params.api.sizeColumnsToFit();
                }
            }
        }, 100);
    };

    // CRUD Operations
    const handleAdd = () => {
        setIsEditing(false);
        setFormData({ ...emptyRecord, timestamp: new Date().toISOString() });
        setShowModal(true);
    };

    const handleEdit = (record: IrrigationData) => {
        setIsEditing(true);
        setCurrentRecord(record);
        setFormData({ ...record });
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        try {
            // API call can be inserted here.
            setData((prevData) => prevData.filter((item) => item.id !== id));
            setDeleteConfirmId(null);
        } catch (error) {
            setError("Failed to delete record");
        }
    };

    const handleSave = async () => {
        try {
            if (isEditing && currentRecord) {
                // Update existing record
                setData((prevData) =>
                    prevData.map((item) =>
                        item.id === currentRecord.id ? { ...item, ...formData } : item
                    )
                );
            } else {
                // Add new record
                const newId = Math.max(...data.map((item) => item.id), 0) + 1;
                const newRecord = { id: newId, ...formData };
                setData((prevData) => [...prevData, newRecord]);
            }
            setShowModal(false);
            setFormData(emptyRecord);
            setCurrentRecord(null);
        } catch (error) {
            setError("Failed to save record");
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === "number" ? parseFloat(value) : value,
        });
    };

    // Custom cell renderers
    const IrrigationFrequencyRenderer = (params: any) => {
        const value = params.value;
        return (
            <div className="flex items-center">
                <span className="mr-2">{value}x daily</span>
                <div className="flex">
                    {[...Array(value)].map((_, i) => (
                        <div key={i} className="text-blue-400">
                            💧
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const FertilizerUsageRenderer = (params: any) => {
        const value = params.value;
        const percent = Math.min((value / 40) * 100, 100);
        return (
            <div className="flex items-center">
                <span className="mr-2">{value} kg</span>
                <div className="w-16 h-3 bg-emerald-900 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400" style={{ width: `${percent}%` }} />
                </div>
            </div>
        );
    };

    const WaterSourceRenderer = (params: any) => {
        const value = params.value;
        const getColor = () => {
            switch (value) {
                case "River":
                    return "bg-blue-600";
                case "Recycled":
                    return "bg-yellow-600";
                case "Groundwater":
                    return "bg-green-600";
                default:
                    return "bg-gray-600";
            }
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getColor()}`}>
        {value}
      </span>
        );
    };

    const WaterUsageEfficiencyRenderer = (params: any) => {
        const value = params.value;
        return <div className="text-sm font-medium">{value}%</div>;
    };

    const TimestampRenderer = (params: any) => {
        const date = new Date(params.value);
        return (
            <div className="text-sm pl-2">
                <div>{date.toLocaleDateString()}</div>
                <div className="text-emerald-300">{date.toLocaleTimeString()}</div>
            </div>
        );
    };

    const ActionRenderer = (params: any) => {
        return (
            <div className="flex space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 text-amber-400 hover:text-amber-300 hover:bg-amber-900/30"
                    onClick={() => handleEdit(params.data)}
                >
                    <Edit size={16} />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/30"
                    onClick={() => setDeleteConfirmId(params.data.id)}
                >
                    <Trash2 size={16} />
                </Button>
            </div>
        );
    };

    const columnDefs: ColDef[] = [
        {
            field: "id",
            headerName: "ID",
            filter: "agNumberColumnFilter",
            cellRenderer: (params: any) => <span className="font-mono">{params.value}</span>,
            width: 70,
            minWidth: 70,
        },
        {
            field: "irrigation_frequency",
            headerName: "Irrigation Frequency",
            filter: "agNumberColumnFilter",
            cellRenderer: IrrigationFrequencyRenderer,
        },
        {
            field: "fertilizer_usage",
            headerName: "Fertilizer Usage",
            filter: "agNumberColumnFilter",
            cellRenderer: FertilizerUsageRenderer,
        },
        {
            field: "water_source_type",
            headerName: "Water Source",
            filter: "agTextColumnFilter",
            cellRenderer: WaterSourceRenderer,
        },
        {
            field: "water_usage_efficiency",
            headerName: "Water Usage Efficiency",
            filter: "agNumberColumnFilter",
            cellRenderer: WaterUsageEfficiencyRenderer,
        },
        {
            field: "timestamp",
            headerName: "Timestamp",
            filter: "agDateColumnFilter",
            cellRenderer: TimestampRenderer,
        },
        {
            headerName: "Actions",
            cellRenderer: ActionRenderer,
            filter: false,
            sortable: false,
            width: 100,
            minWidth: 100,
        },
    ];

    const defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true,
        floatingFilter: true,
        flex: 1,
        minWidth: 100,
    };

    const filteredData = data.filter(
        (item) =>
            item.id.toString().includes(searchTerm) ||
            item.irrigation_frequency.toString().includes(searchTerm) ||
            item.water_source_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.timestamp.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading)
        return (
            <div className="flex items-center justify-center h-64 bg-gradient-to-br from-emerald-900 to-blue-900 p-6 rounded-lg shadow-xl">
                <div className="animate-pulse flex space-x-2">
                    <div className="h-3 w-3 bg-emerald-300 rounded-full"></div>
                    <div className="h-3 w-3 bg-emerald-300 rounded-full"></div>
                    <div className="h-3 w-3 bg-emerald-300 rounded-full"></div>
                </div>
                <p className="text-emerald-300 ml-3">Loading irrigation data...</p>
            </div>
        );

    if (error)
        return (
            <div className="bg-gradient-to-br from-red-900 to-red-800 text-red-50 p-6 rounded-lg shadow-xl">
                <div className="flex items-center">
                    <Info className="text-red-300 mr-2" />
                    <p className="text-red-300">Error: {error}</p>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-amber-100 relative">
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 p-6 overflow-auto">
                <Card className="shadow-lg bg-white rounded-lg border border-green-200">
                    <CardHeader className="bg-green-600 text-white py-4 rounded-t-lg flex flex-row items-center justify-between">
                        <CardTitle className="text-2xl font-bold">Farm Irrigation Dashboard</CardTitle>
                        <div className="flex items-center gap-4">
                            {/* Search bar สำหรับหน้าจอ medium ขึ้นไป */}
                            <div className="relative w-64 hidden md:block">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-green-600" />
                                <Input
                                    placeholder="Search records..."
                                    className="pl-8 bg-white border-green-400 text-green-800 placeholder-green-500 focus:ring-green-400 focus:border-green-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button
                                onClick={handleAdd}
                                className="bg-green-700 hover:bg-green-800 text-white flex items-center gap-1"
                            >
                                <Plus size={16} />
                                Add Record
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        {/* Search bar สำหรับหน้าจอ mobile */}
                        <div className="mb-4 block md:hidden">
                            <div className="relative w-full">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-green-600" />
                                <Input
                                    placeholder="Search records..."
                                    className="pl-8 bg-white border-green-400 text-green-800 placeholder-green-500 focus:ring-green-400 focus:border-green-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        {loading ? (
                            <div className="text-center py-4 text-green-600">
                                <div className="animate-spin h-8 w-8 mx-auto mb-2">
                                    {/* ถ้าต้องการใช้ไอคอนหมุน */}
                                    {/* <RefreshCw /> */}
                                </div>
                                Loading records...
                            </div>
                        ) : (
                            <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
                                <AgGridReact
                                    modules={[AllCommunityModule]}
                                    columnDefs={columnDefs}
                                    rowData={filteredData}
                                    pagination={true}
                                    paginationPageSize={20}
                                    detailRowAutoHeight={true}
                                    defaultColDef={defaultColDef}
                                    rowClass="hover:bg-green-50"
                                    onGridReady={onGridReady}
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>

            {/* Add/Edit Record Dialog */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-green-700">
                            {/* ถ้าเป็นการแก้ไขให้แสดงไอคอน Edit */}
                            {isEditing ? (
                                <>
                                    <Edit className="w-5 h-5" />
                                    Edit Record
                                </>
                            ) : (
                                <>
                                    <Plus className="w-5 h-5" />
                                    Add New Record
                                </>
                            )}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {/* Irrigation Frequency */}
                        <div className="relative">
                            <label className="block text-green-600 text-sm mb-1">
                                Irrigation Frequency
                            </label>
                            <div className="relative">
                                <Droplets className="absolute left-2 top-3 h-4 w-4 text-green-600" />
                                <Input
                                    type="number"
                                    name="irrigation_frequency"
                                    value={formData.irrigation_frequency}
                                    onChange={handleInputChange}
                                    min="1"
                                    max="10"
                                    className="pl-8"
                                />
                            </div>
                        </div>

                        {/* Fertilizer Usage */}
                        <div className="relative">
                            <label className="block text-green-600 text-sm mb-1">
                                Fertilizer Usage (kg)
                            </label>
                            <div className="relative">
                                <Sprout className="absolute left-2 top-3 h-4 w-4 text-green-600" />
                                <Input
                                    type="number"
                                    name="fertilizer_usage"
                                    value={formData.fertilizer_usage}
                                    onChange={handleInputChange}
                                    min="0"
                                    className="pl-8"
                                />
                            </div>
                        </div>

                        {/* Water Source */}
                        <div className="relative">
                            <label className="block text-green-600 text-sm mb-1">Water Source</label>
                            <div className="relative">
                                <CloudRain className="absolute left-2 top-3 h-4 w-4 text-green-600" />
                                <select
                                    name="water_source_type"
                                    value={formData.water_source_type}
                                    onChange={handleInputChange}
                                    className="w-full bg-white border border-green-400 rounded-lg pl-8 pr-2 py-2 text-green-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                                >
                                    <option value="River">River</option>
                                    <option value="Groundwater">Groundwater</option>
                                    <option value="Recycled">Recycled</option>
                                </select>
                            </div>
                        </div>

                        {/* Water Usage Efficiency (%) */}
                        <div className="relative">
                            <label className="block text-green-600 text-sm mb-1">
                                Water Usage Efficiency (%)
                            </label>
                            <div className="relative">
                                <Percent className="absolute left-2 top-3 h-4 w-4 text-green-600" />
                                <Input
                                    type="number"
                                    name="water_usage_efficiency"
                                    value={formData.water_usage_efficiency}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="100"
                                    className="pl-8"
                                />
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div className="relative">
                            <label className="block text-green-600 text-sm mb-1">Date & Time</label>
                            <div className="relative">
                                <CalendarDays className="absolute left-2 top-3 h-4 w-4 text-green-600" />
                                <Input
                                    type="datetime-local"
                                    name="timestamp"
                                    value={formData.timestamp.substring(0, 16)}
                                    onChange={handleInputChange}
                                    className="pl-8"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                className="gap-1 hover:bg-red-50 hover:text-red-600 border-red-200"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 gap-1">
                            <Save size={16} className="mr-1" />
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirmId !== null} onOpenChange={() => setDeleteConfirmId(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-700">
                            <Trash2 className="w-5 h-5" />
                            Delete Record
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-center">
                            Are you sure you want to delete this record? This action cannot be undone.
                        </p>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                className="gap-1 hover:bg-red-50 hover:text-red-600 border-red-200"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            onClick={() => handleDelete(deleteConfirmId!)}
                            className="bg-red-600 hover:bg-red-700 gap-1"
                        >
                            <Trash2 size={16} className="mr-1" />
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default IrrigationDashboard;
