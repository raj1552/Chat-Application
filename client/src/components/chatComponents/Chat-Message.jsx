import React, { useState, useEffect } from "react";
import "../../css/Chat-box.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatMessage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  // WebSocket connection
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages([...messages, message]);
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    const message = { from: "sender_id", to: "receiver_id", message: inputMessage };
    // Send message to WebSocket server
    const socket = new WebSocket("ws://localhost:5000");
    socket.onopen = () => {
      socket.send(JSON.stringify(message));
    };
    setInputMessage("");
  };

  return (
    <div className="message-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message-${msg.sender.toLowerCase()}`}>
            <p>{msg.message}</p>
            <img src="/pexels-photo-415829.webp" alt="" />
          </div>
        ))}
      </div>
      <div className="message-text">
        <input type="text" className="text" placeholder="Type a message" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
        <button className="send" onClick={sendMessage}>
          <FontAwesomeIcon className="send-font" icon="fa-solid fa-paper-plane" />
        </button>
      </div>
    </div>
  );
};

export default ChatMessage;
