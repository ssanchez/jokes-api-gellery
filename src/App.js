import React, { Component } from "react";
import "./App.css";

class App extends Component {
  handleClick = () => {
    fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(({ joke }) => {
        console.log(joke);
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <article>
        <button type="button" onClick={this.handleClick}>
          get a joke
        </button>
      </article>
    );
  }
}

export default App;
