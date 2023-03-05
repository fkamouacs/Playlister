"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export default function Signup() {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [signupError, setSignupError] = useState("");

  const router = useRouter();

  const { isLoggedIn, user } = useAuth();

  const handleSignup = async (email, username, password) => {
    const data = { email: email, username: username, password: password };
    axios.post("/api/users/createUser", data).then((res) => {
      console.log(res);
      if (res.data.name != "error") {
        //login
        axios
          .post("/api/users/login", { email: email, password: password })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            router.push("/");
          });
      } else {
        const error = res.data.constraint;
        if (error === "users_email_key") {
          setSignupError("email");
        } else {
          setSignupError("username");
        }
      }
    });
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className="flex flex-row justify-center items-center h-full">
          <div>
            <div className="flex flex-col text-center  px-2">
              <div className="text-4xl font-bold tracking-wide p-8 mt-4">
                Playlister
              </div>
              <div className="w-[350px] mx-auto flex flex-col justify-center border-solid border-[#ccc] rounded-[5px] px-5">
                <input
                  className="outline-none text-sm w-full border  mb-5 p-2.5 rounded-[5px] border-solid border-[#ccc]"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  className="outline-none text-sm w-full border  mb-5 p-2.5 rounded-[5px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className="outline-none text-sm w-full border mb-5 p-2.5 rounded-[5px] border-solid border-[#ccc]"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <input
                  className="bg-[#cf4e1f] font-medium text-[white] cursor-pointer px-5 py-2.5 rounded-[5px] border-[none] w-full mb-8"
                  type="submit"
                  value="Sign up"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSignup(email, username, password);
                  }}
                />

                {signupError === "email" ? (
                  <div className="text-[#ed4956]">
                    This email address is already in use.
                  </div>
                ) : (
                  <></>
                )}
                {signupError === "username" ? (
                  <div className="text-[#ed4956]">
                    This username is already taken.
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="login-container p-4 mt-2 flex flex-row justify-center text-center px-2">
              <p className=" pr-1">Have an account?</p>
              <Link className="text-[#e65722] text font-medium" href="/login">
                Log in
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
