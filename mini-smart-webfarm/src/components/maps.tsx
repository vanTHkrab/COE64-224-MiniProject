"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface CropData {
    id: number;
    plantation_area: string;
    latitude: number;
    longitude: number;
}

const MapDisplay = () => {
    const [crops, setCrops] = useState<CropData[]>([]);
    const defaultPos: LatLngTuple = [13.736717, 100.523186];

    useEffect(() => {
        fetch("/api/plantation-areas/map")
            .then((response) => response.json())
            .then((data) => setCrops(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // ✅ ฟังก์ชันอัปเดตค่าพิกัดเมื่อ Marker ถูกลาก
    const handleMarkerDragEnd = async (id: number, event: any) => {
        const { lat, lng } = event.target.getLatLng();
        const updatedCrops = crops.map((crop) =>
            crop.id === id ? { ...crop, latitude: lat, longitude: lng } : crop
        );
        setCrops(updatedCrops);

        // ✅ ส่งค่าพิกัดไปยัง API PUT โดยใช้ `id`
        try {
            const response = await fetch(`/api/plantation-areas/update/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ latitude: lat, longitude: lng }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to update");

            console.log("Updated successfully:", data);
        } catch (error) {
            console.error("Error updating coordinates:", error);
        }
    };

    return (
        <MapContainer
            center={defaultPos}
            zoom={6}
            scrollWheelZoom={true}
            style={{ height: "100vh", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {crops.map((crop) => (
                <Marker
                    key={crop.id}
                    position={[crop.latitude, crop.longitude] as LatLngTuple}
                    draggable={true} // ✅ ทำให้ลากได้
                    eventHandlers={{
                        dragend: (event) => handleMarkerDragEnd(crop.id, event), // ✅ อัปเดตค่าพิกัดเมื่อ Marker ถูกลาก
                    }}
                >
                    <Popup>
                        <strong>{crop.plantation_area}</strong>
                        <br />
                        Latitude: {crop.latitude.toFixed(6)}
                        <br />
                        Longitude: {crop.longitude.toFixed(6)}
                        <br />
                        <small>ลากเพื่อเปลี่ยนตำแหน่ง</small>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapDisplay;
