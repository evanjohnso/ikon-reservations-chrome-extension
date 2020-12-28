import React from "react";

export function Calendar(props) {
  return <input type="date" onChange={props.onChange} />;
}
