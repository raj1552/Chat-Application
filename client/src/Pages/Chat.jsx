import React, { useState, useEffect, useRef } from "react";
import ChatFooter from "../components/chatComponents/ChatFooter";
import ChatBar from "../components/chatComponents/ChatBar";
import ".././index.css";
import ChatBody from "../components/chatComponents/ChatBody";
import axios from "axios";

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [activeChatFooter, setActiveChatFooter] = useState(false);
  const [receiverId, setReceiverId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      console.log("Received message data:", data);
      setMessages((prevMessages) => [...prevMessages, {
        message: data.message,
        user: {
          id: data.sender_id, 
          username: data.name, 
          email: data.email 
        }
      }]);
    });
  
    return () => {
      socket.off("messageResponse");
    };
  }, [socket]);

  const handleUserClick = (newMessages) => {
    setMessages(newMessages);
    setActiveChatFooter(true);
  };

  const handleConversationClick = async (conversation_id) => {
    setConversation(conversation_id);
    setActiveChatFooter(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/conversation/${conversation_id}/${user.id}`
      );
      setReceiverId(response.data.receiverId);
    } catch (error) {
      console.error("Error fetching receiver ID:", error);
    }
  };

  return (
    <div className="chat">
      <ChatBar
        onUserClick={handleUserClick}
        onConversationClick={handleConversationClick}
        socket={socket}
      />
      <div className="chat__main">
        <ChatBody messages={messages} lastMessageRef={lastMessageRef} />
        {activeChatFooter && (
          <ChatFooter
            conversation_id={conversation}
            socket={socket}
            receiver_id={receiverId}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
