import React, { useState, useEffect} from "react";
import axios from 'axios'
import Newconversation from "./New_conversation";
import Groupconversation from './New_Group_Conversation'
import Profile from "./Profile";

const ChatBar = ({ onUserClick, onConversationClick, socket }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [unrolled, setUnrolled] = useState(false);

  useEffect(() => {
    socket.on("messageResponse", (data) => setUser(data));
  }, [socket, user])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleGroup = () => {
    setUnrolled(true)
  }

  const handleGroupClose = (value) => {
    setUnrolled(false)
  }

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
      const messagesWithTimestamp = response.data.map(msg => ({
        ...msg,
        timestamp: msg.timestamp || new Date(msg.created_at).getTime() // Assuming your API returns a 'created_at' field
      }));
      setMessages(messagesWithTimestamp);
      onConversationClick(conversation_id);
      onUserClick(messagesWithTimestamp);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  return (
    <div className="chat__sidebar">
      <Profile handleGroupClose={handleGroup} handleUser={handleClickOpen}/>
      <Newconversation open={open} onClose={handleClose} />
      <Groupconversation unrolled={unrolled} onrolled={handleGroupClose} />
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {
            conversations.length > 0 ?
            conversations.map(({conversation_id, user}) => {
              return (
                <div className="conversation" onClick={() => handleUserClick(conversation_id)}>
                  <h3 key={user.socketID}>{user.username}</h3>
                  <p>You: </p>
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
