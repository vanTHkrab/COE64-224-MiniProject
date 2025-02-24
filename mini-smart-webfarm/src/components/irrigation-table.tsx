import React, { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, ColumnDef, getFilteredRowModel, ColumnFiltersState } from "@tanstack/react-table";
import { BarChart, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Droplets, Info, Search } from "lucide-react";

interface IrrigationData {
    id: number;
    irrigation_frequency: number;
    fertilizer_usage: number;
    water_source_type: string;
    timestamp: string;
}

const IrrigationDashboard = () => {
    const [data, setData] = useState<IrrigationData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('table');
    const [searchTerm, setSearchTerm] = useState('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    useEffect(() => {
        fetchData();
    }, []);

    // Update column filters when search term changes
    useEffect(() => {
        if (searchTerm) {
            setColumnFilters([
                {
                    id: 'water_source_type',
                    value: searchTerm,
                }
            ]);
        } else {
            setColumnFilters([]);
        }
    }, [searchTerm]);

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

    const columns: ColumnDef<IrrigationData>[] = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ getValue }) => <span className="font-mono">{getValue() as string}</span>
        },
        {
            accessorKey: "irrigation_frequency",
            header: "Irrigation Frequency",
            cell: ({ getValue }) => {
                const value = getValue() as number;
                return (
                    <div className="flex items-center">
                        <span className="mr-2">{value}x daily</span>
                        <div className="flex">
                            {[...Array(value)].map((_, i) => (
                                <Droplets key={i} size={14} className="text-blue-400" />
                            ))}
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: "fertilizer_usage",
            header: "Fertilizer Usage",
            cell: ({ getValue }) => {
                const value = getValue() as number;
                const percent = Math.min(value / 40 * 100, 100); // Normalize to 0-100%

                return (
                    <div className="flex items-center">
                        <span className="mr-2">{value} kg</span>
                        <div className="w-16 h-3 bg-emerald-900 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-emerald-400"
                                style={{ width: `${percent}%` }}
                            />
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: "water_source_type",
            header: "Water Source",
            cell: ({ getValue }) => {
                const value = getValue() as string;
                const getColor = () => {
                    switch(value) {
                        case "Well": return "bg-blue-600";
                        case "Rainwater": return "bg-teal-600";
                        case "Municipal": return "bg-indigo-600";
                        default: return "bg-gray-600";
                    }
                };

                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getColor()}`}>
                        {value}
                    </span>
                );
            }
        },
        {
            accessorKey: "timestamp",
            header: "Timestamp",
            cell: ({ getValue }) => {
                const date = new Date(getValue() as string);
                return (
                    <div className="text-sm">
                        <div>{date.toLocaleDateString()}</div>
                        <div className="text-emerald-300">{date.toLocaleTimeString()}</div>
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        initialState: { pagination: { pageSize: 5 } },
    });

    if (loading) return (
        <div className="flex items-center justify-center h-64 bg-gradient-to-br from-emerald-900 to-blue-900 p-6 rounded-lg shadow-xl">
            <div className="animate-pulse flex space-x-2">
                <div className="h-3 w-3 bg-emerald-300 rounded-full"></div>
                <div className="h-3 w-3 bg-emerald-300 rounded-full"></div>
                <div className="h-3 w-3 bg-emerald-300 rounded-full"></div>
            </div>
            <p className="text-emerald-300 ml-3">Loading irrigation data...</p>
        </div>
    );

    if (error) return (
        <div className="bg-gradient-to-br from-red-900 to-red-800 text-red-50 p-6 rounded-lg shadow-xl">
            <div className="flex items-center">
                <Info className="text-red-300 mr-2" />
                <p className="text-red-300">Error: {error}</p>
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-br from-emerald-950 to-blue-950 text-emerald-50 p-6 rounded-lg shadow-xl">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-emerald-100 mb-2">Farm Irrigation Dashboard</h2>
                <p className="text-emerald-200 text-sm">Monitor and analyze your irrigation data</p>
            </div>

            <div className="mb-4 flex border-b border-emerald-800">
                <button
                    className={`px-4 py-2 font-medium text-sm ${activeTab === 'table' ? 'text-emerald-300 border-b-2 border-emerald-400' : 'text-emerald-500 hover:text-emerald-300'}`}
                    onClick={() => setActiveTab('table')}
                >
                    Table View
                </button>
                <button
                    className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'stats' ? 'text-emerald-300 border-b-2 border-emerald-400' : 'text-emerald-500 hover:text-emerald-300'}`}
                    onClick={() => setActiveTab('stats')}
                >
                    <BarChart size={16} className="mr-1" />
                    Statistics
                </button>
            </div>

            {activeTab === 'table' ? (
                <>
                    {/* Search Box */}
                    <div className="mb-4 relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="h-4 w-4 text-emerald-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search water sources..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-emerald-900/50 border border-emerald-700 rounded-lg text-emerald-100 placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        {searchTerm && (
                            <button
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-emerald-500 hover:text-emerald-400"
                                onClick={() => setSearchTerm('')}
                            >
                                ×
                            </button>
                        )}
                    </div>

                    <div className="rounded-lg overflow-hidden border border-emerald-800">
                        <table className="w-full border-collapse">
                            <thead className="bg-gradient-to-r from-emerald-900 to-blue-900">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th key={header.id} className="border-b border-emerald-700 px-4 py-3 text-emerald-100 font-semibold text-left">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                            </thead>
                            <tbody>
                            {table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map((row, i) => (
                                    <tr
                                        key={row.id}
                                        className={`
                                                hover:bg-emerald-900/30 transition-colors duration-150
                                                ${i % 2 === 0 ? 'bg-emerald-950/50' : 'bg-blue-950/50'}
                                            `}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="border-t border-emerald-800/30 px-4 py-3">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="px-4 py-8 text-center text-emerald-400">
                                        No results found for "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="mt-4 flex justify-between items-center">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                                className="p-1 rounded-full bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 disabled:bg-emerald-900 transition-colors"
                            >
                                <ChevronsLeft size={18} />
                            </button>
                            <button
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="p-1 rounded-full bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 disabled:bg-emerald-900 transition-colors"
                            >
                                <ChevronLeft size={18} />
                            </button>
                        </div>

                        <span className="text-sm text-emerald-300">
                            Page <span className="font-medium">{table.getState().pagination.pageIndex + 1}</span> of{" "}
                            <span className="font-medium">{Math.max(1, table.getPageCount())}</span>
                        </span>

                        <div className="flex space-x-2">
                            <button
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="p-1 rounded-full bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 disabled:bg-emerald-900 transition-colors"
                            >
                                <ChevronRight size={18} />
                            </button>
                            <button
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                                className="p-1 rounded-full bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 disabled:bg-emerald-900 transition-colors"
                            >
                                <ChevronsRight size={18} />
                            </button>
                        </div>

                        <div className="flex items-center">
                            <label className="text-sm text-emerald-300 mr-2">Rows per page:</label>
                            <select
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => table.setPageSize(Number(e.target.value))}
                                className="p-1 border border-emerald-700 rounded bg-emerald-900 text-emerald-100 text-sm"
                            >
                                {[5, 10, 15, 20].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </>
            ) : (
                <div className="bg-emerald-900/30 rounded-lg p-6 mt-2">
                    <h3 className="text-lg font-medium text-emerald-100 mb-4">Irrigation Overview</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 p-4 rounded-lg">
                            <p className="text-emerald-300 text-sm mb-1">Average Irrigation</p>
                            <p className="text-2xl font-bold text-white">
                                {data.length > 0 ? (data.reduce((sum, item) => sum + item.irrigation_frequency, 0) / data.length).toFixed(1) : "0"}x
                                <span className="text-sm font-normal ml-1 text-emerald-200">daily</span>
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
                                {Array.from(new Set(data.map(item => item.water_source_type))).map(source => (
                                    <div key={source} className="text-center">
                                        <p className="text-lg font-bold text-white">
                                            {data.filter(item => item.water_source_type === source).length}
                                        </p>
                                        <p className="text-xs text-indigo-200">{source}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IrrigationDashboard;