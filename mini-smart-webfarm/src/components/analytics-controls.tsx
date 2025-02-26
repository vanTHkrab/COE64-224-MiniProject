"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin, Sprout, Calendar } from "lucide-react";

interface AnalyticsControlsProps {
    plantationAreas: any[];
    cropTypes: any[];
    selectedArea: string;
    setSelectedArea: (value: string) => void;
    selectedCrop: string;
    setSelectedCrop: (value: string) => void;
    selectedTimeRange: string;
    setSelectedTimeRange: (value: string) => void;
}

const AnalyticsControls: React.FC<AnalyticsControlsProps> = ({
                                                                 plantationAreas,
                                                                 cropTypes,
                                                                 selectedArea,
                                                                 setSelectedArea,
                                                                 selectedCrop,
                                                                 setSelectedCrop,
                                                                 selectedTimeRange,
                                                                 setSelectedTimeRange,
                                                             }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Plantation Area */}
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

            {/* Crop Type */}
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

            {/* Time Range */}
            <Card className="shadow-sm">
                <CardContent className="p-4 flex items-center gap-4">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                        <Label htmlFor="time-select" className="text-sm font-medium">
                            Time Range
                        </Label>
                        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
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
    );
};

export default AnalyticsControls;
