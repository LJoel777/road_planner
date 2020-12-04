import H from "@here/maps-api-for-javascript";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

const API_KEY = process.env.REACT_APP_HERE_REST_API_KEY;
let router = null;
let map = null;
let table = null;
let routeLine;
let startMarker;
let endMarker;

const calculateRoute = (mapRef, platform, startWayPoint, destinationWayPoint, tableRef) => {
  router = platform.getRoutingService(null, 8);
  map = mapRef;
  table = tableRef;
  getGeoCode(startWayPoint.current.value, (data) => {
    let wayPointOne = data.items[0].position;

    getGeoCode(destinationWayPoint.current.value, (data) => {
      let wayPointTwo = data.items[0].position;
      const routingParamsWithPolyLine = getRoutingParameters(wayPointOne, wayPointTwo, "polyline");
      const routingParamsWithSummary = getRoutingParameters(wayPointOne, wayPointTwo, "summary");
      router.calculateRoute(routingParamsWithPolyLine, drawRoute, (error) => alert(error));
      router.calculateRoute(
        routingParamsWithSummary,
        (data) => showTable(getRoadValues(startWayPoint, destinationWayPoint, data)),
        (error) => alert(error)
      );
    });
  });
};

const getRoadValues = (start, end, data) => {
  start = start.current.value.charAt(0).toUpperCase() + start.current.value.slice(1);
  end = end.current.value.charAt(0).toUpperCase() + end.current.value.slice(1);
  return [start, end, data.routes[0].sections[0].summary.length, data.routes[0].sections[0].summary.duration];
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
  } else alert("Route not found!");
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

const showTable = (values) => {
  const outerHtml = `
    <tr>
      <th>${values[0]}</th>
      <th>${values[1]}</th>
      <th>${Math.round(values[2] / 1000)} km</th>
      <th>${Math.round(values[3] / 60)} min</th>
    </tr>
    `;
  table.current.querySelector("tbody").innerHTML = "";
  table.current.querySelector("tbody").insertAdjacentHTML("beforeend", outerHtml);
  $("#table").DataTable();
  table.current.style.display = "table";
};

export default calculateRoute;
