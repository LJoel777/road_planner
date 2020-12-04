import React, { useRef } from "react";
import styled from "styled-components";
import calculateRoute from "./calculateRoute";

const Form = styled.div`
  position: absolute;
  background: white;
  width: 100%;
  padding: 10px;
  bottom: 0;
  z-index: 1;
  .locations {
    input {
      padding: 5px;
      margin-left: 5px;
      margin-bottom: 10px;
      border-radius: 5px;
      text-transform: capitalize;
    }
    button {
      margin-left: 5px;
      padding: 5px;
      border-radius: 5px;
      font-weight: bold;
    }
  }
  table {
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
      <div className="locations">
        <input type="text" ref={startWayPoint} placeholder="Choose starting point..." />
        <input type="text" ref={destinationWayPoint} placeholder="Choose destination..." />
        <button type="submit" onClick={onSubmit}>
          Submit
        </button>
      </div>
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
    </Form>
  );
};

export default PlannerForm;
