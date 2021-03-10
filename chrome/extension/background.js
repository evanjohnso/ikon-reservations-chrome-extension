const bluebird = require("bluebird");

global.Promise = bluebird;

function promisifier(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise((resolve) => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach((api) => bluebird.promisifyAll(obj[api], { promisifier }));
}

// let chrome extension api support Promise
promisifyAll(chrome, ["tabs", "windows", "browserAction", "contextMenus"]);
promisifyAll(chrome.storage, ["local"]);

require("./background/contextMenus");
require("./background/inject");
require("./background/badge");

///////////////////////////////////
// Ikon Pass Notification Center //
///////////////////////////////////

/**
 **********************************************************************************
 *  NOTE if you add a resort, you must add the same lookup in resorts.js as well!!
 **********************************************************************************
 */
function resortLookup(resort) {
  switch (resort) {
    case "bigsky":
      return { label: "Big Sky", code: 4 };
    case "brighton":
      return { label: "Brighton", code: 8 };
    case "crystal":
      return { label: "Crystal", code: 10 };
    case "snoqualmie":
      return { label: "Snoqualmie", code: 29 };
    case "winterpark":
      return { label: "Winter Park", code: 34 };
    case "taos":
      return { label: "Taos", code: 31 };
    case "winterpark":
      return { label: "Winter Park", code: 34 };
  }
}

// FORMAT => resortId: intervalId
const INTERVAL_BUCKET = {};

chrome.runtime.onMessage.addListener((data) => {
  if (data.type === "notification") {
    chrome.notifications.onClicked.addListener(notificationCallBack);
    chrome.notifications.create("", data.options);
  }
});

chrome.runtime.onMessage.addListener((data) => {
  if (data.type === "launchPollingForAvailableDays") {
    var resortId = data["resortId"];
    var selectedDays = data["selectedDays"];

    if (resortId && selectedDays && selectedDays.length) {
      // request right away
      requestAvailability(resortId, selectedDays);

      // also, request on interval
      var intervalId = setInterval(
        () => requestAvailability(resortId, selectedDays),
        10 * 1000
      );

      resetInterval(resortId);
      INTERVAL_BUCKET[resortId] = intervalId; // save the new Id
    }
  } else if (data.type === "cancelPolling") {
    // cancel the polling function
    var resortId = data["resortId"];
    resetInterval(resortId);
  }
});

function resetInterval(resortId) {
  var intervalId = INTERVAL_BUCKET[resortId];
    if (intervalId) {
      clearAllSystemNotifications(); // get rid of all the stale notifications
      clearInterval(intervalId);
      delete INTERVAL_BUCKET[resortId];
    }
}

function notificationCallBack() {
  chrome.runtime.sendMessage("", { type: "notificationClicked" });
}

function requestAvailability(resortId, selectedDays) {
  var url =
    "https://account.ikonpass.com/api/v2/reservation-availability/" +
    resortLookup(resortId).code;

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
    .then((data) => parseResponse(data, selectedDays, resortId));
}

function parseResponse(rawData, daysIWantToSki, resortId) {
  console.log(`Checking ${resortId} for ${daysIWantToSki.join(", ")}`);

  var unavailableDates = rawData["data"][0]["unavailable_dates"];
  daysIWantToSki.forEach((date) => {
    if (date) {
      var inList = unavailableDates.some((d) => d === date);
      if (!inList) {
        reservationNotification(date, resortId);
      }
    }
  });
}

function __launchNotification(title, message) {
  chrome.notifications.create("", {
    title,
    message,
    iconUrl: "img/snowflake.png",
    type: "basic",
    isClickable: true,
  });
}

function reservationNotification(day, resortId) {
  __launchNotification(
    `${resortLookup(resortId).label} available on ${transformDate(day)}!!`,
    "Quick, go make the reservation!"
  );
}

function errorNotification(message) {
  __launchNotification(`Something isn't quite right`, message);
}

function clearAllSystemNotifications() {
  chrome.notifications.getAll((items) => {
    if (items) {
      for (let key in items) {
        chrome.notifications.clear(key);
      }
    }
  });
}

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

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
