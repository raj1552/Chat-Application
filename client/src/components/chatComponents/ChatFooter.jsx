import axios from 'axios';
import React, { useState } from 'react';

const ChatFooter = ({receiver_id,conversation_id, socket}) => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async (e) => {
      e.preventDefault();
      try {
        const loggedinUser = JSON.parse(localStorage.getItem('user')).id;
        if (message.trim() && localStorage.getItem('user')) {
          socket.emit('message', {
            conversation_id: conversation_id,
            sender_id: loggedinUser,
            message: message,
            receiver_id: receiver_id
          });
        } // Prevent sending empty messages
  
        // Send message to server via axios
        const response = await axios.post('http://localhost:5000/api/message', {
          conversation_id: conversation_id,
          sender_id: loggedinUser,
          message: message,
          receiver_id: receiver_id
        });
  
        if (response.status === 200) {
          setMessage(''); 
        } else {
          console.error('Failed to send message:', response.statusText);
        }
      } catch (error) {
        console.error('Error sending message:', error);
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
            onChange={(e) => setMessage(e.target.value)
            }
          />
          <button disabled={ isLoading } className="sendBtn">SEND</button>
        </form>
      </div>
     );
}
 
export default ChatFooter;