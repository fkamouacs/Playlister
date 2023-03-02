import { React, useEffect, useState } from "react";
import axios from "axios";

const Song = (props) => {
  const [song, setSong] = useState({});

  useEffect(() => {
    axios
      .post("/api/playlists/getSong", { id: props.data.song_id })
      .then((res) => {
        setSong(res.data);
      });
  }, [props.data]);

  return (
    <ul className="list-none m-0 p-0">
      <li>{song.title}</li>
    </ul>
  );
};

export default Song;
