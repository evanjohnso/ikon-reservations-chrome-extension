import React from "react";
import { DateToSki } from "./DateToSki";

export function SelectedDays(props) {
  var sorted = props.selectedDays.sort((a, b) => dateToNum(a) - dateToNum(b));
  return sorted && sorted.length ? (
    <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "10px" }}>
      {sorted.map((day) => {
        return <DateToSki handleClick={props.onRemove} day={day} key={day} />;
      })}
    </div>
  ) : null;
}

/**
 * Convert date "2021-01-03" to 20210103
 */
function dateToNum(d) {
  d = d.split("-");
  return Number(d[0] + d[1] + d[2]);
}
