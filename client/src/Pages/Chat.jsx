import React, { useState, useEffect } from "react";
import ChatFooter from "../components/chatComponents/ChatFooter";
import ChatBar from "../components/chatComponents/ChatBar";
import ".././index.css";
import ChatBody from "../components/chatComponents/ChatBody";
import { io } from "socket.io-client";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState([])
  const [activeChatFooter, setActiveChatFooter] = useState(false);
  const [socket, setSocket] = useState(null);
  const [receiverId, setReceiverId] = useState(null); 
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("addUser", user?.id);

      socket.on("getMessage", (message) => {
        if (message.conversation_id === conversation) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });

      return () => {
        socket.off("getMessage");
      };
    }
  }, [socket, conversation]);

  const handleUserClick = (newMessages) => {
    setMessages(newMessages);
    setActiveChatFooter(true);
  };

  const handleConversationClick = async (conversation_id) => {
    setConversation(conversation_id);
    setActiveChatFooter(true);
    console.log(conversation_id)
    try {
      const response = await axios.get(`http://localhost:5000/api/conversation/${conversation_id}/${user.id}`);
      setReceiverId(response.data.receiverId);
    } catch (error) {
      console.error('Error fetching receiver ID:', error);
    }
  };

  return (
    <div className="chat">
      <ChatBar onUserClick={handleUserClick} onConversationClick={handleConversationClick} />
      <div className="chat__main">
      <ChatBody messages={messages}  socket={socket}/>
      {activeChatFooter && <ChatFooter conversation_id={conversation} socket={socket} receiver_id={receiverId} />}
      </div>
    </div>
  );
};

export default Chat;
