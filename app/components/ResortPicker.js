import React, { Component } from "react";
import { Calendar } from "./Calendar";
import { Dropdown } from "./Dropdown";
import { SelectedDays } from "./SelectedDays";
import { Step } from "./Step";
import { SKI_RESORTS, resortLookup, defaultResort } from "../constants/resorts";
import {
  errorNotification,
  reservationNotification,
} from "../utils/notifications";

const _localStorageSkiDaysKey = "daysIWantToSki";
const _localStorageResortKey = "ski_resort";

export class ResortPicker extends Component {
  intervalKey = undefined;

  constructor(props) {
    super(props);
    var localStorageDays =
      JSON.parse(localStorage.getItem(_localStorageSkiDaysKey)) || [];
    var skiResort =
      localStorage.getItem(_localStorageResortKey) || defaultResort;
    this.state = { daysToSki: localStorageDays, skiResort };
    this.intervalKey = this.pollOnInterval(this.state.daysToSki);
  }

  handleDateChange = (e) => {
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
    clearInterval(this.intervalKey); // clear polling function
    this.setState({ daysToSki: days });
    localStorage.setItem(_localStorageSkiDaysKey, JSON.stringify(days));
    this.intervalKey = this.pollOnInterval(days); // start polling again
  };

  pollOnInterval = (days) => {
    if (days && days.length) {
      this.pollIt(days); // call right away on a date change
      return setInterval(() => this.pollIt(days), 10 * 1000);
    }
    return undefined;
  };

  pollIt = (daysIWantToSki) => {
    var resortId = SKI_RESORTS[this.state.skiResort].code;
    requestAvailability(resortId, daysIWantToSki);
  };

  handleResortChange = (e) => {
    var resort = e.target.value;
    this.setState({ skiResort: resort });
    localStorage.setItem(_localStorageResortKey, resort);
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

function requestAvailability(resortId, selectedDays) {
  // use correct url
  var url =
    "https://account.ikonpass.com/api/v2/reservation-availability/" + resortId;

  // attach cookie for validation
  var headers = new Headers();
  headers.append("cookie", document.cookie);

  fetch(url, { headers })
    .then((res) => {
      if (res.ok) return res.json();
      else {
        errorNotification(
          "Make sure you are logged in to account.ikonpass.com"
        );
      }
    })
    .then((data) => parseResponse(data, selectedDays));
}

function parseResponse(rawData, daysIWantToSki) {
  console.log(`Checking for ${daysIWantToSki.join(", ")}`);
  var unavailableDates = rawData["data"][0]["unavailable_dates"];
  daysIWantToSki.forEach((date) => {
    var inList = unavailableDates.some((d) => d === date);
    if (!inList) {
      console.log("Found a day!", date);
      reservationNotification(date);
    }
  });
}
