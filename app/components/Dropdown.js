import React from "react";

export function Dropdown(props) {
  return (
    <div>
      <select
        id="mountainSelect"
        name="mountains"
        onChange={props.onChange}
        value={props.selectedValue}
      >
        {props.values.map((val) => {
          return (
            <option value={val} key={val}>
              {props.renderLabel(val)}
            </option>
          );
        })}
      </select>
    </div>
  );
}
