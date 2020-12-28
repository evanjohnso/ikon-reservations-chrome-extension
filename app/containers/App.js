import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Header from "../components/Header";
import MainSection from "../components/MainSection";
import * as TodoActions from "../actions/todos";
import style from "./App.css";
import { IkonApp } from "../components/IkonApp";

@connect(
  (state) => ({
    todos: state.todos,
  }),
  (dispatch) => ({
    actions: bindActionCreators(TodoActions, dispatch),
  })
)
export default class App extends Component {
  render() {
    return (
      <div className={style.normal}>
        <Header />
        <IkonApp />
      </div>
    );
  }
}
