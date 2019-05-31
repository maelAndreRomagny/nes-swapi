import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/* const character = {
  name: "Luke Skywalker",
  birthyear: "19BBY",
  gender: "male"
}; */

/* const character = {
  name: "",
  birthyear: "",
  gender: ""
}; */

function Character({ character, heartFull, onHeartClicked, getCharFromSWAPI }) {
  return (
    <div>
      <div className="nes-container with-title dt ma3 relative center">
        <span className="title">{character.name}</span>

        <div className="fl">
          <p>Gender: {character.gender}</p>
          <p>Birth: {character.birth_year}</p>
        </div>
        <div className="di ma3">
          <i
            className={`nes-icon is-large heart fr ${
              heartFull ? "" : "is-empty"
            }`}
            onClick={onHeartClicked}
          />
        </div>
      </div>
    </div>
  );
}

const toggle = b => !b;

class HeartToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: null,
      heartFull: false,
      randInt: 0,
      randMin: 1,
      randMax: 88
    };
  }

  componentDidMount() {
    this.fillInfo();
    this.onHeartClick();
  }

  generateNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  onHeartClick() {
    this.setState(state => ({
      heartFull: toggle(state.heartFull)
    }));
    this.fillInfo();
  }
  //88 personnages (perso random)
  getCharFromSWAPI() {
    //Mauvaise méthode
    this.state.randInt = this.generateNumber(
      this.state.randMin,
      this.state.randMax
    );

    return fetch(
      "https://swapi.co/api/people/" + this.state.randInt + "/"
    ).then(function(response) {
      return response.json();
    });
  }

  fillInfo() {
    this.getCharFromSWAPI()
      .then(character => this.setState({ character: character }))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.character ? (
          <p>Chargement...</p>
        ) : (
          <Character
            heartFull={this.state.heartFull}
            onHeartClicked={() => this.onHeartClick()}
            character={this.state.character}
          />
        )}
      </React.Fragment>
    );
  }
}

export default HeartToggle;

const rootElement = document.getElementById("root");
ReactDOM.render(<HeartToggle />, rootElement);
