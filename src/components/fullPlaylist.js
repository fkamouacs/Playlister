import { React, useState } from "react";
import Song from "./song";

const fullPlaylist = (props) => {
  const [thumbnail, setThumbnail] = useState();

  const displaySongs = () => {
    let songNumber = 0;
    return props.songs.length != 0 ? (
      props.songs.map((song) => {
        return (
          <Song
            key={song.song_id}
            data={song}
            setThumbnail={setThumbnail}
            songNum={songNumber++}
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

  return (
    <div className="flex flex-col items-center px-4 w-full">
      <div className=" w-full max-w-lg">
        <div className="flex flex-col w-full ">
          <img
            className="self-center rounded-lg object-cover w-full "
            src={thumbnail}
          />

          <div className="flex flex-col font-['Roboto_Condensed'] tracking-wide pt-4 ">
            <div className="text-3xl font-bold">{props.data.title}</div>
            <div className="text-[#b8461b]">{props.data.username}</div>
          </div>
        </div>
      </div>
      <div className="flex w-full max-w-lg justify-center text-sm  font-bold py-6">
        <button className="flex justify-center items-center w-full h-[36px] py-5 text-[#1C1C1E] rounded-md mr-1 border-solid border-2 border-[#D5D5D5] bg-[#D5D5D5]">
          <img src="/play.svg" className="mr-1" />
          PLAY ALL
        </button>
        <button className="flex justify-center items-center w-full h-[36px] rounded-md mr-1 border-solid py-5 border-2 border-[#D5D5D5] ml-1">
          <img src="/shuffle.svg" className="mr-1" />
          SHUFFLE
        </button>
      </div>
      <div className="pb-6 w-full text-sm max-w-lg">{getNumSongs()}</div>
      <ul className="w-full text-sm max-w-lg">{displaySongs()}</ul>
    </div>
  );
};

export default fullPlaylist;
