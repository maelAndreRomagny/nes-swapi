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

function Character({ character, heartFull, onHeartClicked }) {
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

function searchSWApi(inputText) {
  //Ne semble pas fonctionner
  return fetch(`https://swapi.co/api/people/?search=${inputText}/`).then(
    response => (response.status === 200 ? response.json() : null)
  );
}

class HeartToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: "",
      character: null,
      heartFull: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  onHeartClick() {
    this.setState(state => ({
      heartFull: toggle(state.heartFull)
    }));
  }

  fillInfo = () => {
    this.setState({ notFound: false, loading: true });
    searchSWApi(this.state.textInput)
      .then(character =>
        character
          ? this.setState({ character: character }) //Ne transfert pas le tableau de données
          : this.setState({ notFound: true })
      )
      .catch(error => console.error(error))
      .finally(() => this.setState({ loading: false }));
    console.log(this.state.character);
  };

  handleChange(event) {
    this.setState({ textInput: event.target.value });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loading && <h3>Recherche en cours...</h3>}
        {/*&& équivalent $$$ ? $$$$ : null*/}
        {this.state.notFound && <h3>Non trouvé</h3>}
        {this.state.character && (
          <Character
            heartFull={this.state.heartFull}
            onHeartClicked={() => this.onHeartClick()}
            character={this.state.character}
          />
        )}
        <div>
          <input
            type="text"
            id="search_field"
            className="nes-input"
            placeholder="Rechercher un personnage"
            onChange={this.handleChange}
            onKeyUp={e => {
              if (e.keyCode === 13) {
                e.preventDefault();
                this.fillInfo();
              }
            }}
          />
          <button
            onClick={() => this.fillInfo()}
            disabled={this.state.textInput.length === 0 || this.state.loading}
          >
            Rechercher
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default HeartToggle;

const rootElement = document.getElementById("root");
ReactDOM.render(<HeartToggle />, rootElement);
