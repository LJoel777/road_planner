import React, { useRef } from "react";
import styled from "styled-components";

const Form = styled.div``;

const PlannerForm = (props) => {
  const platform = props.platform;
  const map = props.map;
  const startWayPoint = useRef();
  const destinationWayPoint = useRef();

  const onSubmit = () => {};

  return (
    <Form>
      <input type="text" ref={startWayPoint} placeholder="Choose starting point..." />
      <input type="text" ref={destinationWayPoint} placeholder="Choose destination..." />
      <button type="submit" onClick={onSubmit}>
        Submit
      </button>
    </Form>
  );
};

export default PlannerForm;
