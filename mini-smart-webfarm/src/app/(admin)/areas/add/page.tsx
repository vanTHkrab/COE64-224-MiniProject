"use client";
import React, { useState } from 'react';
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, MapPin, ChevronDown, ChevronUp } from "lucide-react";

// PlantationManagement component
const PlantationManagement = () => {
    const [plantations, setPlantations] = useState([
        {
            id: 1,
            name: 'North Field',
            size: '50',
            locations: [
                { id: 1, name: 'Block A', coordinates: '1.2924° N, 103.8520° E' },
                { id: 2, name: 'Block B', coordinates: '1.2925° N, 103.8521° E' }
            ]
        },
        {
            id: 2,
            name: 'South Field',
            size: '75',
            locations: [
                { id: 3, name: 'Block C', coordinates: '1.2926° N, 103.8522° E' }
            ]
        }
    ]);

    const [expandedPlantation, setExpandedPlantation] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isAddingLocation, setIsAddingLocation] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        size: '',
        locations: []
    });
    const [locationForm, setLocationForm] = useState({
        name: '',
        coordinates: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLocationInputChange = (e) => {
        const { name, value } = e.target;
        setLocationForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (editingId !== null) {
            setPlantations(prev =>
                prev.map(p => p.id === editingId ? { ...formData, id: editingId } : p)
            );
            setEditingId(null);
        } else {
            setPlantations(prev => [
                ...prev,
                { ...formData, id: Date.now(), locations: [] }
            ]);
        }
        setFormData({ name: '', size: '', locations: [] });
        setIsAddingNew(false);
    };

    const addLocation = (plantationId) => {
        if (!locationForm.name || !locationForm.coordinates) return;

        setPlantations(prev =>
            prev.map(p => {
                if (p.id === plantationId) {
                    return {
                        ...p,
                        locations: [...p.locations, { ...locationForm, id: Date.now() }]
                    };
                }
                return p;
            })
        );

        setLocationForm({ name: '', coordinates: '' });
        setIsAddingLocation(false);
    };

    const removeLocation = (plantationId, locationId) => {
        setPlantations(prev =>
            prev.map(p => {
                if (p.id === plantationId) {
                    return {
                        ...p,
                        locations: p.locations.filter(loc => loc.id !== locationId)
                    };
                }
                return p;
            })
        );
    };

    const startEdit = (plantation) => {
        setFormData(plantation);
        setEditingId(plantation.id);
        setIsAddingNew(true);
    };

    const handleDelete = (id) => {
        setPlantations(prev => prev.filter(p => p.id !== id));
    };

    const toggleExpand = (id) => {
        setExpandedPlantation(expandedPlantation === id ? null : id);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle>Plantation Area Management</CardTitle>
                    <Button
                        onClick={() => {
                            setIsAddingNew(true);
                            setEditingId(null);
                            setFormData({ name: '', size: '', locations: [] });
                        }}
                        className="ml-auto"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Area
                    </Button>
                </CardHeader>
                <CardContent>
                    {isAddingNew && (
                        <div className="mb-6 p-4 border rounded-lg space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    placeholder="Area Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    placeholder="Size (hectares)"
                                    name="size"
                                    type="number"
                                    value={formData.size}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => {
                                    setIsAddingNew(false);
                                    setEditingId(null);
                                }}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit}>
                                    {editingId !== null ? 'Update' : 'Create'} Area
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="divide-y">
                        {plantations.map(plantation => (
                            <div key={plantation.id} className="py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <h3 className="font-medium">{plantation.name}</h3>
                                            <span className="text-sm text-gray-500">
                        ({plantation.size} hectares)
                      </span>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {plantation.locations.length} location{plantation.locations.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => toggleExpand(plantation.id)}
                                        >
                                            {expandedPlantation === plantation.id ?
                                                <ChevronUp className="h-4 w-4" /> :
                                                <ChevronDown className="h-4 w-4" />
                                            }
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => startEdit(plantation)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleDelete(plantation.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {expandedPlantation === plantation.id && (
                                    <div className="mt-4 pl-4 space-y-4">
                                        <div className="space-y-2">
                                            {plantation.locations.map(location => (
                                                <div key={location.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                    <div className="flex items-center space-x-2">
                                                        <MapPin className="h-4 w-4 text-gray-500" />
                                                        <span>{location.name}</span>
                                                        <span className="text-sm text-gray-500">
                              ({location.coordinates})
                            </span>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => removeLocation(plantation.id, location.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>

                                        {isAddingLocation === plantation.id ? (
                                            <div className="space-y-2">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    <Input
                                                        placeholder="Location Name"
                                                        name="name"
                                                        value={locationForm.name}
                                                        onChange={handleLocationInputChange}
                                                    />
                                                    <Input
                                                        placeholder="Coordinates"
                                                        name="coordinates"
                                                        value={locationForm.coordinates}
                                                        onChange={handleLocationInputChange}
                                                    />
                                                </div>
                                                <div className="flex justify-end space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            setIsAddingLocation(false);
                                                            setLocationForm({ name: '', coordinates: '' });
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => addLocation(plantation.id)}
                                                    >
                                                        Add Location
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setIsAddingLocation(plantation.id)}
                                            >
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add Location
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// BasePage component that includes the layout and the PlantationManagement component
const BasePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div>
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 p-6 overflow-auto">
                <PlantationManagement />
            </main>
        </div>
    );
};

export default BasePage;
