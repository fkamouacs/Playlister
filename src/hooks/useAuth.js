import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth() {
  const [result, setResult] = useState({});
  useEffect(() => {
    axios
      .get("/api/users/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setResult(res.data);
      });
  }, []);

  return result;
}
