import React, { useState } from "react";
import Map from "./components/Map";
import PlannerForm from "./components/PlannerForm";

const App = () => {
  const [map, setMap] = useState();
  const [platform, setPlatform] = useState();

  const Form = map && platform ? <PlannerForm map={map} platform={platform} /> : "";
  return (
    <div className="app-container">
      <Map map={setMap.bind(this)} platform={setPlatform.bind(this)} />
      {Form}
    </div>
  );
};

export default App;
