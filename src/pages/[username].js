import React from "react";
import Playlists from "../components/playlists";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";

const username = () => {
  const { asPath } = useRouter();

  const res = useAuth();

  const getUserId = () => {
    if (res.user) {
      return res.user.id;
    }
    return undefined;
  };

  const getPathname = () => {
    if (asPath != "/[username]") {
      return asPath.replace("/", "");
    }
    return undefined;
  };

  return (
    <div>
      <Playlists
        isLoggedIn={res.isLoggedIn}
        username={getPathname()}
        id={getUserId()}
      />
    </div>
  );
};

export default username;
