"use client";
import React, { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import AnalyticsControls from "@/components/analytics-controls";
import MetricsSummary from "@/components/metrics-summary";
import AnalyticsTabsContent from "@/components/analytics-tabs-content";

// Page component props (if needed)
interface AnalyticsPageProps {}

// Interface for the date range state
interface DateRange {
    from: Date;
    to: Date;
}

// Interface for a plantation area object
interface PlantationArea {
    name: string;
    soil: string;
}

// Interface for a crop type object
interface CropType {
    id: number;
    name: string;
}

// Interface for the analytics data structure
interface AnalyticsData {
    growthData: any[];
    weatherData: any[];
    soilData: any[];
    yieldData: any[];
    pestData: any[];
    projections: any[];
}

// Interface for the calculated metrics
interface Metrics {
    avgSoilMoisture: number;
    avgPestPressure: number;
    avgGrowthRate: number;
    avgTemperature: number;
    totalRainfall: number;
    projectedYield: number;
    alertCount: number;
    avgHumidity: number;
}

interface CropApiData {
    plant: string;
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [selectedArea, setSelectedArea] = useState<string>("all");
    const [selectedTimeRange, setSelectedTimeRange] = useState<string>("30days");
    const [selectedCrop, setSelectedCrop] = useState<string>("all");
    const [loading, setLoading] = useState<boolean>(true);
    const [dateRange, setDateRange] = useState<DateRange>({
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        to: new Date(),
    });
    const [cropTypes, setCropTypes] = useState<CropType[]>([]);
    const [plantationAreas, setPlantationAreas] = useState<PlantationArea[]>([]);
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
        growthData: [],
        weatherData: [],
        soilData: [],
        yieldData: [],
        pestData: [],
        projections: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch plantation areas
                const areasResponse = await fetch("/api/plantation-areas");
                const areasData = await areasResponse.json();
                setPlantationAreas(
                    areasData.map((area: any) => ({
                        name: area.plantation_area,
                        soil: area.soil_type,
                    }))
                );

                // Fetch analytics data
                const response = await fetch(
                    `/api/analytics?timeRange=${selectedTimeRange}&area=${selectedArea}&crop=${selectedCrop}`
                );
                if (!response.ok) throw new Error("Failed to fetch analytics data");
                const data = await response.json();

                // console.log("Fetched data:", data);
                setAnalyticsData({
                    growthData: data.cropData || [],
                    weatherData: data.soilData || [],
                    soilData: data.soilData || [],
                    yieldData: data.yieldData || [],
                    pestData: data.pestData || [],
                    projections: data.projections || [],
                });

                console.log("Fetched data:", data);

                const cropResponse = await fetch("/api/crop-types");
                const cropData: CropApiData[] = await cropResponse.json();
                const uniqueCrops: CropType[] = Array.from(
                    new Set(cropData.map((item) => item.plant))
                ).map((crop, index) => ({ id: index, name: crop }));
                setCropTypes(uniqueCrops);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData().then();
    }, [selectedTimeRange, selectedArea, selectedCrop]);

    // Generate a range of dates based on the selected time range.
    // If "custom" is selected, the dateRange state is used.
    const generateDateRange = (): string[] => {
        const dates: string[] = [];
        let startDate: Date;
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
        } else {
            startDate = new Date();
        }
        const endDate =
            selectedTimeRange === "custom" ? new Date(dateRange.to) : new Date();
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d).toISOString().split("T")[0]);
        }
        return dates;
    };

    const dates: string[] = generateDateRange();

    // Calculate metrics based on the fetched analytics data
    const calculateMetrics = (): Metrics => {
        const metrics: Metrics = {
            avgSoilMoisture: 0,
            avgPestPressure: 0,
            avgGrowthRate: 0,
            avgTemperature: 0,
            totalRainfall: 0,
            projectedYield: 0,
            alertCount: 0,
            avgHumidity: 0,
        };

        if (analyticsData.soilData.length > 0) {
            const totalMoisture = analyticsData.soilData.reduce(
                (sum: number, entry: any) => sum + entry.soilMoisture,
                0
            );
            metrics.avgSoilMoisture = totalMoisture / analyticsData.soilData.length;
        }

        if (analyticsData.pestData.length > 0) {
            const totalPestPressure = analyticsData.pestData.reduce(
                (sum: number, entry: any) => sum + entry.pestPressure,
                0
            );
            metrics.avgPestPressure = totalPestPressure / analyticsData.pestData.length;
        }

        if (analyticsData.growthData.length > 0) {
            const growthRates = analyticsData.growthData
                .map((entry: any, index: number, arr: any[]) =>
                    index > 0 ? entry.height - arr[index - 1].height : 0
                )
                .filter((rate: number) => rate !== 0);
            metrics.avgGrowthRate =
                growthRates.length > 0
                    ? growthRates.reduce((sum: number, rate: number) => sum + rate, 0) /
                    growthRates.length
                    : 0;
        }

        if (analyticsData.weatherData.length > 0) {
            metrics.avgTemperature =
                analyticsData.weatherData.reduce(
                    (sum: number, entry: any) => sum + entry.temperature,
                    0
                ) / analyticsData.weatherData.length;
            metrics.totalRainfall = analyticsData.weatherData.reduce(
                (sum: number, entry: any) => sum + entry.rainfall,
                0
            );
        }

        if (analyticsData.yieldData.length > 0) {
            metrics.projectedYield =
                analyticsData.yieldData.find(
                    (entry: any) => entry.name === "Current Projection"
                )?.value || 0;
        }

        if (metrics.avgSoilMoisture < 35 || metrics.avgSoilMoisture > 75)
            metrics.alertCount++;
        if (metrics.avgTemperature < 15 || metrics.avgTemperature > 30)
            metrics.alertCount++;
        if (metrics.avgPestPressure > 20) metrics.alertCount++;
        if (metrics.avgGrowthRate < 0.3) metrics.alertCount++;

        if (analyticsData.weatherData.length > 0) {
            metrics.avgHumidity =
                analyticsData.weatherData.reduce(
                    (sum: number, entry: any) => sum + entry.humidity,
                    0
                ) / analyticsData.weatherData.length;
        }

        return metrics;
    };

    const metrics: Metrics = calculateMetrics();

    // Format dates to a more readable format
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-amber-50">
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 p-6 overflow-auto">
                <AnalyticsControls
                    plantationAreas={plantationAreas}
                    cropTypes={cropTypes}
                    selectedArea={selectedArea}
                    setSelectedArea={setSelectedArea}
                    selectedCrop={selectedCrop}
                    setSelectedCrop={setSelectedCrop}
                    selectedTimeRange={selectedTimeRange}
                    setSelectedTimeRange={setSelectedTimeRange}
                />
                {/* If "custom" is selected, show date inputs */}
                {selectedTimeRange === "custom" && (
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex flex-col">
                            <label htmlFor="from-date" className="text-sm font-medium">
                                From
                            </label>
                            <input
                                id="from-date"
                                type="date"
                                value={dateRange.from.toISOString().split("T")[0]}
                                onChange={(e) =>
                                    setDateRange((prev) => ({
                                        ...prev,
                                        from: new Date(e.target.value),
                                    }))
                                }
                                className="border p-1 rounded"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="to-date" className="text-sm font-medium">
                                To
                            </label>
                            <input
                                id="to-date"
                                type="date"
                                value={dateRange.to.toISOString().split("T")[0]}
                                onChange={(e) =>
                                    setDateRange((prev) => ({
                                        ...prev,
                                        to: new Date(e.target.value),
                                    }))
                                }
                                className="border p-1 rounded"
                            />
                        </div>
                    </div>
                )}
                <MetricsSummary metrics={metrics} />
                <AnalyticsTabsContent
                    analyticsData={analyticsData}
                    loading={loading}
                    dates={dates}
                    formatDate={formatDate}
                />
            </main>
        </div>
    );
};

export default AnalyticsPage;
