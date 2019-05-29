import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class HeartToggle extends Component {
  constructor(props) {
    super(props);
    this.state = { heartState: true };
  }

  onHeartClick() {
    if (this.state.heartState) {
      this.setState({ heartState: false });
    } else {
      this.setState({ heartState: true });
    }
  }

  render() {
    return (
      <div className="nes-container with-title dt ma3">
        <span className="title">Star Wars character</span>

        <div className="fl">
          <p>Name: </p>
          <p>Gender: </p>
          <p>Birth: </p>
          <p>Homeworld: </p>
          <p>Species: </p>
        </div>
        <div className="di">
          {this.state.heartState ? (
            <i
              className="nes-icon is-large heart fr"
              onClick={() => this.onHeartClick()}
            />
          ) : (
            <i
              className="nes-icon is-large heart is-empty fr"
              onClick={() => this.onHeartClick()}
            />
          )}
        </div>
      </div>
    );
  }
}

export default HeartToggle;

const rootElement = document.getElementById("root");
ReactDOM.render(<HeartToggle />, rootElement);
