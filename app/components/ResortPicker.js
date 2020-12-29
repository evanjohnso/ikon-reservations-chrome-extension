import React, { Component } from "react";
import { Calendar } from "./Calendar";
import { Dropdown } from "./Dropdown";
import { SelectedDays } from "./SelectedDays";
import { Step } from "./Step";
import { SKI_RESORTS, resortLookup, defaultResort } from "../constants/resorts";
import { launchAvailabilityRequestPolling } from "../utils/notifications";

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

  handleDateChange = (e) => {
    var copy = [...this.state.daysToSki];
    console.log(e.target.value);
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
    this.setState({ daysToSki: days });
    localStorage.setItem(_localStorageSkiDaysKey, JSON.stringify(days));
    this.pollOnInterval(days); // start polling again
  };

  pollOnInterval = (days) => {
    var resortId = SKI_RESORTS[this.state.skiResort].code;
    // the background task manages the interval
    launchAvailabilityRequestPolling(resortId, days);
  };

  handleResortChange = (e) => {
    this.pollOnInterval([]); // stop the first polling timer

    var resort = e.target.value;
    this.setState({ skiResort: resort });
    localStorage.setItem(_localStorageResortKey, resort);

    this.pollOnInterval(days); // start polling again
  };

  render() {
    return (
      <div>
        <SelectedDays
          onRemove={this.handleRemoveDay}
          selectedDays={this.state.daysToSki}
        />
        <Step text="Step 1: Select your hill">
          <Dropdown
            values={Object.keys(SKI_RESORTS)}
            onChange={this.handleResortChange}
            selectedValue={this.state.skiResort}
            renderLabel={(r) => resortLookup(r).label}
          />
        </Step>
        <Step text="Step 2: Select your days">
          <Calendar onChange={this.handleDateChange} />
        </Step>
      </div>
    );
  }
}
