import { React, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const addSongs = (props) => {
  const router = useRouter();
  const [songName, setSongName] = useState("");
  const [songLink, setSongLink] = useState("");
  const [error, setError] = useState({
    status: false,
    msg: "",
  });

  const handleCancle = () => {
    props.addSongs(false);
  };

  const handleCreate = () => {
    if (songName != "") {
      if (songLink != "") {
        setError({
          status: false,
          msg: "",
        });

        const args = {
          title: songName,
          link: songLink,
          playlist_id: props.id,
        };

        axios.post("/api/playlists/addSong", args).then((res) => {
          console.log(res);
        });
        props.addSongs(false);
        router.reload(window.location.pathname);
      } else {
        setError({
          status: true,
          msg: "link",
        });
      }
    } else {
      setError({
        status: true,
        msg: "name",
      });
    }
  };

  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-screen  text-[#1C1C1E] ">
      <div className="fixed flex flex-col text-center bg-[#D5D5D5] rounded-lg z-40">
        <div className="p-4">
          <h2 className="font-bold">New Song</h2>
          <div className="flex flex-col">
            <input
              className="border-none outline-none mt-2 p-0.5 rounded-sm"
              onChange={(e) => setSongName(e.target.value)}
              placeholder="Song name"
            ></input>
            <input
              className="border-none outline-none mt-2 p-0.5 rounded-sm"
              onChange={(e) => setSongLink(e.target.value)}
              placeholder="Song Youtube link"
            ></input>
          </div>

          {error.status ? (
            <div className="mt-2 text-sm text-[#ed4956]">
              {`Please enter a valid ${error.msg}.`}
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

export default addSongs;
