import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Playlist from "./playlist";
import CreatePlaylist from "../components/createPlaylist";

const playlists = (props) => {
  const [playlists, setPlaylists] = useState([]);
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const router = useRouter();

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

  const handleAddPlaylist = () => {
    setCreatePlaylist(true);
  };

  return (
    <div>
      <div className="flex flex-wrap  mx-4 my-4">
        <div className="flex flex-wrap">{displayPlaylists()} </div>
        {props.profileName == props.username ||
        props.profileName == undefined ? (
          <div
            className="flex justify-center items-center w-[210px] h-[118px] cursor-pointer"
            onClick={handleAddPlaylist}
          >
            <img src="/plus.svg" />
            add playlist
          </div>
        ) : (
          <></>
        )}
      </div>

      {createPlaylist ? (
        <CreatePlaylist createPlaylist={setCreatePlaylist} id={props.id} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default playlists;
