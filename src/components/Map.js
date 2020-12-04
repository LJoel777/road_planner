import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import setUp from "./mapSetUp";

const MapContainer = styled.div`
  width: 100vw;
  height: 80vh;
`;

const Map = (props) => {
  const setMap = props.map;
  const setPlatform = props.platform;
  const [loading, setLoading] = useState(true);
  const mapRef = useRef();

  useEffect(() => {
    setLoading(true);
    const data = setUp(mapRef);
    setMap(data.map);
    setPlatform(data.platform);
    setLoading(false);
  }, []);

  return (
    <div className="container">
      <MapContainer ref={mapRef} className="mapContainer"></MapContainer>
    </div>
  );
};

export default Map;
