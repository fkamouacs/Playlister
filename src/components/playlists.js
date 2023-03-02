import React, { useEffect, useState } from "react";
import axios from "axios";
import Playlist from "./playlist";

const playlists = (props) => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    // get playlists for current profile
    if (props.username) {
      axios
        .post("/api/playlists/getPlaylists", { username: props.username })
        .then((res) => {
          setPlaylists(res.data);
        });
    }
  }, [props.username]);

  const displayPlaylists = () => {
    return playlists.length != 0
      ? playlists.map((playlist) => {
          return (
            <Playlist
              key={playlist.id}
              id={playlist.id}
              title={playlist.title}
              owner={playlist.user_id}
              username={props.username}
            />
          );
        })
      : null;
  };

  return <div className="flex mx-4 my-4">{displayPlaylists()} </div>;
};

export default playlists;
