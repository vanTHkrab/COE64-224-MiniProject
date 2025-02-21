"use strict";
import { Card, CardContent } from '@/components/ui/card';
import { IconType } from 'react-icons';
import React from 'react';


interface SensorCardProps {
    title: string;
    value: number | string;
    unit?: string;
    icon?: IconType;
}

export const SensorCard: React.FC<SensorCardProps> = ({ title, value, unit = '', icon: Icon }) => (
    <Card className="flex-1">
        <CardContent className="flex items-center p-4 space-x-4">
            {Icon && <Icon className="w-8 h-8 text-blue-500" aria-hidden="true" />}
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold">
                    {value}
                    {unit && <span className="text-lg"> {unit}</span>}
                </p>
            </div>
        </CardContent>
    </Card>
);
