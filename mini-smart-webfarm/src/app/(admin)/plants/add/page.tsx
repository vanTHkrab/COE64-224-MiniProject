"use client"
import React, { useState } from 'react';
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
                        <CardTitle className="text-lg font-semibold">Add New Plant Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {[
                                { label: 'Sensor ID', name: 'sensor_id', type: 'number' },
                                { label: 'Plant Name', name: 'plant', type: 'text' },
                                { label: 'Plantation Area', name: 'plantation_area', type: 'text' },
                                { label: 'Pest Pressure', name: 'pest_pressure', type: 'number', step: '0.1' },
                                { label: 'Crop Density', name: 'crop_density', type: 'number', step: '0.1' }
                            ].map(({ label, name, type, step }) => (
                                <div key={name} className="space-y-2">
                                    <Label htmlFor={name} className="text-green-700 font-medium">{label}</Label>
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

                            {[
                                { label: 'Plant Season', name: 'plant_season', options: ['spring', 'summer', 'fall', 'winter'] },
                                { label: 'Growth Stage', name: 'growth_stage', options: ['seedling', 'vegetative', 'flowering', 'fruiting', 'mature'] }
                            ].map(({ label, name, options }) => (
                                <div key={name} className="space-y-2">
                                    <Label htmlFor={name} className="text-green-700 font-medium">{label}</Label>
                                    <Select
                                        value={formData[name]}
                                        onValueChange={(value) => handleSelectChange(value, name)}
                                    >
                                        <SelectTrigger className="w-full border border-green-300 focus:ring-green-500 focus:border-green-500 rounded-md">
                                            <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white shadow-md rounded-md">
                                            {options.map(option => (
                                                <SelectItem key={option} value={option} className="text-green-700">
                                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            ))}

                            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow-md">
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