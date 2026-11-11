import React, { useEffect, useRef, useState } from 'react';
import { MapPin, LocateFixed } from 'lucide-react';

const organizations = [
  { name: 'Pakistan Alpine Club', city: 'Islamabad, Pakistan', lat: 33.6844, lon: 73.0479 },
  { name: 'American Alpine Club', city: 'Golden, Colorado, USA', lat: 39.7555, lon: -105.2211 },
  { name: 'The Alpine Club', city: 'London, United Kingdom', lat: 51.5072, lon: -0.1276 },
  { name: 'International Climbing and Mountaineering Federation (UIAA)', city: 'Bern, Switzerland', lat: 46.9480, lon: 7.4474 },
];

const peaks = [
  { name: 'Mount Everest', range: 'Himalaya', elevation: '8,849 m', lat: 27.9881, lon: 86.9250 },
  { name: 'K2', range: 'Karakoram', elevation: '8,611 m', lat: 35.8808, lon: 76.5158 },
  { name: 'Denali', range: 'Alaska Range', elevation: '6,190 m', lat: 63.0695, lon: -151.0074 },
  { name: 'Kilimanjaro', range: 'Tanzania', elevation: '5,895 m', lat: -3.0674, lon: 37.3556 },
  { name: 'Aconcagua', range: 'Andes', elevation: '6,961 m', lat: -32.6532, lon: -70.0109 },
  { name: 'Mont Blanc', range: 'Alps', elevation: '4,806 m', lat: 45.8326, lon: 6.8652 },
  { name: 'Matterhorn', range: 'Pennine Alps', elevation: '4,478 m', lat: 45.9763, lon: 7.6586 },
  { name: 'Mount Fuji', range: 'Japan', elevation: '3,776 m', lat: 35.3606, lon: 138.7274 },
  { name: 'Annapurna I', range: 'Himalaya', elevation: '8,091 m', lat: 28.5958, lon: 83.8203 },
];

export default function MountainMap({ sectionTitle, onLocationChange }) {
  const mapElement = useRef(null);
  const mapInstance = useRef(null);
  const userMarker = useRef(null);
  const [mapMessage, setMapMessage] = useState('Select a marker to see a notable summit.');
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    const L = window.L;
    if (!L || !mapElement.current) {
      setMapMessage('The map library could not load. Check your internet connection and reload.');
      return undefined;
    }

    const map = L.map(mapElement.current, { scrollWheelZoom: false }).setView([24, 12], 2);
    mapInstance.current = map;
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    organizations.forEach((organization) => {
      L.circleMarker([organization.lat, organization.lon], { radius: 6, color: '#fff', weight: 2, fillColor: '#247c78', fillOpacity: 1 })
        .addTo(map).bindPopup(`<strong>${organization.name}</strong><br>${organization.city}`);
    });

    peaks.forEach((peak) => {
      L.circleMarker([peak.lat, peak.lon], {
        radius: 7,
        color: '#fff',
        weight: 2,
        fillColor: '#d88343',
        fillOpacity: 1,
      }).addTo(map).bindPopup(`<strong>${peak.name}</strong><br>${peak.range}<br>${peak.elevation}`);
    });

    window.setTimeout(() => map.invalidateSize(), 100);
    return () => {
      map.remove();
      mapInstance.current = null;
      userMarker.current = null;
    };
  }, []);

  const focusPeak = (peak) => {
    mapInstance.current?.setView([peak.lat, peak.lon], 7);
    setMapMessage(`${peak.name} · ${peak.range} · ${peak.elevation}`);
  };

  const locateVisitor = () => {
    if (!navigator.geolocation) {
      setMapMessage('This browser does not support location sharing.');
      return;
    }

    setLocating(true);
    setMapMessage('Waiting for location permission…');
    navigator.geolocation.getCurrentPosition((position) => {
      const location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      onLocationChange(location);
      setLocating(false);
      setMapMessage('Your location is marked on the map and shown in the bottom strip.');
      if (mapInstance.current && window.L) {
        const L = window.L;
        mapInstance.current.setView([location.latitude, location.longitude], 6);
        if (userMarker.current) userMarker.current.remove();
        userMarker.current = L.circleMarker([location.latitude, location.longitude], {
          radius: 9,
          color: '#fff',
          weight: 3,
          fillColor: '#3276d2',
          fillOpacity: 1,
        }).addTo(mapInstance.current).bindPopup('Your current location').openPopup();
      }
    }, (error) => {
      setLocating(false);
      setMapMessage(error.code === error.PERMISSION_DENIED
        ? 'Location was not shared. You can still explore the mountain markers.'
        : 'Could not get your location. You can still explore the mountain markers.');
    }, { enableHighAccuracy: false, timeout: 12000, maximumAge: 60000 });
  };

  return <section className="mountain-map-section section" id="mountain-map">
    {sectionTitle('EXPLORE PEAKS AND CLIMBING GROUPS', <>Notable mountain peaks<br/><em>around the world.</em></>, 'The map marks notable summits and mountaineering organizations. Select a marker for its name and location.')}
    <div className="map-toolbar">
      <p className="map-message" role="status">{mapMessage}</p>
      <button className="location-button" type="button" onClick={locateVisitor} disabled={locating}><LocateFixed size={17}/>{locating ? 'Finding you…' : 'Show my location'}</button>
    </div>
    <div ref={mapElement} className="mountain-map" aria-label="Interactive map of notable mountain peaks" />
    <div className="peak-list" aria-label="Notable mountain list">
      {peaks.map((peak) => <button type="button" className="peak-chip" key={peak.name} onClick={() => focusPeak(peak)}><MapPin size={14}/><span>{peak.name}<small>{peak.elevation}</small></span></button>)}
    </div>
  </section>;
}
