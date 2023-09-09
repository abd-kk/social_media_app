import "./saved.css";
import "../Nav bar/NavBar";
import { NavBar } from "../Nav bar/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";

export const Saved = () => {
  const [info, setinfo] = useState({});
  useEffect(() => {
    // fetch(
    //   "https://api.mockfly.dev/mocks/fbc8f5a0-316f-4ab4-810f-a3497524b941/users"
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((res) => console.log(res));

    const postData = {
      userId: 1,
      firstName: "asdf",
    };

    // axios
    //   .post(
    //     "https://api.mockfly.dev/mocks/fbc8f5a0-316f-4ab4-810f-a3497524b941/users",
    //     postData
    //   )
    //   .then((response) => {
    //     // Handle successful response
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     // Handle error
    //     console.error(error);
    //   });

    console.log(JSON.stringify(postData));

    axios
      .put(
        "https://api.mockfly.dev/mocks/fbc8f5a0-316f-4ab4-810f-a3497524b941/lol",
        postData
      )
      .then((response) => {
        // Handle successful response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }, []);
  return (
    <div className="saved">
      <NavBar />
      Saved posts !
    </div>
  );
};
