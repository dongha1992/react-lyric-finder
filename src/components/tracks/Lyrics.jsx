import React, { Component } from "react";
import Spinner from "../layout/Spinner.jsx";
import { Link } from "react-router-dom";
// const { createProxyMiddleware } = require("http-proxy-middleware");

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    const API = "c6bab0fe608d5ef86ab4096a0152e2fb";
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${API}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          lyrics: res.message.body.lyrics,
        });

        return fetch(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${API}`
        )
          .then((res) => res.json())
          .then((res) => {
            this.setState({
              track: res.message.body.track,
            });
          });
      });
  }

  render() {
    const { track, lyrics } = this.state;
    console.log(track);
    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <>
          <Link to="/" className="btn">
            Go Back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Album ID</strong>: {track.album_id}
            </li>
            <li className="list-group-item">
              <strong>Likes</strong>: {track.num_favourite}
            </li>
            <li className="list-group-item">
              <strong>Explicit words</strong>:
              {track.explicit === 0 ? "No" : "Yes"}
            </li>
            <li className="list-group-item">
              <strong>Relase Date</strong>:
              {track.updated_time
                .split("")
                .slice(0, track.updated_time.indexOf("T"))}
            </li>
          </ul>
        </>
      );
    }
  }
}

export default Lyrics;
