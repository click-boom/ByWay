"use client";
import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Feature from "ol/Feature";
import Map from "ol/Map";
import View from "ol/View";
import Point from "ol/geom/Point";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { Style } from "ol/style";
import Icon from "ol/style/Icon";

interface ClientMapProps {
  id: string;
}

interface Location {
  longitude: number;
  latitude: number;
}

export const ClientMap: React.FC<ClientMapProps> = ({ id }) => {
  const mapRef = useRef<Map | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch locations from the server
        const response = await fetch("http://localhost:8081/maps/getCoordinates");
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (locations.length > 0) {
      if (!mapRef.current) {
        const mapInstance = new Map({
          target: id,
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: fromLonLat([84.138244, 28.402031]),
            zoom: 3,
            maxZoom: 30,
            minZoom: 7.5,
          }),
        });

        mapRef.current = mapInstance;
      }

      const markerLayer = new VectorLayer({
        source: new VectorSource(),
        style: new Style({
          image: new Icon({
            src: "/assets/pointer.svg",
            anchor: [0.5, 1],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            scale: 0.5,
          }),
        }),
      });

      mapRef.current.addLayer(markerLayer);

      // Add a new feature for each location
      const mapSource = markerLayer.getSource();
      locations.forEach((location) => {
        mapSource?.addFeature(
          new Feature({
            geometry: new Point([location.longitude, location.latitude]),
          })
        );
      });
    }
  }, [locations, id]);

  return (
    <div className="w-full h-full p-16">
      <div
        id={id}
        className="mx-auto w-full h-[70vh] border border-gray-300 rounded"
      ></div>
    </div>
  );
};
