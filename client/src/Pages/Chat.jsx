import React, { useState, useEffect } from "react";
import ChatFooter from "../components/chatComponents/ChatFooter";
import ChatBar from "../components/chatComponents/ChatBar";
import ".././index.css";
import ChatBody from "../components/chatComponents/ChatBody";
import { io } from "socket.io-client";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState([])
  const [activeChatFooter, setActiveChatFooter] = useState(false);
  const [socket, setSocket] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => { 
    setSocket(io("http://localhost:5000"));
  },[])
  
  useEffect(() => {
    socket?.emit("addUser", user?.id);
    socket?.on("getUsers", (users) => {
      console.log(users);
    })

  },[socket])
  const handleUserClick = (newMessages) => {
    setMessages(newMessages);
    setActiveChatFooter(true); 
  };

  const handleConversationClick = (conversation_id) => {
    setConversation(conversation_id)
    setActiveChatFooter(true); 
  }
  return (
    <div className="chat">
      <ChatBar onUserClick={handleUserClick} onConversationClick={handleConversationClick} />
      <div className="chat__main">
      <ChatBody messages={messages}  socket={socket}/>
      {activeChatFooter && <ChatFooter conversation_id={conversation} socket={socket} />}
      </div>
    </div>
  );
};

export default Chat;
