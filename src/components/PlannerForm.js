import React, { useRef } from "react";
import styled from "styled-components";
import calculateRoute from "./calculateRoute";
import RoomIcon from "@material-ui/icons/Room";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
    table {
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

const PlannerForm = (props) => {
  const platform = props.platform;
  const map = props.map;
  const startWayPoint = useRef();
  const destinationWayPoint = useRef();
  const table = useRef();

  const onSubmit = () => {
    if (startWayPoint.current.value === "" || destinationWayPoint.current.value === "") alert("All fields required");
    else calculateRoute(map, platform, startWayPoint, destinationWayPoint, table);
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
      <div className="table-container">
        <table id="table" ref={table}>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Distance</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </Form>
  );
};

export default PlannerForm;
