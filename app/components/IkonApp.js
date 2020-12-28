import React, { Component } from "react";
import { Calendar } from "./Calendar";
import { Dropdown } from "./Dropdown";
import { SelectedDays } from "./SelectedDays";
import { Step } from "./Step";

const SKI_RESORTS = {
  alta: resortLookup("alta"),
  bachelor: resortLookup("bachelor"),
  copper: resortLookup("copper"),
};

const defaultResort = Object.keys(SKI_RESORTS)[0];

const _localStorageSkiDaysKey = "daysIWantToSki";
const _localStorageResortKey = "ski_resort";

export class IkonApp extends Component {
  intervalKey = undefined;

  constructor(props) {
    super(props);
    var localStorageDays =
      JSON.parse(localStorage.getItem(_localStorageSkiDaysKey)) || [];
    var skiResort =
      localStorage.getItem(_localStorageResortKey) || defaultResort;
    this.state = { daysToSki: localStorageDays, skiResort };
    // this.intervalKey = this.pollOnInterval(this.state.daysToSki);
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
      return setInterval(() => this.pollIt(days), 10 * 1000);
    }
    return undefined;
  };

  pollIt = (daysIWantToSki) => {
    // var { availability_url, make_reservation_url } = SKI_RESORTS[
    //   this.state.skiResort
    // ];
    // fetch(availability_url)
    //   .then((response) => {
    //     if (response.ok) return response.json();
    //   })
    //   .then((days) => {
    //     console.log(`Checking for ${daysIWantToSki.join(", ")}`);
    //     days.forEach((dayInfo) => {
    //       daysIWantToSki
    //         .filter((d) => dayInfo.name.includes(d + " ")) // dont match on "Mar 22" when "Mar 2" was picked
    //         .filter((d) => doesDayHaveParking(dayInfo))
    //         .forEach((d) => notify_day_available(d, make_reservation_url));
    //     });
    //   });
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
        <Step text="Step 3: Test it out. Find a day that has openings, and make sure it works!" />
        <Step text="Step 4: Hang out, and pray to the almighty Ullr" />
      </div>
    );
  }
}

function resortLookup(resort) {
  switch (resort) {
    case "alta":
      return { label: "Alta Snowbird", code: 30 };
    case "bachelor":
      return { label: "Mount Bachelor", code: 30 };
    case "copper":
      return { label: "Copper Mountain", code: 30 };
  }
}
