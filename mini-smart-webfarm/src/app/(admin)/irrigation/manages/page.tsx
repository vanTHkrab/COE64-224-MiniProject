"use client"
import React, { useState, useEffect } from 'react';
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplet, Flower2, Plus, Pencil, Trash2 } from "lucide-react";

const IrrigationFertilization = () => {
    const [activeTab, setActiveTab] = useState('irrigation');
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        // async function fetchData =
        const fetchData = async () => {
            const response = await fetch('/api/irrigation',{
                method: "GET"
                });
            console.log(response);
            const data = await response.json();
            console.log(data);
        }

        fetchData().then();
    }, []);


    const [schedules, setSchedules] = useState({
        irrigation: [
            {
                id: 1,
                area: 'North Field',
                schedule: 'Daily',
                time: '06:00',
                duration: '30',
                waterAmount: '100',
                notes: 'Increase duration during dry season'
            },
            {
                id: 2,
                area: 'South Field',
                schedule: 'Every 2 days',
                time: '07:00',
                duration: '45',
                waterAmount: '150',
                notes: 'Check water pressure regularly'
            }
        ],
        fertilization: [
            {
                id: 1,
                area: 'North Field',
                type: 'NPK 15-15-15',
                schedule: 'Weekly',
                amount: '50',
                nextDate: '2024-03-01',
                notes: 'Apply after irrigation'
            },
            {
                id: 2,
                area: 'South Field',
                type: 'Organic Compost',
                schedule: 'Monthly',
                amount: '100',
                nextDate: '2024-03-15',
                notes: 'Mix with soil properly'
            }
        ]
    });

    const [formData, setFormData] = useState({
        irrigation: {
            area: '',
            schedule: '',
            time: '',
            duration: '',
            waterAmount: '',
            notes: ''
        },
        fertilization: {
            area: '',
            type: '',
            schedule: '',
            amount: '',
            nextDate: '',
            notes: ''
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [activeTab]: {
                ...prev[activeTab],
                [name]: value
            }
        }));
    };

    const handleSubmit = () => {
        if (editingId !== null) {
            setSchedules(prev => ({
                ...prev,
                [activeTab]: prev[activeTab].map(item =>
                    item.id === editingId ? { ...formData[activeTab], id: editingId } : item
                )
            }));
        } else {
            setSchedules(prev => ({
                ...prev,
                [activeTab]: [
                    ...prev[activeTab],
                    { ...formData[activeTab], id: Date.now() }
                ]
            }));
        }

        // Reset form data
        setFormData(prev => ({
            ...prev,
            [activeTab]: Object.keys(prev[activeTab]).reduce((acc, key) => ({
                ...acc,
                [key]: ''
            }), {})
        }));

        setShowAddForm(false);
        setEditingId(null);
    };

    const handleEdit = (item) => {
        setFormData(prev => ({
            ...prev,
            [activeTab]: { ...item }
        }));
        setEditingId(item.id);
        setShowAddForm(true);
    };

    const handleDelete = (id) => {
        setSchedules(prev => ({
            ...prev,
            [activeTab]: prev[activeTab].filter(item => item.id !== id)
        }));
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle>Irrigation & Fertilization Plans</CardTitle>
                <div className="flex space-x-2">
                    <Button
                        variant={activeTab === 'irrigation' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('irrigation')}
                        className="flex items-center"
                    >
                        <Droplet className="h-4 w-4 mr-2" />
                        Irrigation
                    </Button>
                    <Button
                        variant={activeTab === 'fertilization' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('fertilization')}
                        className="flex items-center"
                    >
                        <Flower2 className="h-4 w-4 mr-2" />
                        Fertilization
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex justify-between items-center">
                    <h3 className="text-lg font-medium">
                        {activeTab === 'irrigation' ? 'Irrigation Schedules' : 'Fertilization Plans'}
                    </h3>
                    <Button onClick={() => setShowAddForm(true)} disabled={showAddForm}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Schedule
                    </Button>
                </div>

                {showAddForm && (
                    <div className="mb-6 p-4 border rounded-lg space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Input
                                placeholder="Area Name"
                                name="area"
                                value={formData[activeTab].area}
                                onChange={handleInputChange}
                            />

                            {activeTab === 'irrigation' ? (
                                <>
                                    <Input
                                        placeholder="Schedule (e.g., Daily)"
                                        name="schedule"
                                        value={formData[activeTab].schedule}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        type="time"
                                        name="time"
                                        value={formData[activeTab].time}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        placeholder="Duration (minutes)"
                                        name="duration"
                                        type="number"
                                        value={formData[activeTab].duration}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        placeholder="Water Amount (liters)"
                                        name="waterAmount"
                                        type="number"
                                        value={formData[activeTab].waterAmount}
                                        onChange={handleInputChange}
                                    />
                                </>
                            ) : (
                                <>
                                    <Input
                                        placeholder="Fertilizer Type"
                                        name="type"
                                        value={formData[activeTab].type}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        placeholder="Schedule (e.g., Weekly)"
                                        name="schedule"
                                        value={formData[activeTab].schedule}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        placeholder="Amount (kg)"
                                        name="amount"
                                        type="number"
                                        value={formData[activeTab].amount}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        type="date"
                                        name="nextDate"
                                        value={formData[activeTab].nextDate}
                                        onChange={handleInputChange}
                                    />
                                </>
                            )}

                            <Input
                                placeholder="Notes"
                                name="notes"
                                value={formData[activeTab].notes}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setShowAddForm(false);
                                    setEditingId(null);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit}>
                                {editingId !== null ? 'Update' : 'Create'} Schedule
                            </Button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {schedules[activeTab].map((item) => (
                        <Card key={item.id} className="bg-gray-50">
                            <CardContent className="pt-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-medium">{item.area}</h4>
                                        <p className="text-sm text-gray-500">
                                            {activeTab === 'irrigation' ? (
                                                `${item.schedule} at ${item.time}`
                                            ) : (
                                                `${item.schedule} - ${item.type}`
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEdit(item)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm">
                                    {activeTab === 'irrigation' ? (
                                        <>
                                            <div className="flex justify-between">
                                                <span>Water Amount:</span>
                                                <span>{item.waterAmount} liters</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-between">
                                                <span>Amount:</span>
                                                <span>{item.amount} kg</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Next Application:</span>
                                                <span>{item.nextDate}</span>
                                            </div>
                                        </>
                                    )}
                                    {item.notes && (
                                        <div className="mt-2 text-gray-600">
                                            <strong>Notes:</strong> {item.notes}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

// Component หน้า BasePage ที่ประกอบด้วย Header, Sidebar และแสดง IrrigationFertilization ใน main area
const IrrigationManagePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div>
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 p-6 overflow-auto">
                <IrrigationFertilization />
            </main>
        </div>
    );
};

export default IrrigationManagePage;
