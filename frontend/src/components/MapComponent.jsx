import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Send from '../assets/mapMarker.svg';
import styles from './MapComponent.module.css';

const MapComponent = ({ wkbString, address }) => {
  const [position, setPosition] = useState([0, 0]); // Начальные координаты
  const customIcon = new L.Icon({
    iconUrl: Send,
    iconSize: [32, 32], // Размеры иконки
    iconAnchor: [16, 16], // Где расположена "ножка" иконки
  });

  useEffect(() => {
    // Функция для распаковки WKB
    function unpackWKB(wkbString) {
      const hexString = wkbString.substring(2); // Удаляем префикс WKB
      const coordinates = [];
      for (let i = 0; i < hexString.length; i += 2) {
        coordinates.push(parseInt(hexString.substr(i, 2), 16));
      }
      return coordinates;
    }


    const coordinates = unpackWKB(wkbString);

    // Установка начальных координат
    setPosition([coordinates[1], coordinates[0]]);

    return () => {
      // Очистка ресурсов при размонтировании компонента (если необходимо)
    };
  }, [wkbString]);

  return (
    <div className={styles.map} style={{ height: '200px', width: '100%' }}>
      <MapContainer center={position} zoom={4} style={{ height: '100%', width: '100%', borderRadius: '20px' }} 
      whenCreated={mapInstance => {
        mapInstance.flyTo(position, 13); // Плавно переместить карту к маркеру
      }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <Marker position={position} icon={customIcon}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    </div>  );
};

export default MapComponent;
