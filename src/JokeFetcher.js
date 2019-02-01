import React, { Component } from "react";
import PropTypes from "prop-types";
import dadJokeDog from "./dadjokedog.png";

class JokeFetcher extends Component {
  static propTypes = {
    api: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    jokeKeys: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    remover: PropTypes.func.isRequired
  };

  // using a Set to prevent dupes
  state = {
    currentJoke: "",
    jokes: new Set()
  };

  // give the fetcher a random, light background color
  randomLightColor = `hsla(${Math.random() * 360}, 100%, 75%, 0.75)`;

  handleFetchClick = () => {
    const { api, jokeKeys } = this.props;
    fetch(api, {
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(jokeData => {
        const joke = jokeKeys.reduce(
          (acc, jokeKey) => `${acc} ${jokeData[jokeKey]}`,
          ""
        );
        this.setState(({ jokes }) => ({
          currentJoke: joke,
          jokes: jokes.add(joke)
        }));
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleCloseClick = () => {
    const { id, remover } = this.props;
    remover(id);
  };

  handleTickClick = joke => {
    this.setState({ currentJoke: joke });
  };

  render() {
    const { currentJoke, jokes } = this.state;
    const { name } = this.props;
    return (
      <section
        className="JokeFetcher"
        style={{
          backgroundImage: `linear-gradient(${this.randomLightColor},${
            this.randomLightColor
          }), url(${dadJokeDog})`
        }}
      >
        <h1 className="JokeFetcher-name">{name}</h1>
        <button
          type="button"
          onClick={this.handleFetchClick}
          className="JokeFetcher-button"
        >
          get a joke
        </button>
        <p>{currentJoke}</p>
        <div className="JokeFetcher-ticks">
          {[...jokes].map((joke, i) => (
            <div
              className="JokeFetcher-tick"
              onClick={() => this.handleTickClick(joke)}
              key={i}
            />
          ))}
        </div>
        <span className="JokeFetcher-closer" onClick={this.handleCloseClick}>
          &times;
        </span>
      </section>
    );
  }
}

export default JokeFetcher;
