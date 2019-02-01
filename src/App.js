import React, { Component } from "react";
import JokeFetcher from "./JokeFetcher";
import "./App.css";
import apiData from "./apiData";

const { floor, random } = Math;

class App extends Component {
  state = {
    apis: [{ ...apiData[0] }]
  };

  addApi = () => {
    // pick a random hidden api and make is visible
    this.setState(({ apis }) => {
      const hidden = apiData.filter(
        ({ id }) => apis.findIndex(currId => currId.id === id) === -1
      );
      return {
        apis: [
          ...apis,
          ...(hidden.length > 0
            ? [hidden[floor(random() * hidden.length)]]
            : [])
        ]
      };
    });
  };

  removeApi = id => {
    this.setState(({ apis }) => ({
      apis: apis.filter(curr => curr.id !== id)
    }));
  };

  render() {
    const { apis } = this.state;
    return (
      <div className="App">
        {apis.map(({ id, ...rest }) => {
          return (
            <JokeFetcher id={id} key={id} remover={this.removeApi} {...rest} />
          );
        })}
        <div className="JokeFetcher">
          <button type="button" onClick={this.addApi}>
            Add API
          </button>
        </div>
      </div>
    );
  }
}

export default App;
