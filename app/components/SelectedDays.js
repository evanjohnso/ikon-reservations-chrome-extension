import React from "react";
import { DateToSki } from "./DateToSki";

export function SelectedDays(props) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {props.selectedDays.map((day) => {
        return <DateToSki handleClick={props.onRemove} day={day} key={day} />;
      })}
    </div>
  );
}
