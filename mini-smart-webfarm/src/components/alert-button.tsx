import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AlertButton: React.FC = () => {
    const [showAlerts, setShowAlerts] = useState(false);
    const [notifications, setNotifications] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleAlerts = () => setShowAlerts(!showAlerts);

    // ปิด dropdown เมื่อคลิกนอกพื้นที่
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowAlerts(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ดึงข้อมูล sensor alerts เมื่อ component mount
    useEffect(() => {
        const fetchSensorAlerts = async () => {
            try {
                const response = await fetch("/api/alerts");
                if (!response.ok) {
                    throw new Error("Failed to fetch sensor alerts");
                }
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error("Error fetching sensor alerts:", error);
            }
        };

        fetchSensorAlerts().then();
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                variant="ghost"
                size="icon"
                className="hover:bg-green-100 relative rounded-lg border-2 border-green-700 p-2"
                onClick={toggleAlerts}
            >
                <Bell className="h-5 w-5 text-green-800" />
                {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 h-3 w-3 bg-yellow-500 rounded-full border border-green-800"></span>
                )}
            </Button>
            {showAlerts && (
                <div className="absolute right-0 mt-2 w-64 bg-green-50 border-2 border-green-700 rounded-lg shadow-lg z-50">
                    <div className="bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-t-md">
                        Daily Sensor Alerts
                    </div>
                    <ul className="py-1">
                        {notifications.length > 0 ? (
                            notifications.map((note, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 text-sm text-green-900 hover:bg-green-100 border-b border-green-200 last:border-b-0"
                                >
                                    {note}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-sm text-green-900">
                                Sensor readings are normal
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AlertButton;
