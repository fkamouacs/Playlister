import { React, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
import axios from "axios";
import Playlist from "../../components/playlist";

const list = () => {
  const router = useRouter();
  const { id } = router.query;
  const res = useAuth();
  const [playlist, setPlaylist] = useState([]);

  console.log(res);

  useEffect(() => {
    // get playlist for current page
    if (id) {
      axios.post("/api/playlists/getPlaylistsPage", { id: id }).then((res) => {
        setPlaylist(res.data[0]);
      });
    }
  }, [id]);

  const getUsername = () => {
    if (res.user) {
      return res.user.username;
    }
    return undefined;
  };

  const getUserId = () => {
    if (res.user) {
      return res.user.id;
    }
    return undefined;
  };
  return (
    <div>
      <Playlist
        key={playlist.id}
        id={playlist.id}
        title={playlist.title}
        owner={playlist.user_id}
        username={getUsername()}
        user_id={getUserId()}
      />
    </div>
  );
};

export default list;
