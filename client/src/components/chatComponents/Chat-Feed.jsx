import React, { useState } from 'react';
import '../../css/Chat.css';

const ChatFeed = () => {
    const [selectedUser, setSelectedUser] = useState(null); 
    
    const chatUsers = [
        { id: 1, name: 'Emma', message: 'Hey! How are you?' },
        { id: 2, name: 'John', message: 'Hi there!' },
        { id: 3, name: 'Alice', message: 'What\'s up?' },
    ];

    return (
        <div className="chat-container">
            {chatUsers.map((user) => (
                <div className="chat-users" key={user.id} onClick={() => handleUserSelect(user.id)}>
                    <img src="/pexels-photo-415829.webp" alt="" />
                    <div className="message">
                        <h3>{user.name}</h3>
                        <p>Last Message: {user.message}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ChatFeed;
