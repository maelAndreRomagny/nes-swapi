import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const character = {
  name: "Luke Skywalker",
  birthyear: "19BBY",
  gender: "male"
};

const emptychar = {
  name: "",
  birthyear: "",
  gender: ""
};

class HeartToggle extends Component {
  constructor(props) {
    super(props);

    this.name = "";
    this.gender = "";
    this.birthyear = "";

    this.state = { heartState: false };
  }

  onHeartClick() {
    if (this.state.heartState) {
      this.setState({ heartState: false });
      this.Character(emptychar);
    } else {
      this.setState({ heartState: true });
      this.Character(character);
    }
  }

  Character(perso) {
    this.name = perso.name;
    this.gender = perso.gender;
    this.birthyear = perso.birthyear;
  }

  render() {
    return (
      <div className="nes-container with-title dt ma3 relative center">
        <span className="title">{this.name}</span>

        <div className="fl">
          <p>Gender: {this.gender}</p>
          <p>Birth: {this.birthyear}</p>
        </div>
        <div className="di ma3">
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
