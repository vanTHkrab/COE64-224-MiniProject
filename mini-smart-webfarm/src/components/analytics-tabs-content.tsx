"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Sprout, Cloud, Droplets, Bug, BarChart2 } from "lucide-react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface AnalyticsTabsContentProps {
    analyticsData: any;
    loading: boolean;
    dates: string[];
    formatDate: (dateString: string) => string;
}

const COLORS = {
    primary: "#4CAF50",
    secondary: "#2196F3",
    warning: "#FFC107",
    danger: "#F44336",
    info: "#00BCD4",
    success: "#8BC34A",
    neutral: "#9E9E9E",
};

const AnalyticsTabsContent: React.FC<AnalyticsTabsContentProps> = ({
                                                                       analyticsData,
                                                                       loading,
                                                                       dates,
                                                                       formatDate,
                                                                   }) => {
    return (
        <Tabs defaultValue="growth" className="mb-6">
            <div className="flex justify-between items-center mb-4">
                <TabsList>
                    <TabsTrigger value="growth" className="flex items-center gap-1">
                        <Sprout className="h-4 w-4" />
                        <span>Growth</span>
                    </TabsTrigger>
                    <TabsTrigger value="environmental" className="flex items-center gap-1">
                        <Cloud className="h-4 w-4" />
                        <span>Environmental</span>
                    </TabsTrigger>
                    <TabsTrigger value="soil" className="flex items-center gap-1">
                        <Droplets className="h-4 w-4" />
                        <span>Soil Health</span>
                    </TabsTrigger>
                    <TabsTrigger value="pests" className="flex items-center gap-1">
                        <Bug className="h-4 w-4" />
                        <span>Pest Management</span>
                    </TabsTrigger>
                    <TabsTrigger value="yield" className="flex items-center gap-1">
                        <BarChart2 className="h-4 w-4" />
                        <span>Yield Analysis</span>
                    </TabsTrigger>
                </TabsList>
                <Button variant="outline" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                </Button>
            </div>
            {loading ? (
                <Card className="shadow-sm">
                    <CardContent className="p-12 flex flex-col items-center justify-center">
                        <div className="animate-spin text-green-600 mb-4">Loading...</div>
                    </CardContent>
                </Card>
            ) : (
                <>
                    <TabsContent value="growth" className="mt-0">
                        {/* Example: Growth Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="shadow-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Plant Growth Progression</CardTitle>
                                    <CardDescription>Height measured in centimeters over time</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={analyticsData.growthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" tickFormatter={formatDate} />
                                                <YAxis label={{ value: "Height (cm)", angle: -90, position: "insideLeft" }} />
                                                <Tooltip formatter={(value) => [`${value} cm`, "Height"]} labelFormatter={formatDate} />
                                                <Legend />
                                                <Line type="monotone" dataKey="height" stroke={COLORS.primary} strokeWidth={2} activeDot={{ r: 8 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                            {/* Add additional charts for growth as needed */}
                        </div>
                    </TabsContent>
                    {/* Repeat similar structure for environmental, soil, pests, and yield tabs */}
                </>
            )}
        </Tabs>
    );
};

export default AnalyticsTabsContent;
