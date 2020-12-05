import React, { createContext, useState } from "react";

export const MapAndPlatformContext = createContext();

export const MapAndPlatformContextProvider = (props) => {
  const [map, setMap] = useState();
  const [platform, setPlatform] = useState();
  return (
    <MapAndPlatformContext.Provider
      value={{
        map: map,
        setMap: setMap,
        platform: platform,
        setPlatform: setPlatform,
      }}
    >
      {props.children}
    </MapAndPlatformContext.Provider>
  );
};
