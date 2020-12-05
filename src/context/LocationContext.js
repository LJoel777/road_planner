import React, { createContext, useState } from "react";

export const LocationContext = createContext();

export const LocationContextProvider = (props) => {
  const [route, setRoute] = useState();
  const [locationsName, setLocationsName] = useState();
  return (
    <LocationContext.Provider
      value={{
        route: route,
        setRoute: setRoute,
        locationsName: locationsName,
        setLocationsName: setLocationsName,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};
