"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TrendingUp, Droplets, Bug, BarChart3, CheckCircle, AlertTriangle } from "lucide-react";

interface MetricsSummaryProps {
    metrics: {
        avgTemperature: number;
        avgSoilMoisture: number;
        avgPestPressure: number;
        avgHumidity: number;

    };
}

const COLORS = {
    primary: "#4CAF50",
    secondary: "#2196F3",
    warning: "#FFC107",
    danger: "#F44336",
};

const MetricsSummary: React.FC<MetricsSummaryProps> = ({ metrics }) => {
    console.log("metrics", metrics);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Temperature */}
            <Card className="shadow-sm bg-white hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Temperature</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">
                                {metrics.avgTemperature.toFixed(1)}°C
                            </h3>
                        </div>
                        <div className="p-2 bg-green-100 rounded-full">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <div
                            className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
                                metrics.avgTemperature > 15 && metrics.avgTemperature < 30
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            {metrics.avgTemperature > 15 && metrics.avgTemperature < 30 ? (
                                <CheckCircle className="h-3 w-3" />
                            ) : (
                                <AlertTriangle className="h-3 w-3" />
                            )}
                            {metrics.avgTemperature > 15 && metrics.avgTemperature < 30 ? "Optimal Range" : "Needs Attention"}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Humidity */}

            <Card className="shadow-sm bg-white hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Humidity</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">
                                {metrics.avgHumidity.toFixed(1)}%
                            </h3>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-full">
                            <Droplets className="h-5 w-5 text-blue-600" />
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <div
                            className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
                                metrics.avgHumidity > 30 && metrics.avgHumidity < 70
                                    ? "bg-green-100 text-green-800"
                                    : "bg-amber-100 text-amber-800"
                            }`}
                        >
                            {metrics.avgHumidity > 30 && metrics.avgHumidity < 70 ? (
                                <CheckCircle className="h-3 w-3" />
                            ) : (
                                <AlertTriangle className="h-3 w-3" />
                            )}
                            {metrics.avgHumidity > 30 && metrics.avgHumidity < 70 ? "Optimal Range" : "Needs Attention"}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Soil Moisture */}
            <Card className="shadow-sm bg-white hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Soil Moisture</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">
                                {metrics.avgSoilMoisture.toFixed(1)}%
                            </h3>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-full">
                            <Droplets className="h-5 w-5 text-blue-600" />
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <div
                            className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
                                metrics.avgSoilMoisture > 35 && metrics.avgSoilMoisture < 75
                                    ? "bg-green-100 text-green-800"
                                    : "bg-amber-100 text-amber-800"
                            }`}
                        >
                            {metrics.avgSoilMoisture > 35 && metrics.avgSoilMoisture < 75 ? (
                                <CheckCircle className="h-3 w-3" />
                            ) : (
                                <AlertTriangle className="h-3 w-3" />
                            )}
                            {metrics.avgSoilMoisture > 35 && metrics.avgSoilMoisture < 75
                                ? "Optimal Range"
                                : "Needs Attention"}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Pest Pressure */}
            <Card className="shadow-sm bg-white hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pest Pressure</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">
                                {metrics.avgPestPressure.toFixed(1)}
                            </h3>
                        </div>
                        <div className="p-2 bg-red-100 rounded-full">
                            <Bug className="h-5 w-5 text-red-600" />
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <div
                            className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
                                metrics.avgPestPressure < 15 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                        >
                            {metrics.avgPestPressure < 15 ? (
                                <CheckCircle className="h-3 w-3" />
                            ) : (
                                <AlertTriangle className="h-3 w-3" />
                            )}
                            {metrics.avgPestPressure < 15 ? "Low Risk" : "High Risk"}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Projected Yield */}
            {/*<Card className="shadow-sm bg-white hover:shadow-md transition-shadow">*/}
            {/*    <CardContent className="p-4">*/}
            {/*        <div className="flex justify-between items-start">*/}
            {/*            <div>*/}
            {/*                <p className="text-sm font-medium text-gray-500">Projected Yield</p>*/}
            {/*                <h3 className="text-2xl font-bold text-gray-900 mt-1">*/}
            {/*                    {metrics.projectedYield}%*/}
            {/*                </h3>*/}
            {/*            </div>*/}
            {/*            <div className="p-2 bg-amber-100 rounded-full">*/}
            {/*                <BarChart3 className="h-5 w-5 text-amber-600" />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="flex items-center mt-4">*/}
            {/*            <div className="relative w-full h-2 bg-gray-200 rounded overflow-hidden">*/}
            {/*                <div*/}
            {/*                    className={`absolute top-0 left-0 h-full ${*/}
            {/*                        metrics.projectedYield > 80*/}
            {/*                            ? "bg-green-500"*/}
            {/*                            : metrics.projectedYield > 60*/}
            {/*                                ? "bg-amber-500"*/}
            {/*                                : "bg-red-500"*/}
            {/*                    }`}*/}
            {/*                    style={{ width: `${metrics.projectedYield}%` }}*/}
            {/*                ></div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}
        </div>
    );
};

export default MetricsSummary;
