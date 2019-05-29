import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const character = {
  name: "Luke Skywalker",
  birth_year: "19BBY",
  gender: "male"
};

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

  Character() {
    return null;
  }

  render() {
    return (
      <div className="nes-container with-title dt ma3">
        <span className="title">{character.name}</span>

        <div className="fl">
          <p>Gender: </p>
          <p>Birth: </p>
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
