import React from "react";
import { Row } from "./Row";

export function Step(props) {
  return (
    <Row>
      <div style={{ fontSize: "21px", marginRight: "20px" }}>{props.text}</div>
      {props.children}
    </Row>
  );
}