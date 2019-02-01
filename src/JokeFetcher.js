import React, { Component } from "react";
import PropTypes from "prop-types";

class JokeFetcher extends Component {
  static propTypes = {
    api: PropTypes.string.isRequired,
    jokeKey: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  };

  // using a Set to prevent dupes
  state = {
    jokes: new Set()
  };

  handleClick = () => {
    const { api, jokeKey } = this.props;
    fetch(api, {
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(({ [jokeKey]: joke }) => {
        this.setState(prevState => ({
          jokes: prevState.jokes.add(joke)
        }));
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const { jokes } = this.state;
    const { name } = this.props;
    return (
      <section>
        <h3>{name}</h3>
        <button type="button" onClick={this.handleClick}>
          get a joke
        </button>
        {jokes.size}
      </section>
    );
  }
}

export default JokeFetcher;
