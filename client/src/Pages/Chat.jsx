import React, { useState, useEffect } from "react";
import ChatFooter from "../components/chatComponents/ChatFooter";
import ChatBody from "../components/chatComponents/ChatBody";
import ChatBar from "../components/chatComponents/ChatBar";
import ".././index.css";
import socket from "../socket";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="chat">
      <ChatBar socket={socket} handleUserClick={handleUserClick} />
      <div className="chat__main">
        <ChatBody messages={messages} selectedUser={selectedUser} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default Chat;
