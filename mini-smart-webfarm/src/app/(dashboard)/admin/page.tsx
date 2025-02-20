'use client';
import React, { useState } from 'react';
import { Menu, X, ChevronDown, Leaf, Map, Droplet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Navigation Menu Component
const NavigationMenu = ({ isOpen, onClose, onMenuSelect }) => {
    const [activeMenu, setActiveMenu] = useState('');

    const menuItems = [
        {
            title: 'Plant Management',
            icon: <Leaf className="w-4 h-4 md:w-5 md:h-5" />,
            submenu: ['Add Plant', 'View Plants', 'Edit Plants']
        },
        {
            title: 'Plantation Areas',
            icon: <Map className="w-4 h-4 md:w-5 md:h-5" />,
            submenu: ['Add Area', 'View Areas', 'Edit Areas']
        },
        {
            title: 'Irrigation & Fertilization',
            icon: <Droplet className="w-4 h-4 md:w-5 md:h-5" />,
            submenu: ['Add Schedule', 'View Plans', 'Edit Plans']
        }
    ];

    const renderMenuContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Smart Farm</h2>
            </div>
            <ScrollArea className="flex-1">
                <div className="p-2">
                    {menuItems.map((item) => (
                        <div key={item.title} className="mb-2">
                            <button
                                onClick={() => setActiveMenu(activeMenu === item.title ? '' : item.title)}
                                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                            >
                                <div className="flex items-center gap-2">
                                    {item.icon}
                                    <span>{item.title}</span>
                                </div>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                        activeMenu === item.title ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            {activeMenu === item.title && (
                                <div className="ml-4 mt-1 space-y-1">
                                    {item.submenu.map((subItem) => (
                                        <button
                                            key={subItem}
                                            onClick={() => {
                                                onMenuSelect(subItem.toLowerCase().replace(' ', '-'));
                                                onClose();
                                            }}
                                            className="w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-left"
                                        >
                                            {subItem}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );

    return (
        <>
            {/* Mobile Sheet */}
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side="left" className="w-[280px] p-0 sm:w-[340px]">
                    {renderMenuContent()}
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block fixed left-0 top-0 w-64 h-screen border-r bg-white">
                {renderMenuContent()}
            </div>
        </>
    );
};

// Plant Form Component
const PlantForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        growthStage: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: '', type: '', growthStage: '' });
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Add New Plant</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                            Time Stamp
                        </Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, datetime: e.target.value})}
                            placeholder="Enter Time Stamp"
                            type="datetime-local"
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type" className="text-sm font-medium">
                            Nitrogen
                        </Label>
                        <Input
                            id="type"
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, number: e.target.value})}
                            placeholder="Enter Nitrogen"
                            className="w-full"
                        />

                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Phosphorus
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, number: e.target.value})}
                            placeholder="Enter Phosphorus"
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Potassium
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, number: e.target.value})}
                            placeholder="Enter Potassium"
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Temperature
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, float: e.target.value})}
                            placeholder="Enter Temperature"
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Humidity
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, float: e.target.value})}
                            placeholder="Enter Humidity"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            PH
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, float: e.target.value})}
                            placeholder="Enter PH"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Rainfall
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, float: e.target.value})}
                            placeholder="Enter Rainfall"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Plant
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, string: e.target.value})}
                            placeholder="Enter Plant"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Plant_season
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, string: e.target.value})}
                            placeholder="Enter Plant_season"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Plantation_area
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, String: e.target.value})}
                            placeholder="Enter Plantation_area"
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Soil_moisture
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, float: e.target.value})}
                            placeholder="Enter Soil_moisture"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Soil_type
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, String: e.target.value})}
                            placeholder="Enter Soil_type"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Sunlight_exposure
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, float: e.target.value})}
                            placeholder="Enter Sunlight_exposure"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Wind_speed
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, float: e.target.value})}
                            placeholder="Enter Wind_speed"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            CO2_concentration
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, float: e.target.value})}
                            placeholder="Enter CO2_concentration"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Organic_matter
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, float: e.target.value})}
                            placeholder="Enter Organic_matter"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Irrigation_frequency (times/week)
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, number: e.target.value})}
                            placeholder="Enter Irrigation_frequency"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Potassium
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, number: e.target.value})}
                            placeholder="Enter Potassium"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Pest_pressure
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, float: e.target.value})}
                            placeholder="Enter Pest_pressure"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Fertilizer_usage
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, float: e.target.value})}
                            placeholder="Enter Fertilizer_usage"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Growth_stage
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, String: e.target.value})}
                            placeholder="Enter Growth_stage"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Urban_area_proximity
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, float: e.target.value})}
                            placeholder="Enter Urban_area_proximity"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Water_source_type
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, String: e.target.value})}
                            placeholder="Enter Water_source_type"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Frost_risk
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, float: e.target.value})}
                            placeholder="Enter Frost_risk"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="growthStage" className="text-sm font-medium">
                            Water_usage_efficiency
                        </Label>
                        <Input
                            id="growthStage"
                            value={formData.growthStage}
                            onChange={(e) => setFormData({...formData, float: e.target.value})}
                            placeholder="Enter Water_usage_efficiency"
                            className="w-full"
                        />
                    </div>


                    <Button type="submit" className="w-full">
                        Add Plant
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

// Dashboard Component
const Dashboard = ({data}) => {
    return (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
                <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-lg md:text-xl">Plant Management</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                    <p className="text-2xl md:text-3xl font-bold">{data.plants.length}</p>
                    <p className="text-sm text-gray-500">Total Plants</p>
                </CardContent>
            </Card>

            <Card className="overflow-hidden">
                <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-lg md:text-xl">Plantation Areas</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                    <p className="text-2xl md:text-3xl font-bold">{data.areas.length}</p>
                    <p className="text-sm text-gray-500">Active Areas</p>
                </CardContent>
            </Card>

            <Card className="overflow-hidden sm:col-span-2 lg:col-span-1">
                <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-lg md:text-xl">Irrigation Plans</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                    <p className="text-2xl md:text-3xl font-bold">{data.irrigationPlans.length}</p>
                    <p className="text-sm text-gray-500">Active Plans</p>
                </CardContent>
            </Card>
        </div>
    );
};

// Main App Component
const SmartFarmApp = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeContent, setActiveContent] = useState('dashboard');
    const [data, setData] = useState({
        plants: [],
        areas: [],
        irrigationPlans: []
    });

    const handleMenuSelect = (menuItem) => {
        setActiveContent(menuItem);
    };

    const renderContent = () => {
        switch (activeContent) {
            case 'add-plant':
                return <PlantForm onSubmit={(data) => console.log('New plant:', data)} />;
            case 'view-plants':
                return (
                    <Card className="max-w-4xl mx-auto">
                        <CardHeader>
                            <CardTitle className="text-xl md:text-2xl">Plant List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.plants.map((plant, index) => (
                                    <div key={index} className="p-4 rounded-lg border">
                                        <h3 className="font-medium text-lg">{plant.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{plant.type}</p>
                                        <p className="text-sm text-gray-500">{plant.growthStage}</p>

                                    </div>
                                ))}
                                {data.plants.length === 0 && (
                                    <p className="text-center text-gray-500 py-8">No plants added yet</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                );
            default:
                return <Dashboard data={data} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="fixed top-0 left-0 right-0 bg-white border-b z-20">
                <div className="flex items-center justify-between px-4 py-3 lg:pl-8">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>

                    <h1 className="text-lg font-semibold"><FontAwesomeIcon icon="fa-solid fa-seedling" fixedWidth/>Smart Farm Dashboard</h1>
                    <div className="w-10" /> {/* Spacer for balance */}
                </div>
            </header>

            <NavigationMenu
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onMenuSelect={handleMenuSelect}
            />

            <main className="pt-16 lg:pl-64">
                <div className="container mx-auto p-4 md:p-6 lg:p-8">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default SmartFarmApp;