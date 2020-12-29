import React, { Component } from "react";
import style from "./DateToSki.css";

export function DateToSki(props) {
  return (
    <div className={style.dateToSki}>
      {transformDate(props.day)}
      <span
        onClick={() => props.handleClick(props.day)}
        title="Actually, nah. Not tryna ski this day"
      >
        X
      </span>
    </div>
  );
}

function transformDate(rawDate) {
  var yearMonthDay = rawDate.split("-");
  var month = yearMonthDay[1];
  var day = yearMonthDay[2];
  return monthDateToWord(parseInt(month)) + " " + parseInt(day);
}

function monthDateToWord(int) {
  switch (int) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 8:
      return "Sept";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
  }
}
