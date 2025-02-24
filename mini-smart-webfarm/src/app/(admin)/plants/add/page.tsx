"use client"
import React, { useState } from 'react';
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Thermometer,
    Sprout,
    MapPin,
    Bug,
    Grid,
    CalendarDays,
    Leaf,
    Ruler,
    Send,
    Sun,
    Cloud,
    Snowflake,
    Flower,
    TreePine,
    Apple
} from "lucide-react";

const AddPlantPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        sensor_id: '',
        plant: '',
        plant_season: '',
        plantation_area: '',
        growth_stage: '',
        pest_pressure: '',
        crop_density: ''
    });

    const seasonOptions = [
        { value: 'spring', label: 'Spring', icon: Flower },
        { value: 'summer', label: 'Summer', icon: Sun },
        { value: 'fall', label: 'Fall', icon: Cloud },
        { value: 'winter', label: 'Winter', icon: Snowflake }
    ];

    const growthOptions = [
        { value: 'seedling', label: 'Seedling', icon: Sprout },
        { value: 'vegetative', label: 'Vegetative', icon: Leaf },
        { value: 'flowering', label: 'Flowering', icon: Flower },
        { value: 'fruiting', label: 'Fruiting', icon: Apple },
        { value: 'mature', label: 'Mature', icon: TreePine }
    ];

    // Rest of the component remains the same...
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (value, field) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/plants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to create plant info');
            }

            setFormData({
                sensor_id: '',
                plant: '',
                plant_season: '',
                plantation_area: '',
                growth_stage: '',
                pest_pressure: '',
                crop_density: ''
            });

            alert('Plant information added successfully!');
        } catch (error) {
            console.error('Error adding plant:', error);
            alert('Failed to add plant information');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-amber-100">
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 p-6 overflow-auto">
                <Card className="max-w-2xl mx-auto shadow-lg bg-white rounded-lg border border-green-200">
                    <CardHeader className="bg-green-600 text-white py-4 rounded-t-lg">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <Sprout className="w-5 h-5" />
                            Add New Plant Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {[
                                { label: 'Sensor ID', name: 'sensor_id', type: 'number', icon: Thermometer },
                                { label: 'Plant Name', name: 'plant', type: 'text', icon: Leaf },
                                { label: 'Plantation Area', name: 'plantation_area', type: 'text', icon: MapPin },
                                { label: 'Pest Pressure', name: 'pest_pressure', type: 'number', step: '0.1', icon: Bug },
                                { label: 'Crop Density', name: 'crop_density', type: 'number', step: '0.1', icon: Grid }
                            ].map(({ label, name, type, step, icon: Icon }) => (
                                <div key={name} className="space-y-2">
                                    <Label htmlFor={name} className="text-green-700 font-medium flex items-center gap-2">
                                        <Icon className="w-4 h-4" />
                                        {label}
                                    </Label>
                                    <Input
                                        id={name}
                                        name={name}
                                        type={type}
                                        step={step || undefined}
                                        value={formData[name]}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full border border-green-300 focus:ring-green-500 focus:border-green-500 rounded-md"
                                    />
                                </div>
                            ))}

                            <div className="space-y-2">
                                <Label htmlFor="plant_season" className="text-green-700 font-medium flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4" />
                                    Plant Season
                                </Label>
                                <Select
                                    value={formData.plant_season}
                                    onValueChange={(value) => handleSelectChange(value, 'plant_season')}
                                >
                                    <SelectTrigger className="w-full border border-green-300 focus:ring-green-500 focus:border-green-500 rounded-md">
                                        <SelectValue placeholder="Select plant season" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white shadow-md rounded-md">
                                        {seasonOptions.map(({ value, label, icon: Icon }) => (
                                            <SelectItem key={value} value={value} className="text-green-700">
                                                <div className="flex items-center gap-2">
                                                    <Icon className="w-4 h-4" />
                                                    {label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="growth_stage" className="text-green-700 font-medium flex items-center gap-2">
                                    <Ruler className="w-4 h-4" />
                                    Growth Stage
                                </Label>
                                <Select
                                    value={formData.growth_stage}
                                    onValueChange={(value) => handleSelectChange(value, 'growth_stage')}
                                >
                                    <SelectTrigger className="w-full border border-green-300 focus:ring-green-500 focus:border-green-500 rounded-md">
                                        <SelectValue placeholder="Select growth stage" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white shadow-md rounded-md">
                                        {growthOptions.map(({ value, label, icon: Icon }) => (
                                            <SelectItem key={value} value={value} className="text-green-700">
                                                <div className="flex items-center gap-2">
                                                    <Icon className="w-4 h-4" />
                                                    {label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow-md flex items-center justify-center gap-2">
                                <Send className="w-4 h-4" />
                                Add Plant Information
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default AddPlantPage;