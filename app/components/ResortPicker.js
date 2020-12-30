import React, { Component } from "react";
import { Calendar } from "./Calendar";
import { Dropdown } from "./Dropdown";
import { SelectedDays } from "./SelectedDays";
import { Step } from "./Step";
import { SKI_RESORTS, resortLookup, defaultResort } from "../constants/resorts";
import {
  launchAvailabilityRequestPolling,
  launchCancelPollingNotification,
} from "../utils/notifications";

const _localStorageSkiDaysKey = "daysIWantToSki";
const _localStorageResortKey = "ski_resort";

export class ResortPicker extends Component {
  constructor(props) {
    super(props);
    var localStorageDays =
      JSON.parse(localStorage.getItem(_localStorageSkiDaysKey)) || [];
    var skiResort =
      localStorage.getItem(_localStorageResortKey) || defaultResort;
    this.state = { daysToSki: localStorageDays, skiResort };
    this.pollOnInterval(this.state.daysToSki);
  }

  handleResortChange = (e) => {
    this.cancelCurrentPoll();

    var resort = e.target.value;
    localStorage.setItem(_localStorageResortKey, resort);

    // start a new polling
    this.setState({ skiResort: resort }, () => {
      // ensure it was after the state was set
      this.pollOnInterval(this.state.daysToSki);
    });
  };

  handleDateSelect = (e) => {
    var copy = [...this.state.daysToSki];
    var day = e.target.value;
    if (copy.indexOf(day) === -1) {
      copy.push(day);
      this.updateDaysToSki(copy);
    } else {
      console.log("Day already being searched");
    }
  };

  handleRemoveDay = (day) => {
    var copy = [...this.state.daysToSki];
    var removed = copy.filter((d) => d != day);
    this.updateDaysToSki(removed);
  };

  updateDaysToSki = (days) => {
    this.cancelCurrentPoll();

    localStorage.setItem(_localStorageSkiDaysKey, JSON.stringify(days));
    this.setState({ daysToSki: days }, () => {
      if (days && days.length) {
        // ensure its after the state was set
        this.pollOnInterval(days);
      }
    });
  };

  pollOnInterval = (days) => {
    launchAvailabilityRequestPolling(this.state.skiResort, days);
  };

  cancelCurrentPoll = () => {
    launchCancelPollingNotification(this.state.skiResort);
  };

  render() {
    return (
      <div>
        <Step text="Step 1: Select your hill">
          <Dropdown
            values={Object.keys(SKI_RESORTS)}
            onChange={this.handleResortChange}
            selectedValue={this.state.skiResort}
            renderLabel={(r) => resortLookup(r).label}
          />
        </Step>
        <Step text="Step 2: Select your days">
          <Calendar onChange={this.handleDateSelect} />
        </Step>
        <SelectedDays
          onRemove={this.handleRemoveDay}
          selectedDays={this.state.daysToSki}
        />
      </div>
    );
  }
}
