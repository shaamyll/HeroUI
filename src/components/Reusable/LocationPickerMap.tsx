import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';
import 'leaflet/dist/leaflet.css';

interface LocationPickerMapProps {
  center?: [number, number];
  zoom?: number;
  style?: React.CSSProperties;
  className?: string;
  onLocationSelect?: (lat: number, lng: number) => void;
  initialPosition?: [number, number];
  showInstructions?: boolean;
  markerColor?: string;
}

const LocationPickerMap: React.FC<LocationPickerMapProps> = ({
  center = [24.7136, 46.6753], // Default to Saudi Arabia (Riyadh)
  zoom = 13,
  style = { height: '400px', width: '100%' },
  className = '',
  onLocationSelect,
  initialPosition,
  showInstructions = true,
  markerColor = '#dc2626'
}) => {
  const [position, setPosition] = useState<[number, number] | null>(initialPosition || null);

  // Custom icon using Lucide MapPin
  const LocationIcon = L.divIcon({
    className: 'custom-location-icon',
    html: `<div style="display: flex; justify-content: center; align-items: center; font-size: 24px; color: ${markerColor};">
             ${ReactDOMServer.renderToStaticMarkup(<MapPin />)}
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  // Component to handle map clicks
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        setPosition([lat, lng]);
        onLocationSelect?.(lat, lng);
      },
    });

    return position ? (
      <Marker position={position} icon={LocationIcon} />
    ) : null;
  };

  return (
    <div className={`relative ${className}`}>
      <MapContainer
        center={position || center}
        zoom={zoom}
        style={style}
        className="rounded-lg shadow-lg z-10"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
      
      {showInstructions && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-md px-3 py-2 text-sm text-gray-600 shadow-md z-20">
          Click on the map to set location
        </div>
      )}
    </div>
  );
};

export default LocationPickerMap;