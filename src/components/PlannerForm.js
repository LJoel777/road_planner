import React, { useRef } from "react";
import styled from "styled-components";
import calculateRoute from "./calculateRoute";

const Form = styled.div`
  margin: 10px;
`;

const PlannerForm = (props) => {
  const platform = props.platform;
  const map = props.map;
  const startWayPoint = useRef();
  const destinationWayPoint = useRef();
  const table = useRef();

  const onSubmit = () => {
    if (startWayPoint.current.value == "" || destinationWayPoint.current.value == "") alert("All fields required");
    else calculateRoute(map, platform, startWayPoint, destinationWayPoint, table);
  };

  return (
    <Form>
      <input type="text" ref={startWayPoint} placeholder="Choose starting point..." />
      <input type="text" ref={destinationWayPoint} placeholder="Choose destination..." />
      <button type="submit" onClick={onSubmit}>
        Submit
      </button>
      <table id="table" className="display" ref={table}>
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
