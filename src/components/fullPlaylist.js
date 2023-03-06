import { React, useState, useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import Song from "./song";

const fullPlaylist = (props) => {
  let videoIds = [];
  const [thumbnail, setThumbnail] = useState();
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    if (videoIds.length != 0)
      setThumbnail(`https://img.youtube.com/vi/${videoIds[0]}/0.jpg`);
  }, [videoIds]);

  const displaySongs = () => {
    return props.songs.length != 0 ? (
      props.songs.map((song) => {
        return <Song key={song.song_id} data={song} videoIds={videoIds} />;
      })
    ) : (
      <> </>
    );
  };

  const getNumSongs = () => {
    return props.songs.length != 1 ? `${props.songs.length} songs` : `1 song`;
  };

  // https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=[YOUR_API_KEY]' \

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const playerOptions = {
    height: "0",
    width: "0",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const loadAndPlayCurrentSong = (player) => {
    console.log(player);
    let song = props.songs[currentSong.num];
    player.loadVideoById(song);
    player.playVideo();
  };

  const onPlayerReady = (event) => {
    loadAndPlayCurrentSong(event.target);
    event.target.playVideo();
  };

  function onPlayerStateChange(event) {
    let playerStatus = event.data;
    let player = event.target;
    if (playerStatus === -1) {
      // VIDEO UNSTARTED
      console.log("-1 Video unstarted");
    } else if (playerStatus === 0) {
      // THE VIDEO HAS COMPLETED PLAYING
      console.log("0 Video ended");
      incSong();
      loadAndPlayCurrentSong(player);
    } else if (playerStatus === 1) {
      // THE VIDEO IS PLAYED
      console.log("1 Video played");
    } else if (playerStatus === 2) {
      // THE VIDEO IS PAUSED
      console.log("2 Video paused");
    } else if (playerStatus === 3) {
      // THE VIDEO IS BUFFERING
      console.log("3 Video buffering");
    } else if (playerStatus === 5) {
      // THE VIDEO HAS BEEN CUED
      console.log("5 Video cued");
    }
  }

  return (
    <div className="flex flex-col items-center px-4 w-full">
      <div className=" w-full max-w-lg">
        <div className="flex flex-col w-full ">
          <img
            className="self-center rounded-lg object-cover w-full max-h-[240px] "
            src={thumbnail}
          />

          <div className="flex flex-col font-['Roboto_Condensed'] tracking-wide pt-4 ">
            <div className="text-3xl font-bold">{props.data.title}</div>
            <div className="text-[#b8461b]">{props.data.username}</div>
          </div>
        </div>
      </div>
      <div className="flex w-full max-w-lg justify-center text-sm  font-bold py-6">
        <button
          className="flex justify-center items-center w-full h-12 py-5 text-[#1C1C1E] rounded-md mr-2 border-solid border-2 border-[#D5D5D5] bg-[#D5D5D5]"
          onClick={handlePlay}
        >
          <img src="/play.svg" className="mr-1" />
          PLAY ALL
        </button>
        <button className="flex justify-center items-center w-full h-12 rounded-md  border-solid py-5 border-2 border-[#D5D5D5] ml-2">
          <img src="/shuffle.svg" className="mr-1" />
          SHUFFLE
        </button>
      </div>
      <div className="pb-4 w-full text-sm max-w-lg">{getNumSongs()}</div>
      <ul className="w-full text-sm max-w-lg">{displaySongs()}</ul>

      {/* {currentSong.isPlaying ? (
        <YouTube
          videoId={props.songs[currentSong.num]}
          opts={playerOptions}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
        />
      ) : (
        <></>
      )} */}
      {isPlaying ? (
        <YouTube videoId="P8q3JOoOcOs" opts={playerOptions} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default fullPlaylist;
