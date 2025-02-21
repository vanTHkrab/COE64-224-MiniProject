import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import React from "react";

interface ChartData {
    time: string;
    temperature: number;
    humidity: number;
    soilMoisture: number;
}

interface ResponsiveChartProps {
    data: ChartData[];
}

export const ResponsiveChart: React.FC<ResponsiveChartProps> = ({ data }) => {
    return (
        <div className="w-full h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
                    <Line type="monotone" dataKey="humidity" stroke="#387908" />
                    <Line type="monotone" dataKey="soilMoisture" stroke="#2196F3" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
