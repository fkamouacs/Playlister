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

  const getYoutubeId = () => {
    if (JSON.stringify(song) != "{}") {
      var regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = song.link.match(regExp);
      let id = match && match[7].length == 11 ? match[7] : false;
      return `https://img.youtube.com/vi/${id}/0.jpg`;
    }
  };

  useEffect(() => {
    if (props.songNum == 0) {
      const thumbnailURL = getYoutubeId();
      props.setThumbnail(thumbnailURL);
    }
  });

  return (
    <li className="list-none m-0 p-0 flex mb-4">
      <img
        className="h-[90px] w-[160px] rounded-lg object-cover"
        src={getYoutubeId()}
      />
      <div className="ml-2">
        <div className="font-bold ">{song.title}</div>
        <div className="text-[#E65722] text-[12px]">owner</div>
      </div>
      <div></div>
    </li>
  );
};

export default Song;
