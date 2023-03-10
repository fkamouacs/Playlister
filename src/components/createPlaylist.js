import { React, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const CreatePlaylist = (props) => {
  const router = useRouter();
  const [playlistName, setPlaylistName] = useState("");
  const [error, setError] = useState(false);

  const handleCancle = () => {
    props.createPlaylist(false);
  };

  const handleCreate = () => {
    if (playlistName != "") {
      setError(false);
      console.log(playlistName);
      console.log(props.id);
      const args = {
        title: playlistName,
        user_id: props.id,
      };

      axios.post("/api/playlists/createPlaylist", args).then((res) => {
        console.log(res);
      });

      props.createPlaylist(false);
      router.reload(window.location.pathname);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-screen  text-[#1C1C1E]  ">
      <div className="fixed flex flex-col text-center  bg-[#D5D5D5] rounded-lg z-40">
        <div className="p-4">
          <h2 className="font-bold">New Playlist</h2>
          <p>Enter a name for this new playlist.</p>
          <input
            className="border-none outline-none mt-2 p-0.5 rounded-sm"
            onChange={(e) => setPlaylistName(e.target.value)}
          ></input>

          {error ? (
            <div className="mt-2 text-sm text-[#ed4956]">
              Please enter a valid name
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="flex justify-around border rounded-b-lg">
          <button className="font-bold py-2" onClick={handleCancle}>
            Cancle
          </button>
          <button className="py-2" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
      <div className="w-full h-screen opacity-80 bg-[#1C1C1E] "></div>
    </div>
  );
};

export default CreatePlaylist;
