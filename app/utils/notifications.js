// const _commonNotificationOptions = {
//   iconUrl: "img/robot.png",
//   type: "basic",
//   isClickable: true,
// };

// export function errorNotification(message) {
//   chrome.runtime.sendMessage("", {
//     type: "notification",
//     options: {
//       title: "Something isn't right",
//       message: message.toString(),
//       ..._commonNotificationOptions,
//     },
//   });
// }

// export function reservationNotification(day) {
//   chrome.runtime.sendMessage("", {
//     type: "notification",
//     options: {
//       title: `Reservation is available for ${day}!!!`,
//       message: "Quick, go make the reservation!",
//       ..._commonNotificationOptions,
//     },
//   });
// }

export function launchAvailabilityRequestPolling(resortId, selectedDays) {
  chrome.runtime.sendMessage("", {
    type: "launchPollingForAvailableDays",
    resortId,
    selectedDays,
  });
}
