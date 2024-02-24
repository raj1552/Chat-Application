import React from "react";
import "../../css/Chat-box.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatMessage = () => {
  const messages = [
    {
      sender: "Me",
      message: "Hey, how's it going?",
    },
    {
      sender: "Friend",
      message: "Hey there! It's going well, thanks for asking.",
    },
    {
      sender: "Friend",
      message: "Hey there! It's going well, thanks for asking.",
    },
    {
      sender: "Me",
      message: "Hey, how's it going?",
    },
    {
      sender: "Friend",
      message: "Hey there! It's going well, thanks for asking.",
    },
    {
      sender: "Me",
      message: "Hey, how's it going?",
    },
    {
      sender: "Friend",
      message: "Hey there! It's going well, thanks for asking.",
    },
    {
      sender: "Me",
      message: "Hey, how's it going?",
    },
    {
      sender: "Me",
      message: "Hey there! It's going well, thanks for asking.",
    },
    {
      sender: "Me",
      message: "Hey there! It's going well, thanks for asking.",
    },
    {
      sender: "Me",
      message: "Hey there! It's going well, thanks for asking.",
    },
    {
      sender: "Me",
      message: "Hey there! It's going well, thanks for asking.",
    },
    {
      sender: "Me",
      message: "Hey there! It's going well, thanks for asking.",
    },
    {
        sender: "Me",
        message: "Hey there! It's going well,",
      },
  ];

  return (
    <div className="message-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message-${msg.sender.toLowerCase()}`}
          >
            <p>{msg.message}</p>
            <img src="/pexels-photo-415829.webp" alt="" />
          </div>
        ))}
      </div>
      <div className="message-text">
        <input type="text" className="text" placeholder="Type a message" />
        <button className="send">
        <FontAwesomeIcon className="send-font" icon="fa-solid fa-paper-plane" />
      </button>
      </div>
    </div>
  );
};

export default ChatMessage;
