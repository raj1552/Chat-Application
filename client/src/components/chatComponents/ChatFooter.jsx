import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ChatFooter = ({conversation_id, socket}) => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket?.on("getMessage", (data) => {
            setMessage(data)
        })
    },[socket])
    const handleSendMessage = async (e) => {
      e.preventDefault();
        try{
          const loggedinUser = JSON.parse(localStorage.getItem('user')).id
          socket.emit('sendMessage', {
            conversation_id: conversation_id,
            sender_id: loggedinUser,
            message: message
          });
          const response = await axios.post('http://localhost:5000/api/message', {
            conversation_id: conversation_id,
            sender_id: loggedinUser,
            message: message
          })
          setMessage('')
        }
        catch(error){
            console.error('Error sending message:', error)
        }
      };
    return ( 
        <div className="chat__footer">
        <form className="form" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Write message"
            className="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type='submit' className="sendBtn">SEND</button>
        </form>
      </div>
     );
}
 
export default ChatFooter;