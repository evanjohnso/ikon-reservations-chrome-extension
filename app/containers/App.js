import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Header from "../components/Header";
import * as TodoActions from "../actions/todos";
import style from "./App.css";
import { ResortPicker } from "../components/ResortPicker";

@connect(
  (state) => ({
    todos: state.todos,
  }),
  (dispatch) => ({
    actions: bindActionCreators(TodoActions, dispatch),
  })
)
export class IkonApp extends Component {
  render() {
    return (
      <div className={style.normal}>
        <Header />
        <ResortPicker />
      </div>
    );
  }
}
