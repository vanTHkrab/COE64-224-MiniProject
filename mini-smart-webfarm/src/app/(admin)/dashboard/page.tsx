"use client"
import React, { useState, useEffect } from 'react';
import { SensorCard } from "@/components/sensor-card";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { ResponsiveChart } from "@/components/responside-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, ThermometerSun, Droplet, Wind, Thermometer } from 'lucide-react';

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
    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                const response = await fetch('/api/sensor');
                const data: SensorData[] = await response.json();

                setSensorData(data);

                const formattedData: ChartData[] = data.map(entry => ({
                    time: new Date(entry.timestamp).toDateString(),
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
        const interval = setInterval(fetchSensorData, 300000); // Update every 5 minutes
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-amber-100">
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 p-6 overflow-auto">
                <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
                    <Card className="shadow-lg bg-white rounded-lg border border-green-200 mb-6">
                        <CardHeader className="bg-green-600 text-white py-4 rounded-t-lg">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                    <CardTitle className="text-2xl font-bold">Smart Farm Dashboard</CardTitle>
                                    <p className="text-green-100 mt-1">
                                        Real-time sensor readings from your farm
                                    </p>
                                </div>
                                <div className="flex items-center mt-4 md:mt-0 bg-white/10 rounded-lg p-4">
                                    <p className="text-sm text-green-100">
                                        Last updated: {sensorData.length > 0 ? new Date(sensorData[0].timestamp).toLocaleTimeString() : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6">
                            {/* Alert Section */}
                            {sensorData.length > 0 && sensorData[0].soil_moisture < 30 && (
                                <div className="flex items-center p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
                                    <Bell className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0" />
                                    <span className="text-sm text-yellow-700">
                                        Low soil moisture detected in Zone A - Consider adjusting irrigation schedule
                                    </span>
                                </div>
                            )}

                            {/* Sensor Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <Card className="shadow-md hover:shadow-lg transition-shadow border border-green-200">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-lg font-semibold text-green-800">Temperature</CardTitle>
                                        <Thermometer className="h-6 w-6 text-red-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mt-2 flex items-baseline">
                                            <div className="text-4xl font-bold text-green-900">
                                                {sensorData.length > 0 ? sensorData[0].temperature.toFixed(1) : "N/A"}
                                            </div>
                                            <div className="ml-1 text-xl text-green-600">°C</div>
                                        </div>
                                        <p className="mt-2 text-sm text-green-600">Current temperature</p>
                                    </CardContent>
                                </Card>

                                <Card className="shadow-md hover:shadow-lg transition-shadow border border-green-200">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-lg font-semibold text-green-800">Humidity</CardTitle>
                                        <Droplet className="h-6 w-6 text-blue-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mt-2 flex items-baseline">
                                            <div className="text-4xl font-bold text-green-900">
                                                {sensorData.length > 0 ? sensorData[0].humidity.toFixed(1) : "N/A"}
                                            </div>
                                            <div className="ml-1 text-xl text-green-600">%</div>
                                        </div>
                                        <p className="mt-2 text-sm text-green-600">Relative humidity</p>
                                    </CardContent>
                                </Card>

                                <Card className="shadow-md hover:shadow-lg transition-shadow border border-green-200">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-lg font-semibold text-green-800">Soil Moisture</CardTitle>
                                        <Wind className="h-6 w-6 text-teal-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mt-2 flex items-baseline">
                                            <div className="text-4xl font-bold text-green-900">
                                                {sensorData.length > 0 ? sensorData[0].soil_moisture.toFixed(1) : "N/A"}
                                            </div>
                                            <div className="ml-1 text-xl text-green-600">%</div>
                                        </div>
                                        <p className="mt-2 text-sm text-green-600">Current soil moisture</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Chart Section */}
                            <Card className="shadow-md border border-green-200">
                                <CardHeader className="border-b border-green-100 bg-green-50">
                                    <CardTitle className="text-lg font-semibold text-green-800">Sensor Readings History</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-6">
                                    {chartData.length > 0 ? (
                                        <ResponsiveChart data={
                                            chartData.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
                                        } />
                                    ) : (
                                        <div className="flex justify-center items-center h-64">
                                            <p className="text-center text-gray-500">Loading data...</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default SmartFarmDashboard;