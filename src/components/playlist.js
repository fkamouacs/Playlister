import { React, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import FullPlaylist from "./fullPlaylist";

const playlist = (props) => {
  const [currentSong, setCurrentSong] = useState();
  const [songs, setSongs] = useState([]);
  const [thumbnail, setThumbnail] = useState();
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

  useEffect(() => {
    if (songs[0]) {
      axios
        .post("/api/playlists/getSong", { id: songs[0].song_id })
        .then((res) => {
          setThumbnail(getYoutubeId(res.data.link));
        });
    }
  }, [songs]);

  const getYoutubeId = (url) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    let id = match && match[7].length == 11 ? match[7] : false;
    return `https://img.youtube.com/vi/${id}/0.jpg`;
  };

  return (
    <div>
      {pathname == "/playlist/[id]" ? (
        <FullPlaylist songs={songs} data={props} />
      ) : (
        <Link className="flex flex-col m-1 " href={`/playlist/${props.id}`}>
          <img
            className="h-[118px] w-[210px]  rounded-lg object-cover"
            src={thumbnail}
          />
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
