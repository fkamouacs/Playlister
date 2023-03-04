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

  return (
    <div className="flex flex-col items-center  w-full">
      <div className=" w-full max-w-3xl">
        <div className="flex flex-col w-full  pt-4">
          <img
            className="self-center rounded-lg object-cover h-[220px] w-[400px]"
            src={thumbnail}
          />

          <div className="flex flex-col  text-[#000] font-bold px-[20px] pt-[48px] pb-2  ">
            <div className="text-[28px] mb-2">{props.data.title}</div>
            <div>{props.data.username}</div>
          </div>
        </div>
      </div>
      <div className="flex w-full max-w-3xl justify-center pt-4 px-[20px] font-medium">
        <button className="flex justify-center items-center w-full h-[36px] text-white rounded-md mr-1 border-solid border-2 border-black bg-black">
          <img src="/play.svg" className="mr-1" />
          Play All
        </button>
        <button className="w-full h-[36px] rounded-md mr-1 border-solid border-2 border-black ml-1">
          Shuffle
        </button>
      </div>

      <ul className="px-[20px] py-5 w-full max-w-3xl">{displaySongs()}</ul>
    </div>
  );
};

export default fullPlaylist;
