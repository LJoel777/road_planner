import React, { useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import setUp from "./mapSetUp";
import { MapAndPlatformContext } from "../context/MapAndPlatformContext";

const MapContainer = styled.div`
  flex: 2;
  width: 100vw;
  height: 85vh;
`;

const Map = () => {
  const setMap = useContext(MapAndPlatformContext).setMap;
  const setPlatform = useContext(MapAndPlatformContext).setPlatform;
  const mapRef = useRef();

  useEffect(() => {
    const data = setUp(mapRef);
    setMap(data.map);
    setPlatform(data.platform);
  }, []);

  return <MapContainer ref={mapRef} className="mapContainer"></MapContainer>;
};

export default Map;
