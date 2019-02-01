import React, { Component } from "react";
import JokeFetcher from "./JokeFetcher";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <JokeFetcher
          api="https://icanhazdadjoke.com/"
          jokeKey="joke"
          name="icanhazdadjoke"
        />
        <JokeFetcher
          api="https://api.chucknorris.io/jokes/random"
          jokeKey="value"
          name="Chuck Norris API"
        />
      </div>
    );
  }
}

export default App;
