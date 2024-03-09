import React, { useState, useEffect} from "react";
import axios from 'axios'
import ChatBody from "./ChatBody";

const ChatBar = ({ onUserClick, onConversationClick }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([]);

  useEffect(() =>{
    const fetchData = async () =>{
      const loggedinUser = JSON.parse(localStorage.getItem('user'))
      const response = await axios.get(`http://localhost:5000/api/conversation/${loggedinUser?.id}`);
      setConversations(response.data)
    }
    fetchData()
  }, [])

  const handleUserClick = async (conversation_id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/message/${conversation_id}`)
      setMessages(response.data)
      onConversationClick(conversation_id)
      onUserClick(response.data)
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  return (
    <div className="chat__sidebar">
    <h1>{user.username}</h1>
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {
            conversations.length > 0 ?
            conversations.map(({conversation_id, user}) => {
              return (
                <div onClick={() => handleUserClick(conversation_id)}>
                  <h3>{user?.username}</h3>
                  <p>{user?.email}</p>
                </div>
              );
            }) : <h3>No Conversation</h3>
          }
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
