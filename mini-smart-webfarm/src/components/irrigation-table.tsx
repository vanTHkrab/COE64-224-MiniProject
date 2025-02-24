"use client";
import React, { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";

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
    const [editRowId, setEditRowId] = useState<number | null>(null);
    const [editValues, setEditValues] = useState<Partial<IrrigationData>>({});

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

    const handleEditClick = (row: IrrigationData) => {
        setEditRowId(row.id);
        setEditValues({ ...row });
    };

    const handleCancelEdit = () => {
        setEditRowId(null);
        setEditValues({});
    };

    const handleSaveEdit = async (id: number) => {
        try {
            const response = await fetch(`/api/irrigation/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editValues),
            });

            if (!response.ok) {
                throw new Error("Failed to update data");
            }

            setData(data.map(item => (item.id === id ? { ...item, ...editValues } : item)));
            setEditRowId(null);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/irrigation/${id}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error("Failed to delete data");
            }
            setData(data.filter(item => item.id !== id));
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const columns: ColumnDef<IrrigationData>[] = [
        { accessorKey: "id", header: "ID" },
        {
            accessorKey: "irrigation_frequency",
            header: "Irrigation Frequency",
            cell: ({ row }) =>
                editRowId === row.original.id ? (
                    <input
                        type="number"
                        className="w-full px-2 py-1 border rounded text-black"
                        value={editValues.irrigation_frequency || ""}
                        onChange={(e) => setEditValues({ ...editValues, irrigation_frequency: Number(e.target.value) })}
                    />
                ) : (
                    row.original.irrigation_frequency
                ),
        },
        {
            accessorKey: "fertilizer_usage",
            header: "Fertilizer Usage",
            cell: ({ row }) =>
                editRowId === row.original.id ? (
                    <input
                        type="number"
                        className="w-full px-2 py-1 border rounded text-black"
                        value={editValues.fertilizer_usage || ""}
                        onChange={(e) => setEditValues({ ...editValues, fertilizer_usage: Number(e.target.value) })}
                    />
                ) : (
                    Number(row.original.fertilizer_usage).toFixed(2)
                ),
        },
        {
            accessorKey: "water_source_type",
            header: "Water Source",
            cell: ({ row }) =>
                editRowId === row.original.id ? (
                    <input
                        type="text"
                        className="w-full px-2 py-1 border rounded text-black"
                        value={editValues.water_source_type || ""}
                        onChange={(e) => setEditValues({ ...editValues, water_source_type: e.target.value })}
                    />
                ) : (
                    row.original.water_source_type
                ),
        },
        {
            accessorKey: "timestamp",
            header: "Timestamp",
            cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    {editRowId === row.original.id ? (
                        <>
                            <button
                                onClick={() => handleSaveEdit(row.original.id)}
                                className="bg-green-500 text-white px-3 py-1 rounded"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="bg-gray-500 text-white px-3 py-1 rounded"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => handleEditClick(row.original)}
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(row.original.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
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
                            <th
                                key={header.id}
                                className="border border-emerald-600 px-4 py-3 text-emerald-100 font-semibold"
                            >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr
                        key={row.id}
                        className="hover:bg-gradient-to-r hover:from-emerald-800/50 hover:to-blue-800/50 transition-colors duration-150"
                    >
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="border border-emerald-700/50 px-4 py-2">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default IrrigationTable;
