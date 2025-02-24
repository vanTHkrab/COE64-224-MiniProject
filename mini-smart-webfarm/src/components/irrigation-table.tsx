"use client";
import React, { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, ColumnDef } from "@tanstack/react-table";

interface IrrigationData {
    id: number;
    irrigation_frequency: number;
    fertilizer_usage: number;
    water_source_type: string;
    timestamp: string;
}

const IrrigationTable = () => {
    const [data, setData] = useState<IrrigationData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
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

    const columns: ColumnDef<IrrigationData>[] = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "irrigation_frequency", header: "Irrigation Frequency" },
        { accessorKey: "fertilizer_usage", header: "Fertilizer Usage" },
        { accessorKey: "water_source_type", header: "Water Source" },
        {
            accessorKey: "timestamp",
            header: "Timestamp",
            cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(),
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 5 } }, // ตั้งค่าหน้าแรกให้มี 5 แถว
    });

    if (loading) return <p className="text-emerald-300">Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="bg-gradient-to-br from-emerald-900 to-blue-900 text-emerald-50 p-6 rounded-lg shadow-xl">
            <table className="w-full border-collapse border border-emerald-700">
                <thead className="bg-gradient-to-r from-emerald-800 to-blue-800">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} className="border border-emerald-600 px-4 py-3 text-emerald-100 font-semibold">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gradient-to-r hover:from-emerald-800/50 hover:to-blue-800/50 transition-colors duration-150">
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="border border-emerald-700/50 px-4 py-2">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                    First
                </button>
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
                <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                    Last
                </button>

                {/* Dropdown สำหรับเลือกจำนวนแถวต่อหน้า */}
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                    className="ml-4 p-1 border border-gray-300 bg-white text-black rounded"
                >
                    {[5, 10, 15, 20].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default IrrigationTable;
