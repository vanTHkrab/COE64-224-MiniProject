import React from 'react';

interface ActionsRendererProps {
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    data?: any | null;
}

export default function ActionsRenderer(props: ActionsRendererProps) {
    const { onEdit, onDelete, data } = props;

    const rowId = data?.id;

    return (
        <div className="flex gap-2">
            <button
                onClick={() => onEdit(rowId)}
                className="px-2 py-1 bg-blue-500 text-white rounded"
            >
                Edit
            </button>
            <button
                onClick={() => onDelete(rowId)}
                className="px-2 py-1 bg-red-500 text-white rounded"
            >
                Delete
            </button>
        </div>
    );
}
