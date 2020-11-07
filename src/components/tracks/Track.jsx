import React from "react";
import { Link } from "react-router-dom";

const Track = (props) => {
  const { track } = props;
  return (
    <div className="track-wrap">
      <div className="card">
        <h5 className="card-body">{track.artist_name}</h5>
        <p className="card-text">
          <strong>
            <i className="fas fa-play"> Track </i>
          </strong>{" "}
          :{track.track_name}
          <br />
          <strong>
            <i className="fas fa-compact-disk"> Album </i>
          </strong>{" "}
          :{track.album_name}
        </p>
        <Link to={`lyrics/track/${track.track_id}`} className="btn">
          <i className="fas fa-chevron-right">View Lyrics</i>
        </Link>
      </div>
    </div>
  );
};
export default Track;
