import { React, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import FullPlaylist from "./fullPlaylist";

const playlist = (props) => {
  const [currentSong, setCurrentSong] = useState();
  const [songs, setSongs] = useState([]);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (props.id) {
      axios
        .post("/api/playlists/getSongs", { playlist_id: props.id })
        .then((res) => {
          setSongs(res.data);
        });
    }
  }, [props.id]);

  const handleOwnerClick = () => {
    router.push(`/${props.username}`);
  };

  return (
    <div>
      {pathname == "/playlist/[id]" ? (
        <FullPlaylist songs={songs} data={props} />
      ) : (
        <Link className="flex flex-col m-1 " href={`/playlist/${props.id}`}>
          <div className="h-[118px] w-[210px] bg-black rounded-lg"></div>
          <h2 className="text-[14px] font-bold text-[#0F0F0F">{props.title}</h2>
          <div
            className="text-[12px] text-[#606060]"
            onClick={handleOwnerClick}
          >
            {props.username}
          </div>
        </Link>
      )}
    </div>
  );
};

export default playlist;
