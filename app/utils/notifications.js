const _commonNotificationOptions = {
  iconUrl: "img/robot.png",
  type: "basic",
  isClickable: true,
};

export function errorNotification(message) {
  chrome.runtime.sendMessage("", {
    type: "notification",
    options: {
      title: "Something isn't right",
      message: message.toString(),
      ..._commonNotificationOptions,
    },
  });
}

export function reservationNotification(day) {
  chrome.runtime.sendMessage("", {
    type: "notification",
    options: {
      title: `Parking is available for ${day}!!!`,
      message: "Quick, click here to make the reservation!",
      ..._commonNotificationOptions,
    },
  });
}
