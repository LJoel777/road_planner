import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import H from "@here/maps-api-for-javascript";
import onResize from "simple-element-resize-detector";

const MapContainer = styled.div`
  width: 100vw;
  height: 80vh;
`;

const Map = () => {
  const [map, setMap] = useState();
  const [platform, setPlatform] = useState();
  const [loading, setLoading] = useState(true);
  const mapRef = useRef();

  useEffect(() => {
    setLoading(true);
    const platform = new H.service.Platform({
      apikey: "rccZWM00Ce0L6xWuzrWmondQKje9ki46cH-1-bAC2Wc",
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      zoom: 10,
      center: { lat: 47.497913, lng: 19.040236 },
    });

    const mapEvents = new H.mapevents.MapEvents(map);
    new H.mapevents.Behavior(mapEvents);

    onResize(mapRef.current, () => {
      map.getViewPort().resize();
    });

    setPlatform(platform);
    setMap(map);
    setLoading(false);
  }, []);

  return (
    <div className="container">
      <MapContainer ref={mapRef} className="mapContainer"></MapContainer>
    </div>
  );
};

export default Map;
