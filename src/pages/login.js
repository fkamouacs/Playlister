"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState(false);

  const router = useRouter();

  const { isLoggedIn, user } = useAuth();

  const handleLogin = async (email, password) => {
    const data = { email: email, password: password };
    axios
      .post("/api/users/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        console.log(res);
        router.push("/");
      })
      .catch((error) => {
        console.log("error", error.message);
        setLoginError(true);
      });
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className="flex flex-row justify-center items-center h-full ">
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
                  className="outline-none text-sm w-full border mb-5 p-2.5 rounded-[5px] border-solid border-[#ccc]"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <input
                  className="bg-[#cf4e1f] font-medium text-[white] cursor-pointer px-5 py-2.5 rounded-[5px] border-[none] w-full mb-8"
                  type="submit"
                  value="Log in"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin(email, password);
                  }}
                />
                {loginError ? (
                  <div className="login-error text-[#ed4956]">
                    Sorry, incorrect email or password.
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="signup-container p-4 mt-4 flex flex-row justify-center text-center px-2">
              <p className=" pr-2">Don't have an account?</p>
              <Link className="text-[#e65722] text font-medium" href="/signup">
                Signup
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
