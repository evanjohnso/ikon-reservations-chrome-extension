import React, { Component } from "react";
import { render } from "react-dom";
import Dock from "react-dock";

class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    return (
      <div>
        <button onClick={this.buttonOnClick}>Open TodoApp</button>
        <Dock
          position="right"
          dimMode="transparent"
          defaultSize={0.4}
          isVisible={this.state.isVisible}
        >
          <iframe
            style={{
              width: "100%",
              height: "100%",
            }}
            frameBorder={0}
            allowTransparency="true"
            src={chrome.extension.getURL(
              `inject.html?protocol=${location.protocol}`
            )}
          />
        </Dock>
      </div>
    );
  }
}

window.addEventListener("load", () => {
  const injectDOM = document.createElement("div");
  injectDOM.className = "inject-react-example";
  injectDOM.style.textAlign = "center";
  document.body.appendChild(injectDOM);
  // renders the Open TodoApp on GitHub.com only
  // render(<InjectApp />, injectDOM);
});

chrome.runtime.onMessage.addListener((data) => {
  if (data.type === "notificationClicked") {
    console.log("notification clicked");
    // BUSTED: opens a window in the context of the extension, not the browser
    window.open("_blank", "https://account.ikonpass.com");
  }
});
