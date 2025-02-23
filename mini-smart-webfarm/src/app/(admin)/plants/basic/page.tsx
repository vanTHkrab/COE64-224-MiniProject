"use client"
import React, { useState, useEffect } from 'react';
import {Sidebar} from "@/components/sidebar";
import {Header} from "@/components/header";

interface Plant {
    plant: string;
    growth_stage: string;
}

const BasicPage = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        fetchPlants().then()
    }, []);

    const fetchPlants = async () => {
        const response = await fetch('/api/plants',
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        const data = await response.json();
        console.log(data);
        data.forEach(addRow);
    };

    function addRow(plant: Plant) {
        const table = document.getElementById("list-plant") as HTMLTableElement;
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = plant.plant;
        cell2.innerHTML = plant.growth_stage;
    }

    return (
        <div>
            <Header onMenuClick={() => setIsSidebarOpen(true)}/>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>

            <main className="fixed top-16 left-0 lg:left-72 right-0 bottom-0 p-6 overflow-auto">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-semibold">Basic Plant Information</h1>
                    <p className="text-gray-500">Add basic plant information</p>
                </div>

                <table className="w-full mt-6 bg-white rounded-lg shadow-md">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-gray-100">Plant</th>
                            <th className="py-2 px-4 bg-gray-100">Growth Stage</th>
                        </tr>
                    </thead>
                    <tbody id="list-plant"></tbody>
                </table>

            </main>
        </div>
    );
};

export default BasicPage;