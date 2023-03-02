import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
export default function navbar(props) {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.reload("/");
  };

  return (
    <nav className="flex justify-between p-4">
      <ul className="flex  list-none m-0 p-0">
        <li className="mx-4">
          <Link href="/">Home</Link>
        </li>
      </ul>

      <ul className="flex list-none m-0 p-0 ">
        {props.isLoggedIn ? (
          <></>
        ) : (
          <>
            <li className="mx-4">
              <Link href="/signup">Signup</Link>
            </li>
            <li className="mx-4">
              <Link href="login">Login</Link>
            </li>
          </>
        )}

        {props.isLoggedIn ? (
          <li className="mx-4">
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
}
