import H from "@here/maps-api-for-javascript";

const API_KEY = "4jT00cTYzYKV-lhBKaSLaGw5NxljCfqOWAA0hDibxA0";
let router = null;
let map = null;
let routeLine;
let startMarker;
let endMarker;

const calculateRoute = (map1, platform, startWayPoint, destinationWayPoint, table) => {
  router = platform.getRoutingService(null, 8);
  map = map1;
  getGeoCode(startWayPoint.current.value, (data) => {
    let wayPointOne = data.items[0].position;

    getGeoCode(destinationWayPoint.current.value, (data) => {
      let wayPointTwo = data.items[0].position;
      const routingParamsWithPolyLine = getRoutingParameters(wayPointOne, wayPointTwo, "polyline");
      router.calculateRoute(routingParamsWithPolyLine, drawRoute, (error) => alert(error));
    });
  });
};

const getRoutingParameters = (startWayPoint, destinationWayPoint, returnType) => {
  return {
    routingMode: "fast",
    transportMode: "car",
    origin: `${startWayPoint.lat},${startWayPoint.lng}`,
    destination: `${destinationWayPoint.lat},${destinationWayPoint.lng}`,
    return: returnType,
  };
};

const drawRoute = function (result) {
  console.log(result);
  if (routeLine) map.removeObject(routeLine);
  if (startMarker) map.removeObject(startMarker);
  if (endMarker) map.removeObject(endMarker);
  if (result.routes.length) {
    result.routes[0].sections.forEach((section) => {
      let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

      routeLine = new H.map.Polyline(linestring, {
        style: { strokeColor: "blue", lineWidth: 3 },
      });

      startMarker = new H.map.Marker(section.departure.place.location);
      endMarker = new H.map.Marker(section.arrival.place.location);

      map.addObjects([routeLine, startMarker, endMarker]);
      map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
    });
  }
};

const getGeoCode = (location, callback) => {
  fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${location}&apiKey=${API_KEY}`)
    .then((res) => res.json())
    .then((res) => {
      if (res.error) alert("ApiKey invalid or expired!");
      else {
        if (res.items.length) callback(res);
        else alert(`Location (${location}) not found!`);
      }
    });
};

const showTable = (values) => {};

export default calculateRoute;
