export function launchAvailabilityRequestPolling(resortId, selectedDays) {
  chrome.runtime.sendMessage("", {
    type: "launchPollingForAvailableDays",
    resortId,
    selectedDays,
  });
}

export function launchCancelPollingNotification(resortId) {
  chrome.runtime.sendMessage("", {
    type: "cancelPolling",
    resortId,
  });
}
