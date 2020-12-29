import React from "react";

export function Calendar(props) {
  return (
    <input
      type="date"
      onChange={props.onChange}
      min={todayAsString()}
      max={"2021-05-05"}
    />
  );
}

function todayAsString() {
  var o_date = new Intl.DateTimeFormat();
  var f_date = (m_ca, m_it) => Object({ ...m_ca, [m_it.type]: m_it.value });
  var m_date = o_date.formatToParts().reduce(f_date, {});
  return m_date.year + "-" + m_date.month + "-" + m_date.day;
}
