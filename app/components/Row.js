import React from "react";

export function Row(props) {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}
    >
      {props.children}
    </div>
  );
}
