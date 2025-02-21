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

            // Reset form after successful submission
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
        <div>
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 p-6 overflow-auto">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Add New Plant Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="sensor_id">Sensor ID</Label>
                                <Input
                                    id="sensor_id"
                                    name="sensor_id"
                                    type="number"
                                    value={formData.sensor_id}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="plant">Plant Name</Label>
                                <Input
                                    id="plant"
                                    name="plant"
                                    value={formData.plant}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="plant_season">Plant Season</Label>
                                <Select
                                    value={formData.plant_season}
                                    onValueChange={(value) => handleSelectChange(value, 'plant_season')}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select season" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="spring">Spring</SelectItem>
                                        <SelectItem value="summer">Summer</SelectItem>
                                        <SelectItem value="fall">Fall</SelectItem>
                                        <SelectItem value="winter">Winter</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="plantation_area">Plantation Area</Label>
                                <Input
                                    id="plantation_area"
                                    name="plantation_area"
                                    value={formData.plantation_area}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="growth_stage">Growth Stage</Label>
                                <Select
                                    value={formData.growth_stage}
                                    onValueChange={(value) => handleSelectChange(value, 'growth_stage')}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select growth stage" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="seedling">Seedling</SelectItem>
                                        <SelectItem value="vegetative">Vegetative</SelectItem>
                                        <SelectItem value="flowering">Flowering</SelectItem>
                                        <SelectItem value="fruiting">Fruiting</SelectItem>
                                        <SelectItem value="mature">Mature</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="pest_pressure">Pest Pressure</Label>
                                <Input
                                    id="pest_pressure"
                                    name="pest_pressure"
                                    type="number"
                                    step="0.1"
                                    value={formData.pest_pressure}
                                    onChange={handleInputChange}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="crop_density">Crop Density</Label>
                                <Input
                                    id="crop_density"
                                    name="crop_density"
                                    type="number"
                                    step="0.1"
                                    value={formData.crop_density}
                                    onChange={handleInputChange}
                                    className="w-full"
                                />
                            </div>

                            <Button type="submit" className="w-full">
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