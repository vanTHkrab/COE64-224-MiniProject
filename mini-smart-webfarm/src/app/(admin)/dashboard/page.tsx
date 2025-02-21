"use client"
import React, { useState, useEffect } from 'react';
import { SensorCard } from "@/components/sensor-card";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { ResponsiveChart } from "@/components/responside-chart";
import { Bell, ThermometerSun, Droplet, Wind } from 'lucide-react';

interface SensorData {
    id: number;
    temperature: number;
    humidity: number;
    soil_moisture: number;
    timestamp: string;
}

interface ChartData {
    time: string;
    temperature: number;
    humidity: number;
    soilMoisture: number;
}

const SmartFarmDashboard: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sensorData, setSensorData] = useState<SensorData[]>([]);
    const [chartData, setChartData] = useState<ChartData[]>([]); // ✅ ใช้ state แยกสำหรับ chart

    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/sensor');
                const data: SensorData[] = await response.json();

                setSensorData(data);

                const formattedData: ChartData[] = data.map(entry => ({
                    time: new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    temperature: entry.temperature,
                    humidity: entry.humidity,
                    soilMoisture: entry.soil_moisture,
                }));

                setChartData(formattedData);
            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        };

        fetchSensorData().then();
    }, []);

    return (
        <div>
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 p-6 overflow-auto">
                <div className="max-w-[1920px] mx-auto p-3 sm:p-4 md:p-6">
                    <div className="grid gap-4 sm:gap-6">
                        {/* Alert Section */}
                        <div className="flex items-center p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <Bell className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-yellow-700">
                                {sensorData.length > 0 && sensorData[0].soil_moisture < 30
                                    ? "Low soil moisture detected in Zone A - Consider adjusting irrigation schedule"
                                    : "All sensor readings are within normal ranges."}
                            </span>
                        </div>

                        {/* Sensor Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <SensorCard
                                icon={ThermometerSun}
                                title="Temperature"
                                value={sensorData.length > 0 ? sensorData[0].temperature.toFixed(1) : "N/A"}
                                unit="°C"
                            />
                            <SensorCard
                                icon={Droplet}
                                title="Humidity"
                                value={sensorData.length > 0 ? sensorData[0].humidity.toFixed(1) : "N/A"}
                                unit="%"
                            />
                            <SensorCard
                                icon={Wind}
                                title="Soil Moisture"
                                value={sensorData.length > 0 ? sensorData[0].soil_moisture.toFixed(1) : "N/A"}
                                unit="%"
                            />
                        </div>

                        {/* Chart Section */}
                        <div className="overflow-hidden bg-white rounded-lg shadow">
                            <div className="p-4 sm:p-6">
                                <h2 className="text-lg sm:text-xl font-semibold">Sensor Readings (24h)</h2>
                            </div>
                            <div className="p-4 sm:p-6">
                                {chartData.length > 0 ? (
                                    <ResponsiveChart data={chartData} />
                                ) : (
                                    <p className="text-center text-gray-500">Loading data...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SmartFarmDashboard;
