"use client";
import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Droplets, Sun, Wind, CloudRain, Thermometer } from "lucide-react";
import {FooterDashboard} from "@/components/footer";

interface WeatherData {
    temperature: number;
    humidity: number;
    precipitation: number;
    windSpeed: number;
    conditions: string;
    forecast: string;
    lastUpdated: string;
}

const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const CITY_NAME = process.env.NEXT_PUBLIC_CITY_NAME;
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&units=metric&appid=${OPENWEATHER_API_KEY}`;

const WeatherPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [weatherData, setWeatherData] = useState<WeatherData>({
        temperature: 0,
        humidity: 0,
        precipitation: 0,
        windSpeed: 0,
        conditions: "",
        forecast: "",
        lastUpdated: "",
    });

    useEffect(() => {
        fetchWeatherData().then();
        const interval = setInterval(fetchWeatherData, 300000); // Update every 5 minutes
        return () => clearInterval(interval);
    }, []);

    const fetchWeatherData = async () => {
        try {
            const res = await fetch(WEATHER_API_URL);
            if (!res.ok) throw new Error("Failed to fetch weather data");

            const data = await res.json();
            console.log("Weather Data:", data);

            setWeatherData({
                temperature: Math.round(data.main.temp),
                humidity: data.main.humidity,
                precipitation: data.rain ? data.rain["1h"] || 0 : 0,
                windSpeed: Math.round(data.wind.speed),
                conditions: data.weather[0].description,
                forecast: data.weather[0].main,
                lastUpdated: new Date().toLocaleTimeString(),
            });
        } catch (error) {
            console.error("Error fetching weather data", error);
        }
    };

    const getWeatherIcon = (condition: string) => {
        switch (condition.toLowerCase()) {
            case "clear":
                return <Sun className="h-12 w-12 text-amber-500" />;
            case "clouds":
                return <Cloud className="h-12 w-12 text-gray-500" />;
            case "rain":
            case "drizzle":
            case "thunderstorm":
                return <CloudRain className="h-12 w-12 text-blue-500" />;
            default:
                return <Sun className="h-12 w-12 text-amber-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-amber-100">
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 overflow-auto">
                <Card className="max-w-7xl mx-auto shadow-lg bg-white rounded-lg border border-green-200 mt-6">
                    <CardHeader className="bg-green-600 text-white py-4 rounded-t-lg">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <CardTitle className="text-2xl font-bold">Farm Weather Dashboard</CardTitle>
                                <p className="text-green-100 mt-1">
                                    Current conditions in {CITY_NAME || "your location"}
                                </p>
                            </div>
                            <div className="flex items-center mt-4 md:mt-0 bg-white/10 rounded-lg p-4">
                                {getWeatherIcon(weatherData.forecast)}
                                <div className="ml-4">
                                    <p className="text-lg font-semibold">{weatherData.conditions}</p>
                                    <p className="text-sm text-green-100">
                                        Last updated: {weatherData.lastUpdated}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card className="shadow-md hover:shadow-lg transition-shadow border border-green-200">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-lg font-semibold text-green-800">Temperature</CardTitle>
                                    <Thermometer className="h-6 w-6 text-red-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="mt-2 flex items-baseline">
                                        <div className="text-4xl font-bold text-green-900">{weatherData.temperature}</div>
                                        <div className="ml-1 text-xl text-green-600">°C</div>
                                    </div>
                                    <p className="mt-2 text-sm text-green-600">Current temperature</p>
                                </CardContent>
                            </Card>

                            <Card className="shadow-md hover:shadow-lg transition-shadow border border-green-200">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-lg font-semibold text-green-800">Humidity</CardTitle>
                                    <Droplets className="h-6 w-6 text-blue-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="mt-2 flex items-baseline">
                                        <div className="text-4xl font-bold text-green-900">{weatherData.humidity}</div>
                                        <div className="ml-1 text-xl text-green-600">%</div>
                                    </div>
                                    <p className="mt-2 text-sm text-green-600">Relative humidity</p>
                                </CardContent>
                            </Card>

                            <Card className="shadow-md hover:shadow-lg transition-shadow border border-green-200">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-lg font-semibold text-green-800">Precipitation</CardTitle>
                                    <Cloud className="h-6 w-6 text-gray-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="mt-2 flex items-baseline">
                                        <div className="text-4xl font-bold text-green-900">{weatherData.precipitation}</div>
                                        <div className="ml-1 text-xl text-green-600">mm</div>
                                    </div>
                                    <p className="mt-2 text-sm text-green-600">Last 1 hour</p>
                                </CardContent>
                            </Card>

                            <Card className="shadow-md hover:shadow-lg transition-shadow border border-green-200">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-lg font-semibold text-green-800">Wind Speed</CardTitle>
                                    <Wind className="h-6 w-6 text-teal-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="mt-2 flex items-baseline">
                                        <div className="text-4xl font-bold text-green-900">{weatherData.windSpeed}</div>
                                        <div className="ml-1 text-xl text-green-600">km/h</div>
                                    </div>
                                    <p className="mt-2 text-sm text-green-600">Current wind speed</p>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
                <div className="md:h-[12.1rem] lg:h-[14.3rem]"></div>

                <FooterDashboard />
            </main>
        </div>
    );
};

export default WeatherPage;