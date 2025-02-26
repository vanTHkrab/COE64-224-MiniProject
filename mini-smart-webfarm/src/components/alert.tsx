"use client";
import React from "react";

interface AlertProps {
    message: string;
    type?: "success" | "error" | "warning" | "info";
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type = "info", onClose }) => {
    const alertStyles = {
        success: "bg-green-600 text-white",
        error: "bg-red-600 text-white",
        warning: "bg-yellow-600 text-white",
        info: "bg-blue-600 text-white",
    };

    return (
        <div className={`fixed bottom-5 right-5 p-4 rounded-lg shadow-lg ${alertStyles[type]} flex items-center`}>
            <span>{message}</span>
            <button onClick={onClose} className="ml-3 text-white font-bold px-2">
                ✖
            </button>
        </div>
    );
};

export default Alert;
