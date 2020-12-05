import React, { useRef, useContext } from "react";
import styled from "styled-components";
import RoomIcon from "@material-ui/icons/Room";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { LocationContext } from "../context/LocationContext";
import RouteCalculator from "./RouteCalculator";

const Form = styled.div`
  flex: 1;
  display: flex;
  background: #f5f8fa;
  width: 100%;
  padding: 10px;
  @media (max-width: 700px) {
    font-size: 0.7rem;
    flex-direction: column;
    justify-content: center;
    .table-container {
      margin-top: 20px;
      table {
        width: 80%;
      }
    }
  }
  .form {
    justify-content: center;
    display: flex;
    .icons {
      margin-top: 5px;
      display: flex;
      flex-direction: column;
    }
    .locations {
      margin-right: 20px;
      input {
        padding: 5px;
        margin-left: 5px;
        margin-bottom: 10px;
        border-radius: 5px;
        text-transform: capitalize;
        font-weight: bold;
      }
      button {
        margin-left: 5px;
        padding: 5px;
        border-radius: 5px;
        font-weight: bold;
        width: 98%;
      }
    }
  }
  .table-container {
    flex: 1;
    #table {
      border: solid;
      display: none;
      text-align: center;
    }
  }
  .dataTables_wrapper .dataTables_length,
  .dataTables_filter,
  .dataTables_info,
  .dataTables_paginate {
    display: none;
  }
`;

const PlannerForm = () => {
  const API_KEY = process.env.REACT_APP_HERE_REST_API_KEY;
  const startWayPoint = useRef();
  const destinationWayPoint = useRef();
  const setRoute = useContext(LocationContext).setRoute;
  const setLocationsName = useContext(LocationContext).setLocationsName;

  const onSubmit = () => {
    if (startWayPoint.current.value === "" || destinationWayPoint.current.value === "") alert("All fields required");
    else setLocations(startWayPoint.current.value, destinationWayPoint.current.value);
  };

  const getGeoCode = (location, callback) => {
    fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${location}&apiKey=${API_KEY}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) throw new Error("ApiKey invalid or expired!");
        else {
          if (res.items.length) callback(res);
          else alert(`Location (${location}) not found!`);
        }
      })
      .catch((error) => alert(error));
  };

  const setLocations = (startWayPoint, endWayPoint) => {
    getGeoCode(startWayPoint, (data) => {
      const startWayPointCord = data.items[0].position;
      getGeoCode(endWayPoint, (data) => {
        const endWayPointCord = data.items[0].position;
        const route = {
          startPos: startWayPointCord,
          endPos: endWayPointCord,
        };
        setLocationsName({ startLocName: startWayPoint, endLocName: endWayPoint });
        setRoute(route);
      });
    });
  };

  return (
    <Form>
      <div className="form">
        <div className="icons">
          <LocationSearchingIcon />
          <MoreVertIcon />
          <RoomIcon />
        </div>
        <div className="locations">
          <input type="text" ref={startWayPoint} placeholder="Choose starting point..." />
          <br />
          <input type="text" ref={destinationWayPoint} placeholder="Choose destination..." />
          <br />
          <button type="submit" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
      <RouteCalculator />
    </Form>
  );
};

export default PlannerForm;
