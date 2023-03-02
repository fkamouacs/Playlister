import React from "react";
import Song from "./song";

const fullPlaylist = (props) => {
  const displaySongs = () => {
    return props.songs.length != 0 ? (
      props.songs.map((song) => {
        return <Song key={song.song_id} data={song} />;
      })
    ) : (
      <> </>
    );
  };
  console.log(props.data);
  return (
    <div>
      <div className="bg-zinc-500 py-7">
        <div className="flex justify-center">
          <div className="flex flex-col w-full">
            <div className="w-[336px] h-[189px] rounded-lg bg-black self-center"></div>
            <div className="flex flex-col text-[#FFF] font-bold mx-[20px] mt-4 mb-2">
              <div className="text-[28px] mb-2">{props.data.title}</div>
              <div>{props.data.username}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4 mx-[20px] font-medium ">
          <button className="w-full h-[36px] rounded-3xl bg-[#FFF] mr-1">
            Play All
          </button>
          <button className="w-full h-[36px] rounded-3xl bg-[#FFF] ml-1">
            Shuffle
          </button>
        </div>
      </div>

      <div>{displaySongs()}</div>
    </div>
  );
};

export default fullPlaylist;
