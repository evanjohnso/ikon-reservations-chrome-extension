import React from "react";

export function Calendar(props) {
  return (
    <input
      type="date"
      onChange={props.onChange}
      min={"2020-12-01"}
      max={"2021-05-05"}
    />
  );
}
