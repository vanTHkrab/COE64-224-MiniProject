"use client";
import React, { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "@/components/date-range-picker";
import {
  BarChart3,
  BarChart2,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Leaf,
  Droplets,
  Thermometer,
  Sun,
  CloudRain,
  Wind,
  Bug,
  Download,
  RefreshCw,
  Filter,
  Calendar,
  MapPin,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Sprout,
  Cloud,
} from "lucide-react";

const AnalyticsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState("30days");
  const [selectedCrop, setSelectedCrop] = useState("all");
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  const [analyticsData, setAnalyticsData] = useState({
    growthData: [],
    weatherData: [],
    soilData: [],
    yieldData: [],
    pestData: [],
    projections: [],
  });

    const [cropTypes, setCropTypes] = useState([]);
    const [plantationAreas, setPlantationAreas] = useState([]);

    useEffect(() => {
        const fetchAreas = async () => {
            const areas = await fetchPlantationAreas();
            setPlantationAreas(areas);
            const fetchAnalyticsData = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`/api/analytics?timeRange=${selectedTimeRange}`);
                    if (!response.ok) throw new Error("Failed to fetch analytics data");

                    const data = await response.json();

                    setAnalyticsData({
                        ...analyticsData,
                        soilData: data.soilData,
                        pestData: data.pestData,
                    });

                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching analytics data:", error);
                    setLoading(false);
                }

        };

        fetchAreas();
        fetchAnalyticsData();

        fetchCropTypes();
    }, [selectedTimeRange]);

    const fetchPlantationAreas = async () => {
        try {
            const response = await fetch("/api/plantation-areas");

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            return data.map(area => ({
                name: area.plantation_area,  // Match with Prisma field
                soil: area.soil_type
            }));
        } catch (error) {
            console.error("Error fetching plantation areas:", error);
            return [];
        }
    };


    const fetchCropTypes = async () => {
        try {
            const response = await fetch("/api/crop-types");
            if (!response.ok) throw new Error(`Error: ${response.status}`);

            const data = await response.json();

            // Convert string array to objects & remove duplicates
            const uniqueCrops = Array.from(new Set(data.map(item => item.plant)))
                .map((crop, index) => ({ id: index, name: crop }));

            setCropTypes(uniqueCrops);
        } catch (error) {
            console.error("Error fetching crop types:", error);
        }
    };







    const generateDateRange = () => {
    const dates = [];
    let startDate;
    if (selectedTimeRange === "7days") {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
    } else if (selectedTimeRange === "30days") {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
    } else if (selectedTimeRange === "90days") {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 90);
    } else if (selectedTimeRange === "custom") {
      startDate = new Date(dateRange.from);
    }
    const endDate =
      selectedTimeRange === "custom" ? new Date(dateRange.to) : new Date();
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      dates.push(new Date(d).toISOString().split("T")[0]);
    }
    return dates;
  };

  const dates = generateDateRange();

    const pestData = dates.map((date, index) => ({
        date,
        aphids: parseFloat((Math.random() * 10).toFixed(1)),
        whiteflies: parseFloat((Math.random() * 8).toFixed(1)),
        fungal: parseFloat((Math.random() * 5).toFixed(1)),
        weeds: parseFloat((5 + Math.random() * 10).toFixed(1)),
        totalPressure: parseFloat(
            (
                Math.random() * 10 +
                Math.random() * 8 +
                Math.random() * 5 +
                (5 + Math.random() * 10)
            ).toFixed(1)
        ),
    }));


        const calculateMetrics = () => {
            const metrics = {
                avgSoilMoisture: 0,
                avgPestPressure: 0,
                avgGrowthRate: 0,
                avgTemperature: 0,
                totalRainfall: 0,
                projectedYield: 0,
                alertCount: 0,
            };

            if (analyticsData.soilData.length > 0) {
                const totalMoisture = analyticsData.soilData.reduce((sum, entry) => sum + entry.soilMoisture, 0);
                metrics.avgSoilMoisture = totalMoisture / analyticsData.soilData.length;
            }

            if (analyticsData.pestData.length > 0) {
                const totalPestPressure = analyticsData.pestData.reduce((sum, entry) => sum + entry.pestPressure, 0);
                metrics.avgPestPressure = totalPestPressure / analyticsData.pestData.length;
            }

            if (analyticsData.growthData.length > 0) {
                const growthRates = analyticsData.growthData.map((entry, index, arr) =>
                    index > 0 ? entry.height - arr[index - 1].height : 0
                ).filter(rate => rate !== 0);

                metrics.avgGrowthRate =
                    growthRates.length > 0
                        ? growthRates.reduce((sum, rate) => sum + rate, 0) / growthRates.length
                        : 0;
            }

            if (analyticsData.weatherData.length > 0) {
                metrics.avgTemperature =
                    analyticsData.weatherData.reduce(
                        (sum, entry) => sum + entry.temperature,
                        0
                    ) / analyticsData.weatherData.length;
                metrics.totalRainfall = analyticsData.weatherData.reduce(
                    (sum, entry) => sum + entry.rainfall,
                    0
                );
            }

            if (analyticsData.yieldData.length > 0) {
                metrics.projectedYield =
                    analyticsData.yieldData.find(
                        (entry) => entry.name === "Current Projection"
                    )?.value || 0;
            }

            if (metrics.avgSoilMoisture < 35 || metrics.avgSoilMoisture > 75) metrics.alertCount++;
            if (metrics.avgTemperature < 15 || metrics.avgTemperature > 30) metrics.alertCount++;
            if (metrics.avgPestPressure > 20) metrics.alertCount++;
            if (metrics.avgGrowthRate < 0.3) metrics.alertCount++;

            return metrics; // ✅ Corrected return statement, removed extra semicolon
        };

// ✅ Call this function once to store the computed metrics
        const metrics = calculateMetrics();




        if (analyticsData.growthData.length > 0) {
            const growthRates = analyticsData.growthData.map((entry, index, arr) =>
                index > 0 ? entry.height - arr[index - 1].height : 0
            ).filter(rate => rate !== 0);

            metrics.avgGrowthRate =
                growthRates.length > 0
                    ? growthRates.reduce((sum, rate) => sum + rate, 0) / growthRates.length
                    : 0;
        }

        if (analyticsData.soilData.length > 0) {
            metrics.avgSoilMoisture =
                analyticsData.soilData.reduce((sum, entry) => sum + entry.moisture, 0) /
                analyticsData.soilData.length;
        }

        if (analyticsData.weatherData.length > 0) {
            metrics.avgTemperature =
                analyticsData.weatherData.reduce(
                    (sum, entry) => sum + entry.temperature,
                    0
                ) / analyticsData.weatherData.length;
            metrics.totalRainfall = analyticsData.weatherData.reduce(
                (sum, entry) => sum + entry.rainfall,
                0
            );
        }

        if (analyticsData.pestData.length > 0) {
            metrics.avgPestPressure =
                analyticsData.pestData.reduce(
                    (sum, entry) => sum + entry.totalPressure,
                    0
                ) / analyticsData.pestData.length;
        }

        if (analyticsData.yieldData.length > 0) {
            metrics.projectedYield =
                analyticsData.yieldData.find(
                    (entry) => entry.name === "Current Projection"
                )?.value || 0;
        }

        if (metrics.avgSoilMoisture < 35 || metrics.avgSoilMoisture > 75)
            metrics.alertCount++;
        if (metrics.avgTemperature < 15 || metrics.avgTemperature > 30)
            metrics.alertCount++;
        if (metrics.avgPestPressure > 20) metrics.alertCount++;
        if (metrics.avgGrowthRate < 0.3) metrics.alertCount++;

        return metrics;
    };


    const metrics = calculateMetrics();

// Helper for date formatting
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

// Color constants for charts
    const COLORS = {
        primary: "#4CAF50",
        secondary: "#2196F3",
        warning: "#FFC107",
        danger: "#F44336",
        info: "#00BCD4",
        success: "#8BC34A",
        neutral: "#9E9E9E",
    };



    return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-amber-50">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 p-6 overflow-auto">
        {/* Top Analytics Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <Card className="shadow-sm">
                <CardContent className="p-4 flex items-center gap-4">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                        <Label htmlFor="area-select" className="text-sm font-medium">
                            Plantation Area
                        </Label>
                        <Select value={selectedArea} onValueChange={setSelectedArea}>
                            <SelectTrigger id="area-select" className="mt-1">
                                <SelectValue placeholder="Select area" />
                            </SelectTrigger>
                            <SelectContent>
                                {plantationAreas.length > 0 ? (
                                    plantationAreas.map((area) => (
                                        <SelectItem key={area.id || area.name} value={area.name}>
                                            {area.name}
                                        </SelectItem>


                                    ))
                                ) : (
                                    <SelectItem key="no-area" value="no-area" disabled>
                                        No areas available
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>




            <Card className="shadow-sm">
                <CardContent className="p-4 flex items-center gap-4">
                    <Sprout className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                        <Label htmlFor="crop-select" className="text-sm font-medium">
                            Crop Type
                        </Label>
                        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                            <SelectTrigger id="crop-select" className="mt-1">
                                <SelectValue placeholder="Select crop" />
                            </SelectTrigger>
                            <SelectContent>
                                {cropTypes.length > 0 ? (
                                    cropTypes.map((crop) => (
                                        <SelectItem key={crop.id} value={crop.name}>
                                            {crop.name}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem key="no-crop" value="no-crop" disabled>
                                        No crops available
                                    </SelectItem>
                                )}
                            </SelectContent>

                        </Select>
                    </div>
                </CardContent>
            </Card>





            <Card className="shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <Calendar className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <Label htmlFor="time-select" className="text-sm font-medium">
                  Time Range
                </Label>
                <Select
                  value={selectedTimeRange}
                  onValueChange={setSelectedTimeRange}
                >
                  <SelectTrigger id="time-select" className="mt-1">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="90days">Last 90 Days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Growth Rate
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {metrics.avgGrowthRate.toFixed(2)} cm/day
                  </h3>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div
                  className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
                    metrics.avgGrowthRate > 0.5
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {metrics.avgGrowthRate > 0.5 ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <AlertTriangle className="h-3 w-3" />
                  )}
                  {metrics.avgGrowthRate > 0.5 ? "Normal" : "Below Average"}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                  <div>
                      <p className="text-sm font-medium text-gray-500">
                          Soil Moisture
                      </p>
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
                  {metrics.avgSoilMoisture > 35 &&
                  metrics.avgSoilMoisture < 75 ? (
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

          <Card className="shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                  <div>
                      <p className="text-sm font-medium text-gray-500">
                          Pest Pressure
                      </p>
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
                    metrics.avgPestPressure < 15
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
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

          <Card className="shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Projected Yield
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {metrics.projectedYield}%
                  </h3>
                </div>
                <div className="p-2 bg-amber-100 rounded-full">
                  <BarChart3 className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className="relative w-full h-2 bg-gray-200 rounded overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full ${
                      metrics.projectedYield > 80
                        ? "bg-green-500"
                        : metrics.projectedYield > 60
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${metrics.projectedYield}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics Tabs */}
        <Tabs defaultValue="growth" className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="growth" className="flex items-center gap-1">
                <Sprout className="h-4 w-4" />
                <span>Growth</span>
              </TabsTrigger>
              <TabsTrigger
                value="environmental"
                className="flex items-center gap-1"
              >
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
                <RefreshCw className="h-8 w-8 animate-spin text-green-600 mb-4" />
                <p className="text-gray-500">Loading analytics data...</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <TabsContent value="growth" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Plant Growth Progression
                      </CardTitle>
                      <CardDescription>
                        Height measured in centimeters over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={analyticsData.growthData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="date"
                              tickFormatter={formatDate}
                              interval={Math.ceil(
                                analyticsData.growthData.length / 7
                              )}
                            />
                            <YAxis
                              label={{
                                value: "Height (cm)",
                                angle: -90,
                                position: "insideLeft",
                              }}
                            />
                            <Tooltip
                              formatter={(value) => [`${value} cm`, "Height"]}
                              labelFormatter={formatDate}
                            />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="height"
                              stroke={COLORS.primary}
                              strokeWidth={2}
                              activeDot={{ r: 8 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Plant Health Index
                      </CardTitle>
                      <CardDescription>
                        Health score 0-100 based on multiple factors
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={analyticsData.growthData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="date"
                              tickFormatter={formatDate}
                              interval={Math.ceil(
                                analyticsData.growthData.length / 7
                              )}
                            />
                            <YAxis domain={[0, 100]} />
                            <Tooltip
                              formatter={(value) => [
                                `${value}`,
                                "Health Score",
                              ]}
                              labelFormatter={formatDate}
                            />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="healthIndex"
                              stroke={COLORS.success}
                              fill={COLORS.success}
                              fillOpacity={0.3}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm lg:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Growth Stage Timeline
                      </CardTitle>
                      <CardDescription>
                        Progression through growth stages with key milestones
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative pt-2 pb-12">
                        <div className="absolute left-0 right-0 h-1 bg-gray-200 top-6"></div>
                        <div className="flex justify-between relative z-10">
                          {[
                            "Seedling",
                            "Vegetative",
                            "Flowering",
                            "Fruiting",
                            "Maturity",
                          ].map((stage, index) => {
                            const isCurrentStage =
                              analyticsData.growthData.length > 0 &&
                              analyticsData.growthData[
                                analyticsData.growthData.length - 1
                              ].stage === stage;
                            const isPastStage =
                              analyticsData.growthData.length > 0 &&
                              [
                                "Seedling",
                                "Vegetative",
                                "Flowering",
                                "Fruiting",
                                "Maturity",
                              ].indexOf(
                                analyticsData.growthData[
                                  analyticsData.growthData.length - 1
                                ].stage
                              ) >= index;

                            return (
                              <div
                                key={stage}
                                className="flex flex-col items-center w-32"
                              >
                                <div
                                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                    isCurrentStage
                                      ? "bg-green-600 text-white"
                                      : isPastStage
                                      ? "bg-green-200 text-green-800"
                                      : "bg-gray-200 text-gray-500"
                                  }`}
                                >
                                  {index + 1}
                                </div>
                                <p
                                  className={`mt-2 text-sm font-medium ${
                                    isCurrentStage
                                      ? "text-green-600"
                                      : isCurrentStage
                                      ? "text-green-600"
                                      : isPastStage
                                      ? "text-green-700"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {stage}
                                </p>
                                <div className="mt-4 text-xs text-gray-500">
                                  {isCurrentStage && (
                                    <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                      Current Stage
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="environmental" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Temperature Trends
                      </CardTitle>
                      <CardDescription>
                        Daily average temperature in °C
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={analyticsData.weatherData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="date"
                              tickFormatter={formatDate}
                              interval={Math.ceil(
                                analyticsData.weatherData.length / 7
                              )}
                            />
                            <YAxis />
                            <Tooltip
                              formatter={(value) => [
                                `${value}°C`,
                                "Temperature",
                              ]}
                              labelFormatter={formatDate}
                            />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="temperature"
                              stroke={COLORS.danger}
                              activeDot={{ r: 8 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Precipitation Data
                      </CardTitle>
                      <CardDescription>
                        Daily rainfall in millimeters
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={analyticsData.weatherData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="date"
                              tickFormatter={formatDate}
                              interval={Math.ceil(
                                analyticsData.weatherData.length / 7
                              )}
                            />
                            <YAxis />
                            <Tooltip
                              formatter={(value) => [`${value} mm`, "Rainfall"]}
                              labelFormatter={formatDate}
                            />
                            <Legend />
                            <Bar dataKey="rainfall" fill={COLORS.secondary} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Humidity Levels</CardTitle>
                      <CardDescription>
                        Daily average humidity percentage
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={analyticsData.weatherData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="date"
                              tickFormatter={formatDate}
                              interval={Math.ceil(
                                analyticsData.weatherData.length / 7
                              )}
                            />
                            <YAxis domain={[0, 100]} />
                            <Tooltip
                              formatter={(value) => [`${value}%`, "Humidity"]}
                              labelFormatter={formatDate}
                            />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="humidity"
                              stroke={COLORS.info}
                              fill={COLORS.info}
                              fillOpacity={0.3}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Sunlight Exposure
                      </CardTitle>
                      <CardDescription>Daily sunlight hours</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={analyticsData.weatherData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="date"
                              tickFormatter={formatDate}
                              interval={Math.ceil(
                                analyticsData.weatherData.length / 7
                              )}
                            />
                            <YAxis domain={[0, 12]} />
                            <Tooltip
                              formatter={(value) => [
                                `${value} hours`,
                                "Sunlight",
                              ]}
                              labelFormatter={formatDate}
                            />
                            <Legend />
                            <Bar dataKey="sunlight" fill={COLORS.warning} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="soil" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Soil Moisture</CardTitle>
                      <CardDescription>
                        Percentage of water content in soil
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={analyticsData.soilData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="date"
                              tickFormatter={formatDate}
                              interval={Math.ceil(
                                analyticsData.soilData.length / 7
                              )}
                            />
                            <YAxis domain={[0, 100]} />
                            <Tooltip
                              formatter={(value) => [`${value}%`, "Moisture"]}
                              labelFormatter={formatDate}
                            />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="moisture"
                              stroke={COLORS.secondary}
                              fill={COLORS.secondary}
                              fillOpacity={0.3}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Soil pH Levels</CardTitle>
                      <CardDescription>
                        Daily pH readings (ideal range: 6.0-7.0)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={analyticsData.soilData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="date"
                              tickFormatter={formatDate}
                              interval={Math.ceil(
                                analyticsData.soilData.length / 7
                              )}
                            />
                            <YAxis domain={[5, 8]} />
                            <Tooltip
                              formatter={(value) => [`${value}`, "pH"]}
                              labelFormatter={formatDate}
                            />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="pH"
                              stroke={COLORS.primary}
                            />
                            <Line
                              type="monotone"
                              dataKey="pH"
                              stroke={COLORS.primary}
                              activeDot={{ r: 8 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm lg:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Nutrient Composition
                      </CardTitle>
                      <CardDescription>
                        Key nutrients measured in parts per million (ppm)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={analyticsData.soilData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="date"
                              tickFormatter={formatDate}
                              interval={Math.ceil(
                                analyticsData.soilData.length / 7
                              )}
                            />
                            <YAxis />
                            <Tooltip
                              formatter={(value) => [`${value} ppm`, ""]}
                              labelFormatter={formatDate}
                            />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="nitrogen"
                              stroke="#8884d8"
                              name="Nitrogen (N)"
                            />
                            <Line
                              type="monotone"
                              dataKey="phosphorus"
                              stroke="#82ca9d"
                              name="Phosphorus (P)"
                            />
                            <Line
                              type="monotone"
                              dataKey="potassium"
                              stroke="#ffc658"
                              name="Potassium (K)"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="pests" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Pest Pressure Trends
                      </CardTitle>
                      <CardDescription>
                        Overall pest pressure index over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={analyticsData.pestData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="date"
                              tickFormatter={formatDate}
                              interval={Math.ceil(
                                analyticsData.pestData.length / 7
                              )}
                            />
                            <YAxis />
                            <Tooltip
                              formatter={(value) => [
                                `${value} index`,
                                "Pressure",
                              ]}
                              labelFormatter={formatDate}
                            />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="totalPressure"
                              stroke={COLORS.danger}
                              fill={COLORS.danger}
                              fillOpacity={0.3}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Pest Type Distribution
                      </CardTitle>
                      <CardDescription>
                        Breakdown of pest issues by category
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                {
                                  name: "Aphids",
                                  value: analyticsData.pestData.reduce(
                                    (sum, entry) => sum + entry.aphids,
                                    0
                                  ),
                                },
                                {
                                  name: "Whiteflies",
                                  value: analyticsData.pestData.reduce(
                                    (sum, entry) => sum + entry.whiteflies,
                                    0
                                  ),
                                },
                                {
                                  name: "Fungal",
                                  value: analyticsData.pestData.reduce(
                                    (sum, entry) => sum + entry.fungal,
                                    0
                                  ),
                                },
                                {
                                  name: "Weeds",
                                  value: analyticsData.pestData.reduce(
                                    (sum, entry) => sum + entry.weeds,
                                    0
                                  ),
                                },
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                              }
                            >
                              {[
                                { name: "Aphids", value: 0, color: "#FF8042" },
                                {
                                  name: "Whiteflies",
                                  value: 0,
                                  color: "#FFBB28",
                                },
                                { name: "Fungal", value: 0, color: "#00C49F" },
                                { name: "Weeds", value: 0, color: "#0088FE" },
                              ].map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) => [
                                `${value.toFixed(1)}`,
                                "Pressure Index",
                              ]}
                            />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm lg:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Pest Type Breakdown Over Time
                      </CardTitle>
                      <CardDescription>
                        Detailed tracking of specific pest pressures
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={analyticsData.pestData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            barGap={0}
                            barCategoryGap="10%"
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="date"
                              tickFormatter={formatDate}
                              interval={Math.ceil(
                                analyticsData.pestData.length / 7
                              )}
                            />
                            <YAxis />
                            <Tooltip
                              formatter={(value) => [`${value} index`, ""]}
                              labelFormatter={formatDate}
                            />
                            <Legend />
                            <Bar
                              dataKey="aphids"
                              fill="#FF8042"
                              name="Aphids"
                            />
                            <Bar
                              dataKey="whiteflies"
                              fill="#FFBB28"
                              name="Whiteflies"
                            />
                            <Bar
                              dataKey="fungal"
                              fill="#00C49F"
                              name="Fungal Issues"
                            />
                            <Bar dataKey="weeds" fill="#0088FE" name="Weeds" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="yield" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Yield Comparison
                      </CardTitle>
                      <CardDescription>
                        Current projection vs. benchmarks
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={analyticsData.yieldData}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" domain={[0, 100]} />
                            <YAxis type="category" dataKey="name" />
                            <Tooltip
                              formatter={(value) => [`${value}%`, "Yield"]}
                            />
                            <Legend />
                            <Bar dataKey="value" fill={COLORS.primary}>
                              {analyticsData.yieldData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={
                                    entry.name === "Current Projection"
                                      ? COLORS.primary
                                      : COLORS.secondary
                                  }
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Yield Scenarios</CardTitle>
                      <CardDescription>
                        Projected outcomes under different conditions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={analyticsData.projections}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" domain={[0, 100]} />
                            <YAxis type="category" dataKey="category" />
                            <Tooltip
                              formatter={(value) => [`${value}%`, "Yield"]}
                            />
                            <Legend />
                            <Bar dataKey="value" name="Yield Percentage">
                              {analyticsData.projections.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm lg:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Yield Impact Factors
                      </CardTitle>
                      <CardDescription>
                        Analysis of key factors affecting projected yield
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="p-4 bg-gray-50 rounded-lg border">
                            <div className="flex justify-between items-start mb-2">
                              <div className="p-2 bg-blue-100 rounded-full">
                                <Droplets className="h-5 w-5 text-blue-600" />
                              </div>
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  metrics.avgSoilMoisture > 45 &&
                                  metrics.avgSoilMoisture < 65
                                    ? "bg-green-100 text-green-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {metrics.avgSoilMoisture > 45 &&
                                metrics.avgSoilMoisture < 65
                                  ? "Optimal"
                                  : "Suboptimal"}
                              </span>
                            </div>
                            <h4 className="font-medium">Water Management</h4>
                            <p className="text-sm text-gray-500 mt-1">
                              Impact on yield:{" "}
                              {metrics.avgSoilMoisture > 45 &&
                              metrics.avgSoilMoisture < 65
                                ? "+5%"
                                : "-3%"}
                            </p>
                          </div>

                          <div className="p-4 bg-gray-50 rounded-lg border">
                            <div className="flex justify-between items-start mb-2">
                              <div className="p-2 bg-green-100 rounded-full">
                                <Leaf className="h-5 w-5 text-green-600" />
                              </div>
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  metrics.avgGrowthRate > 0.5
                                    ? "bg-green-100 text-green-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {metrics.avgGrowthRate > 0.5
                                  ? "Strong"
                                  : "Weak"}
                              </span>
                            </div>
                            <h4 className="font-medium">Plant Health</h4>
                            <p className="text-sm text-gray-500 mt-1">
                              Impact on yield:{" "}
                              {metrics.avgGrowthRate > 0.5 ? "+8%" : "-10%"}
                            </p>
                          </div>

                          <div className="p-4 bg-gray-50 rounded-lg border">
                            <div className="flex justify-between items-start mb-2">
                              <div className="p-2 bg-red-100 rounded-full">
                                <Bug className="h-5 w-5 text-red-600" />
                              </div>
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  metrics.avgPestPressure < 15
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {metrics.avgPestPressure < 15
                                  ? "Low Risk"
                                  : "High Risk"}
                              </span>
                            </div>
                            <h4 className="font-medium">Pest Management</h4>
                            <p className="text-sm text-gray-500 mt-1">
                              Impact on yield:{" "}
                              {metrics.avgPestPressure < 15 ? "-2%" : "-15%"}
                            </p>
                          </div>

                          <div className="p-4 bg-gray-50 rounded-lg border">
                            <div className="flex justify-between items-start mb-2">
                              <div className="p-2 bg-yellow-100 rounded-full">
                                <Sun className="h-5 w-5 text-yellow-600" />
                              </div>
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                                Favorable
                              </span>
                            </div>
                            <h4 className="font-medium">Weather Conditions</h4>
                            <p className="text-sm text-gray-500 mt-1">
                              Impact on yield: +4%
                            </p>
                          </div>
                        </div>
                          <Card className="shadow-sm">
                              <CardHeader className="pb-2">
                                  <CardTitle className="text-lg">Soil Moisture Trends</CardTitle>
                                  <CardDescription>Percentage of water content over time</CardDescription>
                              </CardHeader>
                              <CardContent>
                                  <div className="h-80">
                                      <ResponsiveContainer width="100%" height="100%">
                                          <LineChart
                                              data={analyticsData.soilData}
                                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                          >
                                              <CartesianGrid strokeDasharray="3 3" />
                                              <XAxis dataKey="date" tickFormatter={formatDate} />
                                              <YAxis domain={[0, 100]} />
                                              <Tooltip formatter={(value) => [`${value}%`, "Moisture"]} />
                                              <Legend />
                                              <Line type="monotone" dataKey="soilMoisture" stroke="#2196F3" />
                                          </LineChart>
                                      </ResponsiveContainer>
                                  </div>
                              </CardContent>
                          </Card>
                          <Card className="shadow-sm">
                              <CardHeader className="pb-2">
                                  <CardTitle className="text-lg">Pest Pressure Trends</CardTitle>
                                  <CardDescription>Monitoring pest pressure over different areas</CardDescription>
                              </CardHeader>
                              <CardContent>
                                  <div className="h-80">
                                      <ResponsiveContainer width="100%" height="100%">
                                          <BarChart
                                              data={analyticsData.pestData}
                                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                          >
                                              <CartesianGrid strokeDasharray="3 3" />
                                              <XAxis dataKey="plantationArea" />
                                              <YAxis />
                                              <Tooltip formatter={(value) => [`${value}`, "Pest Pressure"]} />
                                              <Legend />
                                              <Bar dataKey="pestPressure" fill="#F44336" />
                                          </BarChart>
                                      </ResponsiveContainer>
                                  </div>
                              </CardContent>
                          </Card>


                          <div className="p-4 bg-gray-50 rounded-lg border">
                          <h4 className="font-medium mb-2">
                            Recommended Actions to Optimize Yield
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>
                                Maintain optimal soil moisture between 45-65%
                                through scheduled irrigation
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>
                                Apply additional nitrogen-rich fertilizer to
                                boost growth rate
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                              <span>
                                Implement preventative pest control measures
                                focusing on aphid management
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>
                                Ensure adequate sunlight exposure by trimming
                                surrounding vegetation
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default AnalyticsPage;
