import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIO from "socket.io-client";
import "./Chat.css";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
let socket;

const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatinput").value;
    socket.emit("message", { message, send });
    document.getElementById("chatinput").value = "";
  };
  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      alert("connected");
      setid(socket.id);
    });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    socket.emit("joined", { user });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnectt");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);
  return (
    <div className="chatpage">
      <div className="chatcontainer">
        <div className="header">
          <h2>CHATAPP</h2>
          <a href="/">
            <div className="headerimg">X</div>
          </a>
        </div>
        <ReactScrollToBottom className="chatbox">
          {messages.map((item, i) => (
            <Message
              user={user.id === id ? "" : item.user}
              message={item.message}
              classs={user.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputbox">
          <input
            onKeyPress={(e) => (e.key === "Enter" ? send() : null)}
            type="text"
            id="chatinput"
          />
          <button onClick={send} className="sendBtn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
