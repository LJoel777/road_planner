import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import setUp from "./mapSetUp";

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Map = (props) => {
  const setMap = props.map;
  const setPlatform = props.platform;
  const mapRef = useRef();

  useEffect(() => {
    const data = setUp(mapRef);
    setMap(data.map);
    setPlatform(data.platform);
  }, []);

  return <MapContainer ref={mapRef} className="mapContainer"></MapContainer>;
};

export default Map;
