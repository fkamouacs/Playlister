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
      return id;
    }
  };

  const getThumbnail = () => {
    const id = getYoutubeId();
    if (id) {
      return `https://img.youtube.com/vi/${id}/0.jpg`;
    }
  };

  useEffect(() => {
    const videoId = getYoutubeId();

    if (videoId && !props.videoIds.includes(`${videoId}`)) {
      let videoIds = props.videoIds;
      videoIds.push(videoId);
      props.setVideoIds(videoIds);
    }
  });

  const handlePlay = () => {
    const id = getYoutubeId();
    const index = props.videoIds.findIndex((element) => element == id);
    props.setCurrentSong(index);
    props.setIsPlaying(true);
  };

  const handlePause = () => {
    const id = getYoutubeId();
    const index = props.videoIds.findIndex((element) => element == id);
    props.setCurrentSong(index);
    props.setIsPlaying(false);
  };

  return (
    <li className="list-none rounded-lg flex justify-between mb-4 bg-[#252527]">
      <div className="flex  py-2">
        <img
          className="h-[60px] w-[107px] rounded-lg object-cover"
          src={getThumbnail()}
        />
        <div className="ml-2">
          <div className="font-bold ">{song.title}</div>
          <div className="text-[#b8461b] text-[12px]">owner</div>
        </div>
      </div>

      <div className="flex justify-center w-[40px] h-[35px] rounded-tr-lg rounded-bl-lg bg-[#e65722]">
        {props.isPlaying && props.currentSong == getYoutubeId() ? (
          <img src="/lightPause.svg" className="p-2" onClick={handlePause} />
        ) : (
          <img src="/lightPlay.svg" className="p-2" onClick={handlePlay} />
        )}
      </div>
    </li>
  );
};

export default Song;
