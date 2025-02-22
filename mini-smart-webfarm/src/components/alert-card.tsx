import { AlertCircle } from "lucide-react";
import React from "react";

interface AlertCardProps {
    message: string;
    type: "warning" | "error";
}

export const AlertCard: React.FC<AlertCardProps> = ({ message }) => (
    <div className="flex items-center p-4 mb-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
        <span className="text-sm text-yellow-700">{message}</span>
    </div>
);
