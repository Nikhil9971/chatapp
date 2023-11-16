import React, { useState } from "react";
import "./Join.css";
import { Link } from "react-router-dom";

let user;
const Join = () => {
  const sendUser = () => {
    user = document.getElementById("joinInput").value;
    document.getElementById("joinInput").value = "";
  };

  const [name, setname] = useState("");
  return (
    <div className="joinpage">
      <div className="joincontainer">
        <h1>CHATAPP</h1>
        <input
          onChange={(e) => setname(e.target.value)}
          type="text"
          id="joinInput"
          placeholder="Enter your name"
        />
        <Link onChange={(e) => (!name ? e.preventDefault() : null)} to="/chat">
          <button onClick={sendUser} className="joinbtn">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
