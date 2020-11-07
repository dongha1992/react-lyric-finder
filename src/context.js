import React, { Component } from "react";
// const { createProxyMiddleware } = require("http-proxy-middleware");
const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_TRACKS":
      return {
        ...state,
        track_list: action.payload,
        heading: "Search Results",
      };
    default:
      return state;
  }
};

const Context = React.createContext();
export class Provider extends Component {
  state = {
    track_list: [],
    heading: "Top 10 tracks",
    dispatch: (action) => this.setState((state) => reducer(state, action)),
  };

  componentDidMount() {
    const API = "c6bab0fe608d5ef86ab4096a0152e2fb";
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=de&f_has_lyrics=1&apikey=${API}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          track_list: res.message.body.track_list,
        });
      });
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
