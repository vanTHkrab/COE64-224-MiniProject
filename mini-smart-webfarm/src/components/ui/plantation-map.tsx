"use client";
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Crops } from 'lucide-react';

// Convert React icon to URL for Leaflet
const createCustomIcon = (IconComponent, color) => {
    // Create a temporary DOM element
    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.top = '-1000px';
    element.style.left = '-1000px';
    document.body.appendChild(element);

    // Render the icon to SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '36');
    svg.setAttribute('height', '36');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('stroke', color);
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    // Create path based on icon type
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    if (IconComponent === 'MapPin') {
        path.setAttribute('d', 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z');
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '12');
        circle.setAttribute('cy', '10');
        circle.setAttribute('r', '3');
        svg.appendChild(circle);
    } else {
        path.setAttribute('d', 'M12 21V10M12 8V3M15 5.88 9 8.12M15 18.12 9 15.88M5 8.12 9 5.88M5 15.88l4-2.24');
    }

    svg.appendChild(path);
    element.appendChild(svg);

    // Convert to data URL
    const svgAsXML = new XMLSerializer().serializeToString(svg);
    const svgBase64 = btoa(svgAsXML);
    const dataUrl = `data:image/svg+xml;base64,${svgBase64}`;

    // Clean up
    document.body.removeChild(element);

    return L.icon({
        iconUrl: dataUrl,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
    });
};

const PlantationMap = ({
                           center = [1.3521, 103.8198], // Default: Singapore
                           zoom = 12,
                           mode = 'view', // 'view' or 'pick'
                           plantations = [],
                           onLocationSelect = () => {}
                       }) => {
    const mapRef = useRef(null);
    const leafletMapRef = useRef(null);
    const markersRef = useRef([]);
    const [hoveredPlantation, setHoveredPlantation] = useState(null);

    // Initialize map
    useEffect(() => {
        if (!mapRef.current) return;

        // Create map instance if it doesn't exist
        if (!leafletMapRef.current) {
            leafletMapRef.current = L.map(mapRef.current).setView(center, zoom);

            // Add tile layer
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(leafletMapRef.current);
        } else {
            // Just update the view if map already exists
            leafletMapRef.current.setView(center, zoom);
        }

        // Clean up function
        return () => {
            if (mode === 'pick') {
                leafletMapRef.current.off('click');
            }
        };
    }, []);

    // Handle map center changes
    useEffect(() => {
        if (leafletMapRef.current) {
            leafletMapRef.current.setView(center, zoom);
        }
    }, [center, zoom]);

    // Handle mode changes
    useEffect(() => {
        if (!leafletMapRef.current) return;

        // Clear any previous click handlers
        leafletMapRef.current.off('click');

        // Add click handler for pick mode
        if (mode === 'pick') {
            leafletMapRef.current.on('click', (e) => {
                // Create a temporary marker at the clicked location
                const tempMarker = L.marker(e.latlng, {
                    icon: createCustomIcon('MapPin', '#2563eb') // Blue marker
                }).addTo(leafletMapRef.current);

                // Remove any previous temporary markers
                markersRef.current.forEach(marker => {
                    if (marker.isTempMarker) {
                        marker.removeFrom(leafletMapRef.current);
                    }
                });

                // Add the new temporary marker to our ref
                tempMarker.isTempMarker = true;
                markersRef.current.push(tempMarker);

                onLocationSelect([e.latlng.lat, e.latlng.lng]);
            });
        }
    }, [mode, onLocationSelect]);

    // Generate a color based on plantation name for consistent coloring
    const getPlantationColor = (name) => {
        // Simple hash function to generate a color
        const colors = [
            '#ef4444', // Red
            '#f97316', // Orange
            '#f59e0b', // Amber
            '#84cc16', // Lime
            '#10b981', // Emerald
            '#06b6d4', // Cyan
            '#3b82f6', // Blue
            '#8b5cf6', // Violet
            '#d946ef', // Fuchsia
            '#ec4899'  // Pink
        ];

        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }

        return colors[Math.abs(hash) % colors.length];
    };

    // Update markers when plantations change
    useEffect(() => {
        if (!leafletMapRef.current) return;

        // Clear existing non-temporary markers
        markersRef.current = markersRef.current.filter(marker => {
            if (!marker.isTempMarker) {
                marker.removeFrom(leafletMapRef.current);
                return false;
            }
            return true;
        });

        // Group to hold all markers for fitting bounds
        const allMarkersGroup = L.featureGroup().addTo(leafletMapRef.current);

        // Add markers for each plantation location
        plantations.forEach(plantation => {
            const plantationColor = getPlantationColor(plantation.name);

            // Create a marker group for this plantation
            const plantationGroup = L.featureGroup().addTo(leafletMapRef.current);
            markersRef.current.push(plantationGroup);

            // Add plantation center marker (using a different icon)
            if (plantation.locations.length > 0) {
                // Calculate center of all locations
                const lats = plantation.locations.map(loc => loc.coordinates[0]);
                const lngs = plantation.locations.map(loc => loc.coordinates[1]);
                const centerLat = lats.reduce((a, b) => a + b, 0) / lats.length;
                const centerLng = lngs.reduce((a, b) => a + b, 0) / lngs.length;

                const plantationMarker = L.marker([centerLat, centerLng], {
                    icon: createCustomIcon('Crops', plantationColor)
                }).bindPopup(`<b>${plantation.name}</b><br>${plantation.size} hectares`);

                plantationMarker.addTo(plantationGroup);
                plantationMarker.addTo(allMarkersGroup);
            }

            // Add markers for each location in this plantation
            plantation.locations.forEach(location => {
                if (Array.isArray(location.coordinates) && location.coordinates.length === 2) {
                    const marker = L.marker(location.coordinates, {
                        icon: createCustomIcon('MapPin', plantationColor)
                    }).bindPopup(`<b>${plantation.name}</b><br>${location.name}`);

                    marker.addTo(plantationGroup);
                    marker.addTo(allMarkersGroup);

                    // Add hover functionality
                    marker.on('mouseover', () => {
                        marker.openPopup();
                        setHoveredPlantation(plantation.id);
                    });

                    marker.on('mouseout', () => {
                        marker.closePopup();
                        setHoveredPlantation(null);
                    });
                }
            });
        });

        // Fit bounds to show all markers if we have any
        if (allMarkersGroup.getLayers().length > 0) {
            leafletMapRef.current.fitBounds(allMarkersGroup.getBounds(), {
                padding: [50, 50]
            });
        }
    }, [plantations]);

    return (
        <div className="rounded-lg overflow-hidden border border-gray-200">
            <div
                ref={mapRef}
                className="h-64 w-full"
                style={{ zIndex: 1 }} // Ensure proper stacking in Next.js
            ></div>
            <div className="bg-gray-50 px-3 py-2 text-sm text-gray-500">
                {mode === 'view' ?
                    "Viewing plantation locations. Click the map button on a plantation to focus." :
                    "Click on the map to set location coordinates."}
            </div>
        </div>
    );
};

export default PlantationMap;