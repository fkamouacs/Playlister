import React from "react";
import Navbar from "./navbar";
import useAuth from "../hooks/useAuth";

const Layout = ({ children }) => {
  const res = useAuth();

  return (
    <>
      <Navbar isLoggedIn={res.isLoggedIn} user={res.user} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
