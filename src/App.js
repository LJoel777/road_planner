import React from "react";
import Map from "./components/Map";
import PlannerForm from "./components/PlannerForm";
import { LocationContextProvider } from "./context/LocationContext";
import { MapAndPlatformContextProvider } from "./context/MapAndPlatformContext";

const App = () => {
  return (
    <div className="app-container">
      <MapAndPlatformContextProvider>
        <Map />
        <LocationContextProvider>
          <PlannerForm />
        </LocationContextProvider>
      </MapAndPlatformContextProvider>
    </div>
  );
};

export default App;
