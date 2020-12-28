import React from "react";

export function DateToSki(props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "3px",
        height: 30,
        border: "1px solid grey",
        borderRadius: "4px",
        marginRight: "10px",
      }}
    >
      {props.day}
      <span
        onClick={() => props.handleClick(props.day)}
        style={{ cursor: "pointer", marginLeft: "5px" }}
        title="Actually, nah. Not tryna ski this day"
      >
        X
      </span>
    </div>
  );
}
