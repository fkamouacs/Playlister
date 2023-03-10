import { React, useState, useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import Song from "./song";
import AddSongs from "../components/addSongs";

const fullPlaylist = (props) => {
  const [currentSong, setCurrentSong] = useState(0);
  const [song, setSong] = useState();
  const [videoIds, setVideoIds] = useState([]);
  const [thumbnail, setThumbnail] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [ytRef, setYTref] = useState();
  const [addSongs, setAddSongs] = useState(false);

  useEffect(() => {
    if (videoIds.length != 0) {
      setThumbnail(`https://img.youtube.com/vi/${videoIds[0]}/0.jpg`);
    }
  });

  console.log(props);
  useEffect(() => {
    if (ytRef) {
      if (isPlaying) {
        console.log(currentSong);
        console.log(song);
        if (videoIds[currentSong] != song) {
          loadAndPlayCurrentSong(ytRef);
        }
        ytRef.playVideo();
      } else {
        console.log(ytRef);
        ytRef.pauseVideo();
      }
    }
  }, [isPlaying, currentSong]);

  const displaySongs = () => {
    return props.songs.length != 0 ? (
      props.songs.map((song) => {
        return (
          <Song
            key={song.song_id}
            data={song}
            videoIds={videoIds}
            setVideoIds={setVideoIds}
            currentSong={videoIds[currentSong]}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        );
      })
    ) : (
      <> </>
    );
  };

  const getNumSongs = () => {
    return props.songs.length != 1 ? `${props.songs.length} songs` : `1 song`;
  };

  // https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=[YOUR_API_KEY]' \

  const handlePlayOrPause = () => {
    isPlaying ? setIsPlaying(false) : setIsPlaying(true);
  };

  const playerOptions = {
    height: "0",
    width: "0",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const incSong = () => {
    let curr = currentSong + 1;
    setCurrentSong(curr % props.songs.length);
  };

  const loadAndPlayCurrentSong = (player) => {
    let song = videoIds[currentSong];
    setSong(song);
    player.loadVideoById(song);
  };

  const onPlayerReady = (event) => {
    loadAndPlayCurrentSong(event.target);
    event.target.pauseVideo();
  };

  function onPlayerStateChange(event) {
    let playerStatus = event.data;
    let player = event.target;
    setYTref(player);
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

  const handleAddSong = () => {
    console.log("addsong");
    setAddSongs(true);
  };

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
          onClick={handlePlayOrPause}
        >
          {isPlaying ? (
            <>
              <img src="/pause.svg" className="mr-1" />
              PAUSE
            </>
          ) : (
            <>
              {" "}
              <img src="/play.svg" className="mr-1" />
              PLAY ALL
            </>
          )}
        </button>
        <button className="flex justify-center items-center w-full h-12 rounded-md  border-solid py-5 border-2 border-[#D5D5D5] ml-2">
          <img src="/shuffle.svg" className="mr-1" />
          SHUFFLE
        </button>
      </div>
      <div className="pb-4 w-full text-sm max-w-lg">{getNumSongs()}</div>

      {props.data.user_id == props.data.owner ? (
        <div
          className="flex items-center w-full text-sm max-w-lg bg-[#252527] pt-2 pb-2 pr-2 "
          onClick={handleAddSong}
        >
          <img
            className="w-[105px] h-[60px] object-scale-down bg-[#D5D5D5] rounded-lg "
            src="/plusimg.png"
          />
          <div className="pl-2">Add Songs</div>
        </div>
      ) : (
        <></>
      )}

      <ul className="w-full text-sm max-w-lg">{displaySongs()}</ul>

      <YouTube
        videoId={videoIds[currentSong]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange}
      />

      {addSongs ? (
        <AddSongs addSongs={setAddSongs} id={props.data.id} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default fullPlaylist;
