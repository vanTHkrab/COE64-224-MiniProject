"use client";
import React, { useEffect, useState } from "react";
import { BarChart, Info, Search, Plus, Edit, Trash2, Save, X } from "lucide-react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, CellClickedEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AllCommunityModule, ModuleRegistry, ClientSideRowModelModule, ColumnAutoSizeModule } from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule, ColumnAutoSizeModule]);

// Updated interface to include water_usage_efficiency
interface IrrigationData {
    id: number;
    irrigation_frequency: number;
    fertilizer_usage: number;
    water_source_type: string;
    timestamp: string;
    water_usage_efficiency: number;
}

// Define a type for the empty/new record with water_usage_efficiency added
const emptyRecord: Omit<IrrigationData, 'id'> = {
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
    const handleAdd = async () => {
        setIsEditing(false);
        setFormData({ ...emptyRecord, timestamp: new Date().toISOString() });
        setShowModal(true);
    };

    const handleEdit = (record: IrrigationData) => {
        setIsEditing(true);
        setCurrentRecord(record);
        setFormData({
            irrigation_frequency: record.irrigation_frequency,
            fertilizer_usage: record.fertilizer_usage,
            water_source_type: record.water_source_type,
            timestamp: record.timestamp,
            water_usage_efficiency: record.water_usage_efficiency,
        });
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
                // Update existing record via API (or local state for demo)
                setData((prevData) =>
                    prevData.map((item) =>
                        item.id === currentRecord.id ? { ...item, ...formData } : item
                    )
                );
            } else {
                // Add new record via API (or local state for demo)
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === "number" ? parseFloat(value) : value,
        });
    };

    // Custom cell renderer for the irrigation frequency
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

    // Custom cell renderer for the fertilizer usage
    const FertilizerUsageRenderer = (params: any) => {
        const value = params.value;
        const percent = Math.min((value / 40) * 100, 100); // Normalize to 0-100%

        return (
            <div className="flex items-center">
                <span className="mr-2">{value} kg</span>
                <div className="w-16 h-3 bg-emerald-900 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400" style={{ width: `${percent}%` }} />
                </div>
            </div>
        );
    };

    // Custom cell renderer for the water source
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

    // Custom cell renderer for the water usage efficiency
    const WaterUsageEfficiencyRenderer = (params: any) => {
        const value = params.value;
        return (
            <div className="text-sm font-medium">
                {value}%
            </div>
        );
    };

    // Custom cell renderer for the timestamp
    const TimestampRenderer = (params: any) => {
        const date = new Date(params.value);
        return (
            <div className="text-sm">
                <div>{date.toLocaleDateString()}</div>
                <div className="text-emerald-300">{date.toLocaleTimeString()}</div>
            </div>
        );
    };

    // Custom cell renderer for actions
    const ActionRenderer = (params: any) => {
        return (
            <div className="flex space-x-2">
                <button
                    onClick={() => handleEdit(params.data)}
                    className="p-1 text-amber-400 hover:text-amber-300 hover:bg-amber-900/30 rounded"
                >
                    <Edit size={16} />
                </button>
                <button
                    onClick={() => setDeleteConfirmId(params.data.id)}
                    className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        );
    };

    // Define the columns for AG Grid (with new column added)
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

    // Default column definition
    const defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true,
        floatingFilter: true,
        flex: 1,
        minWidth: 100,
    };

    const filterData = data.filter((item) =>
        item.id.toString().includes(searchTerm) ||
        item?.irrigation_frequency.toString().includes(searchTerm) ||
        item?.water_source_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.timestamp.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="bg-gradient-to-br from-emerald-950 to-blue-950 text-emerald-50 p-6 rounded-lg shadow-xl">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-emerald-100 mb-2">
                        Farm Irrigation Dashboard
                    </h2>
                    <p className="text-emerald-200 text-sm">
                        Monitor and analyze your irrigation data
                    </p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg text-white transition-colors"
                >
                    <Plus size={16} className="mr-2" />
                    Add Record
                </button>
            </div>

            <div className="mb-4 flex border-b border-emerald-800">
                <button
                    className={`px-4 py-2 font-medium text-sm ${
                        activeTab === "table"
                            ? "text-emerald-300 border-b-2 border-emerald-400"
                            : "text-emerald-500 hover:text-emerald-300"
                    }`}
                    onClick={() => setActiveTab("table")}
                >
                    Table View
                </button>
                <button
                    className={`px-4 py-2 font-medium text-sm flex items-center ${
                        activeTab === "stats"
                            ? "text-emerald-300 border-b-2 border-emerald-400"
                            : "text-emerald-500 hover:text-emerald-300"
                    }`}
                    onClick={() => setActiveTab("stats")}
                >
                    <BarChart size={16} className="mr-1" />
                    Statistics
                </button>
            </div>

            {activeTab === "table" ? (
                <>
                    {/* Search Box */}
                    <div className="mb-4 relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="h-4 w-4 text-emerald-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search across all columns..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-emerald-900/50 border border-emerald-700 rounded-lg text-emerald-100 placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        {searchTerm && (
                            <button
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-emerald-500 hover:text-emerald-400"
                                onClick={() => setSearchTerm("")}
                            >
                                ×
                            </button>
                        )}
                    </div>

                    {/* AG Grid Component */}
                    <div className="ag-theme-alpine-dark" style={{ height: 600, width: "100%" }}>
                        <AgGridReact
                            modules={[AllCommunityModule]}
                            columnDefs={columnDefs}
                            rowData={filterData}
                            pagination={true}
                            paginationPageSize={20}
                            detailRowAutoHeight={true}
                            defaultColDef={{
                                flex: 1,
                                minWidth: 100,
                                resizable: true,
                            }}
                            rowClass="hover:bg-green-50"
                            onGridReady={onGridReady}
                        />
                    </div>
                </>
            ) : (
                <div className="bg-emerald-900/30 rounded-lg p-6 mt-2">
                    <h3 className="text-lg font-medium text-emerald-100 mb-4">
                        Irrigation Overview
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 p-4 rounded-lg">
                            <p className="text-emerald-300 text-sm mb-1">Average Irrigation</p>
                            <p className="text-2xl font-bold text-white">
                                {data.length > 0
                                    ? (
                                        data.reduce((sum, item) => sum + item.irrigation_frequency, 0) /
                                        data.length
                                    ).toFixed(1)
                                    : "0"}
                                x
                                <span className="text-sm font-normal ml-1 text-emerald-200">
                  daily
                </span>
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-4 rounded-lg">
                            <p className="text-blue-300 text-sm mb-1">Total Fertilizer Used</p>
                            <p className="text-2xl font-bold text-white">
                                {data.reduce((sum, item) => sum + item.fertilizer_usage, 0)}
                                <span className="text-sm font-normal ml-1 text-blue-200">kg</span>
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 p-4 rounded-lg">
                            <p className="text-indigo-300 text-sm mb-1">Water Sources</p>
                            <div className="flex justify-between items-center">
                                {Array.from(new Set(data.map((item) => item.water_source_type))).map(
                                    (source) => (
                                        <div key={source} className="text-center">
                                            <p className="text-lg font-bold text-white">
                                                {data.filter((item) => item.water_source_type === source).length}
                                            </p>
                                            <p className="text-xs text-indigo-200">{source}</p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Record Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-gradient-to-br from-emerald-950 to-blue-950 text-emerald-50 p-6 rounded-lg shadow-xl w-96 max-w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-emerald-100">
                                {isEditing ? "Edit Record" : "Add New Record"}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-emerald-400 hover:text-emerald-300">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-emerald-300 text-sm mb-1">Irrigation Frequency</label>
                                <input
                                    type="number"
                                    name="irrigation_frequency"
                                    value={formData.irrigation_frequency}
                                    onChange={handleInputChange}
                                    min="1"
                                    max="10"
                                    className="w-full bg-emerald-900/50 border border-emerald-700 rounded-lg p-2 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-emerald-300 text-sm mb-1">Fertilizer Usage (kg)</label>
                                <input
                                    type="number"
                                    name="fertilizer_usage"
                                    value={formData.fertilizer_usage}
                                    onChange={handleInputChange}
                                    min="0"
                                    className="w-full bg-emerald-900/50 border border-emerald-700 rounded-lg p-2 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-emerald-300 text-sm mb-1">Water Source</label>
                                <select
                                    name="water_source_type"
                                    value={formData.water_source_type}
                                    onChange={handleInputChange}
                                    className="w-full bg-emerald-900/50 border border-emerald-700 rounded-lg p-2 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="River">River</option>
                                    <option value="Groundwater">Groundwater</option>
                                    <option value="Recycled">Recycled</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-emerald-300 text-sm mb-1">Water Usage Efficiency (%)</label>
                                <input
                                    type="number"
                                    name="water_usage_efficiency"
                                    value={formData.water_usage_efficiency}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="100"
                                    className="w-full bg-emerald-900/50 border border-emerald-700 rounded-lg p-2 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-emerald-300 text-sm mb-1">Date & Time</label>
                                <input
                                    type="datetime-local"
                                    name="timestamp"
                                    value={formData.timestamp.substring(0, 16)}
                                    onChange={handleInputChange}
                                    className="w-full bg-emerald-900/50 border border-emerald-700 rounded-lg p-2 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 border border-emerald-600 text-emerald-400 rounded-lg hover:bg-emerald-900/30"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                            >
                                <Save size={16} className="mr-1" />
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirmId !== null && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-gradient-to-br from-red-950 to-red-900 text-red-50 p-6 rounded-lg shadow-xl w-96 max-w-full">
                        <h3 className="text-xl font-bold text-red-100 mb-4">Confirm Delete</h3>
                        <p className="text-red-200 mb-6">
                            Are you sure you want to delete this record? This action cannot be undone.
                        </p>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-4 py-2 border border-red-600 text-red-400 rounded-lg hover:bg-red-900/30"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirmId)}
                                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                <Trash2 size={16} className="mr-1" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IrrigationDashboard;
