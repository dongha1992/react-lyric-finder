import React, { Component } from "react";
import { Consumer } from "../../context";
import Spinner from "../layout/Spinner";
import Track from "./Track";

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {(value) => {
          const { heading, track_list } = value;
          console.log(value);
          if (track_list === undefined || track_list.length === 0) {
            return <Spinner />;
          } else {
            return (
              <>
                <h3 className="tracks-wrap">{heading}</h3>
                <div className="row">
                  {track_list.map((item) => (
                    <Track key={item.track.track_id} track={item.track} />
                  ))}
                </div>
              </>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Tracks;
