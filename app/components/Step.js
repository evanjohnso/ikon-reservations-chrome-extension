import React from "react";
import { Row } from "./Row";

export function Step(props) {
  return (
    <Row>
      <div style={{ fontSize: "15px", width: "40%" }}>{props.text}</div>
      {props.children}
    </Row>
  );
}
