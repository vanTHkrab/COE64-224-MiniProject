"use client";
import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Droplets, Sun, Wind, CloudRain, Thermometer } from "lucide-react";

interface WeatherData {
    temperature: number;
    humidity: number;
    precipitation: number;
    windSpeed: number;
    conditions: string;
    forecast: string;
    lastUpdated: string;
}

const BasePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [weatherData, setWeatherData] = useState({
        temperature: 24,
        humidity: 65,
        precipitation: 0.2,
        windSpeed: 12,
        conditions: "Partly Cloudy",
        forecast: "Sunny",
        lastUpdated: new Date().toLocaleTimeString(),
    });

    const [forecastData] = useState([
        {
            day: "Tomorrow",
            date: "Feb 25",
            condition: "Sunny",
            highTemp: 26,
            lowTemp: 18,
            precipitation: 0,
            humidity: 60,
        },
        {
            day: "Tuesday",
            date: "Feb 26",
            condition: "Cloudy",
            highTemp: 24,
            lowTemp: 17,
            precipitation: 30,
            humidity: 75,
        },
        {
            day: "Wednesday",
            date: "Feb 27",
            condition: "Rainy",
            highTemp: 22,
            lowTemp: 16,
            precipitation: 80,
            humidity: 85,
        },
        {
            day: "Thursday",
            date: "Feb 28",
            condition: "Cloudy",
            highTemp: 23,
            lowTemp: 17,
            precipitation: 20,
            humidity: 70,
        },
    ]);

    useEffect(() => {
        const updateWeather = () => {
            setWeatherData((prev) => ({
                ...prev,
                lastUpdated: new Date().toLocaleTimeString(),
            }));
        };

        const interval = setInterval(updateWeather, 300000);
        return () => clearInterval(interval);
    }, []);

    const fetchWeatherData = async () => {
        try {
            const res = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=8.4333&lon=99.9667&appid=7a5e74918b6decd534510a88d573b8cd");
            const data = await res.json();

            console.log(data);
        } catch (error) {
            console.error("Error fetching weather data", error);
        }
    }

    useEffect(() => {
        // fetchWeatherData();
    }, []);



    const getWeatherIcon = (condition: string) => {
        switch (condition.toLowerCase()) {
            case "sunny":
                return <Sun className="h-12 w-12 text-amber-600" />;
            case "cloudy":
                return <Cloud className="h-12 w-12 text-stone-600" />;
            case "rainy":
                return <CloudRain className="h-12 w-12 text-blue-600" />;
            default:
                return <Sun className="h-12 w-12 text-amber-600" />;
        }
    };

    return (
        <div className="bg-white">
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 p-6 overflow-auto bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2 text-emerald-900">Farm Weather Dashboard</h2>
                            <p className="text-emerald-700">
                                Current conditions for your farm location
                            </p>
                        </div>
                        <div className="flex items-center mt-4 md:mt-0 bg-emerald-50 rounded-lg p-4">
                            {getWeatherIcon(weatherData.forecast)}
                            <div className="ml-4">
                                <p className="text-lg font-semibold text-emerald-900">{weatherData.conditions}</p>
                                <p className="text-sm text-emerald-700">
                                    Last updated: {weatherData.lastUpdated}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card className="border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-semibold text-emerald-800">Temperature</CardTitle>
                                <Thermometer className="h-6 w-6 text-amber-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="mt-2 flex items-baseline">
                                    <div className="text-4xl font-bold text-emerald-900">{weatherData.temperature}</div>
                                    <div className="ml-1 text-xl text-emerald-600">°C</div>
                                </div>
                                <p className="mt-2 text-sm text-emerald-600">Optimal growing conditions</p>
                            </CardContent>
                        </Card>

                        <Card className="border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-semibold text-emerald-800">Humidity</CardTitle>
                                <Droplets className="h-6 w-6 text-blue-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="mt-2 flex items-baseline">
                                    <div className="text-4xl font-bold text-emerald-900">{weatherData.humidity}</div>
                                    <div className="ml-1 text-xl text-emerald-600">%</div>
                                </div>
                                <p className="mt-2 text-sm text-emerald-600">Relative humidity</p>
                            </CardContent>
                        </Card>

                        <Card className="border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-semibold text-emerald-800">Precipitation</CardTitle>
                                <Cloud className="h-6 w-6 text-stone-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="mt-2 flex items-baseline">
                                    <div className="text-4xl font-bold text-emerald-900">{weatherData.precipitation}</div>
                                    <div className="ml-1 text-xl text-emerald-600">mm</div>
                                </div>
                                <p className="mt-2 text-sm text-emerald-600">Last 24 hours</p>
                            </CardContent>
                        </Card>

                        <Card className="border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-semibold text-emerald-800">Wind Speed</CardTitle>
                                <Wind className="h-6 w-6 text-teal-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="mt-2 flex items-baseline">
                                    <div className="text-4xl font-bold text-emerald-900">{weatherData.windSpeed}</div>
                                    <div className="ml-1 text-xl text-emerald-600">km/h</div>
                                </div>
                                <p className="mt-2 text-sm text-emerald-600">Current wind speed</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Weather Forecast Section */}
                    <div className="mt-8">
                        <h3 className="text-2xl font-bold mb-4 text-emerald-900">4-Day Forecast</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {forecastData.map((forecast, index) => (
                                <Card key={index} className="border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <CardTitle className="text-lg font-semibold text-emerald-800">{forecast.day}</CardTitle>
                                                <p className="text-sm text-emerald-600">{forecast.date}</p>
                                            </div>
                                            {getWeatherIcon(forecast.condition)}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-emerald-700">High/Low</span>
                                                <span className="font-semibold text-emerald-900">
                                          {forecast.highTemp}°/{forecast.lowTemp}°
                                        </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-emerald-700">Rain Chance</span>
                                                <span className="font-semibold text-emerald-900">{forecast.precipitation}%</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-emerald-700">Humidity</span>
                                                <span className="font-semibold text-emerald-900">{forecast.humidity}%</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BasePage;