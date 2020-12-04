import H from "@here/maps-api-for-javascript";
import onResize from "simple-element-resize-detector";

const setUp = (mapRef) => {
  const platform = new H.service.Platform({
    apikey: process.env.REACT_APP_HERE_API_KEY,
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
  return { map: map, platform: platform };
};

export default setUp;
