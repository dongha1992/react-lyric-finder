import React, { Component } from "react";
import { Consumer } from "../../context";

class Search extends Component {
  state = {
    trackTitle: "",
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  findTrack = (dispatch, e) => {
    e.preventDefault();
    const API = "c6bab0fe608d5ef86ab4096a0152e2fb";
    fetch(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=3&page=10&s_track_rating=desc&apikey=${API}`
    )
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.message.body.track_list,
        });

        this.setState({
          trackTitle: "",
        });
      });
  };

  render() {
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          console.log(dispatch);
          return (
            <div className="card card-body">
              <h1>
                <i className="fas fa-music">Search for Song</i>
              </h1>
              <p className="lead">Get the lyric for any song</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Song..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  />
                  <button className="btn" type="submit">
                    Get Lyrics!
                  </button>
                </div>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
