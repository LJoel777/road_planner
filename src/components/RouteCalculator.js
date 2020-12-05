import React, { useEffect, useContext, useState } from "react";
import { LocationContext } from "../context/LocationContext";
import { MapAndPlatformContext } from "../context/MapAndPlatformContext";
import H from "@here/maps-api-for-javascript";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

const RouteCalculator = () => {
  const [routeData, setRoutData] = useState();
  const route = useContext(LocationContext).route;
  const locationsName = useContext(LocationContext).locationsName;
  const map = useContext(MapAndPlatformContext).map;
  const platform = useContext(MapAndPlatformContext).platform;
  let router = platform !== undefined ? platform.getRoutingService(null, 8) : null;
  let routeLine;
  let startMarker;
  let endMarker;

  const getRoadValues = (start, end, data) => {
    if (data.routes.length) {
      start = start.charAt(0).toUpperCase() + start.slice(1);
      end = end.charAt(0).toUpperCase() + end.slice(1);
      return {
        startLoc: start,
        endLoc: end,
        distance: Math.round(data.routes[0].sections[0].summary.length / 1000),
        duration: Math.round(data.routes[0].sections[0].summary.duration / 60),
      };
    } else return "";
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
    map.removeObjects(map.getObjects());
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

  const showTable = (values) => {
    setRoutData(values);
    $("#table").DataTable();
    $("#table").css("display", "table");
  };

  useEffect(() => {
    if (route !== undefined && map !== undefined && platform !== undefined) {
      const { startPos, endPos } = route;
      const routingParamsWithPolyLine = getRoutingParameters(startPos, endPos, "polyline");
      const routingParamsWithSummary = getRoutingParameters(startPos, endPos, "summary");
      router.calculateRoute(routingParamsWithPolyLine, drawRoute, (error) => alert(error));
      router.calculateRoute(
        routingParamsWithSummary,
        (data) => {
          let values = getRoadValues(locationsName.startLocName, locationsName.endLocName, data);
          if (values !== "") showTable(values);
        },
        (error) => alert(error)
      );
    }
  }, [route, map, platform]);

  const tableBody =
    routeData !== undefined ? (
      <tr>
        <th>{routeData.startLoc}</th>
        <th>{routeData.endLoc}</th>
        <th>{routeData.distance} km</th>
        <th>{routeData.duration} min</th>
      </tr>
    ) : (
      <tr></tr>
    );

  return (
    <div className="table-container">
      <table id="table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Distance</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </div>
  );
};

export default RouteCalculator;
