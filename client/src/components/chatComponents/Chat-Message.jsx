import React, { useState, useEffect } from "react";

import "../../css/Chat-box.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Cookies from "universal-cookie";

import axios from "axios";

import socket from "../../socket.js";

import ChatInput from "./ChatInput.jsx";
import usesocketsetup from "../usesocketsetup.jsx";

const ChatMessage = ({ currentChat, socket }) => {
  const [messages, setMessages] = useState([]);

  const [inputMessage, setInputMessage] = useState("");

  const cookies = new Cookies();
  usesocketsetup()

  useEffect(() => {
    const fetchData = async () => {
      const id = cookies.get("id");

      const response = await axios.post(
        "http://localhost:5000/message/getmessage",
        {
          from: id,

          to: currentChat.id,
        }
      );

      setMessages(response.data);
    };

    fetchData();
  }, [currentChat, cookies]);

  const handleSendMsg = async (msg) => {
    const id = cookies.get("id");
    console.log(id)

    socket.current.emit("send-message", {
      from: currentChat.id,
      to: id,
      msg,
    });

    await axios.post("http://localhost:5000/message/addmessage", {
      from: id,
      to: currentChat.id,
      message: msg,
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      { fromSelf: true, message: msg },
    ]);
  };

  return (
    <div className="container">
      <div className="chat-header">
        <div className="user-details">
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ChatInput handleSendMsg={handleSendMsg} socket={socket} />
    </div>
  );
};

export default ChatMessage;
