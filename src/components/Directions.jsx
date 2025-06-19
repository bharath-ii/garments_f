import React, { useState, useRef } from 'react';
import Map, {
  Marker,
  Source,
  Layer,
  NavigationControl,
  GeolocateControl,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import carIcon from '../assets/download (1).png';
import bikeIcon from '../assets/pngtree-vector-cycling-icon-png-image_5159300.jpg';
import { ImRocket } from "react-icons/im";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

// ✅ Updated company coordinates
const COMPANY_COORDINATES = [77.230440, 11.324998];

const DIRECTIONS_STYLE = {
  id: 'line-route',
  type: 'line',
  source: 'route',
  layout: { 'line-join': 'round', 'line-cap': 'round' },
  paint: { 'line-color': '#ff0000', 'line-width': 4 },
};

const Directions = () => {
  const [from, setFrom] = useState('');
  const [fromCoords, setFromCoords] = useState(null);
  const [mode, setMode] = useState('driving');
  const [routeGeoJSON, setRouteGeoJSON] = useState(null);
  const [loading, setLoading] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);
  const mapRef = useRef();

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.longitude, pos.coords.latitude];
          setFromCoords(coords);
          setFrom('Current Location');
        },
        (err) => {
          alert('Error getting your location.');
          console.error(err);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleGetRoute = async () => {
    try {
      setLoading(true);
      setRouteGeoJSON(null);
      setRouteInfo(null);

      let startCoords = fromCoords;

      if (!startCoords && from && from !== 'Current Location') {
        const geoRes = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(from)}.json`,
          { params: { access_token: MAPBOX_TOKEN } }
        );

        startCoords = geoRes.data.features[0]?.center;
        if (!startCoords) {
          alert('Could not find the given address.');
          setLoading(false);
          return;
        }
        setFromCoords(startCoords);
      }

      if (!startCoords) {
        alert('Please enter or use current location.');
        setLoading(false);
        return;
      }

      const coords = `${startCoords[0]},${startCoords[1]};${COMPANY_COORDINATES[0]},${COMPANY_COORDINATES[1]}`;
      const dirRes = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/${mode}/${coords}`,
        {
          params: {
            geometries: 'geojson',
            access_token: MAPBOX_TOKEN,
          },
        }
      );

      const route = dirRes.data.routes[0];
      if (!route) {
        alert('Could not find a route.');
        setLoading(false);
        return;
      }

      setRouteGeoJSON(route.geometry);
      setRouteInfo({
        distance: route.distance,
        duration: route.duration,
      });

      const map = mapRef.current.getMap();
      const bounds = route.geometry.coordinates.reduce(
        (b, coord) => b.extend(coord),
        new mapboxgl.LngLatBounds(route.geometry.coordinates[0], route.geometry.coordinates[0])
      );
      map.fitBounds(bounds, { padding: 60 });
    } catch (error) {
      console.error(error);
      alert('Error generating route.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F89484] font-sans flex flex-col">
      <div className="bg-white shadow-lg p-6 max-w-3xl mx-auto mt-8 mb-4 w-[95%] ">
        <h2 className="text-2xl font-bold text-red-600 mb-4 flex justify-center items-center gap-2">
          Get Directions <ImRocket />
        </h2>

        <div className="space-y-4">
          {/* From Location Input */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Enter Starting Point"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                setFromCoords(null);
              }}
              className="flex-1 border border-gray-300 px-3 py-2"
            />
            <button
              onClick={handleUseCurrentLocation}
              className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
            >
              Use My Location
            </button>
          </div>

          {/* Fixed Company Location Display */}
          <input
            type="text"
            value="Sri Mahalakshmi Garments🪡"
            readOnly
            className="w-full border border-gray-300 bg-gray-100 px-3 py-2"
          />

          {/* Mode Select + Button */}
          <div className="flex items-center flex-wrap gap-4 mt-2">
            <button
              onClick={() => setMode('driving')}
              className={`p-2 border ${
                mode === 'driving' ? 'border-red-500 bg-red-100' : 'border-gray-300'
              }`}
            >
              <img src={carIcon} alt="Car" className="h-6 w-6" />
            </button>
            <button
              onClick={() => setMode('cycling')}
              className={`p-2 border ${
                mode === 'cycling' ? 'border-red-500 bg-red-100' : 'border-gray-300'
              }`}
            >
              <img src={bikeIcon} alt="Bike" className="h-6 w-6" />
            </button>
            <button
              onClick={handleGetRoute}
              className="ml-auto bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition"
            >
              {loading ? 'Generating...' : 'Show Route'}
            </button>
          </div>

          {/* Messages */}
          {loading && (
            <p className="text-blue-600 font-medium mt-2">Generating route, please wait...</p>
          )}
          {!loading && routeGeoJSON && (
            <p className="text-green-600 font-medium mt-2">✅ Route generated successfully!</p>
          )}

          {/* Route Info */}
          {routeInfo && (
            <>
              <p className="text-gray-700 mt-1">
                <strong>Distance:</strong> {(routeInfo.distance / 1000).toFixed(2)} km<br />
                <strong>ETA:</strong> {(routeInfo.duration / 60).toFixed(1)} mins
              </p>
              <p
                className={`text-sm font-semibold mt-1 ${
                  routeInfo.distance / 1000 <= 20 ? 'text-green-700' : 'text-red-600'
                }`}
              >
                {routeInfo.distance / 1000 <= 20
                  ? '✅ Within 20 kms pickup and drop is available.'
                  : '❌ Pickup/Drop not available for distances over 20 kms.'}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Map View */}
      <div className="mx-4 mb-6 overflow-hidden shadow-lg" style={{ height: '500px' }}>
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: COMPANY_COORDINATES[0],
            latitude: COMPANY_COORDINATES[1],
            zoom: 12,
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <NavigationControl position="top-right" />
          <GeolocateControl position="top-right" />

          {/* Company Marker */}
          <Marker
            longitude={COMPANY_COORDINATES[0]}
            latitude={COMPANY_COORDINATES[1]}
            anchor="bottom"
          >
            <div className="h-6 w-6 bg-red-500 rounded-full border-2 border-white" />
          </Marker>

          {/* User Marker */}
          {fromCoords && (
            <Marker longitude={fromCoords[0]} latitude={fromCoords[1]} anchor="bottom">
              <div className="h-6 w-6 bg-blue-500 rounded-full border-2 border-white" />
            </Marker>
          )}

          {/* Route */}
          {routeGeoJSON && (
            <Source id="route" type="geojson" data={routeGeoJSON}>
              <Layer {...DIRECTIONS_STYLE} />
            </Source>
          )}
        </Map>
      </div>
    </div>
  );
};

export default Directions;
