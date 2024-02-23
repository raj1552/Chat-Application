import React, { useState } from 'react';
import '../../css/Chat.css';

const ChatFeed = () => {
    const [selectedUser, setSelectedUser] = useState(null); 
    
    const chatUsers = [
        { id: 1, name: 'Emma', message: 'Hey! How are you?' },
        { id: 2, name: 'John', message: 'Hi there!' },
        { id: 3, name: 'Alice', message: 'What\'s up?' },
    ];

    const handleUserSelect = (userId) => {
        setSelectedUser(userId === selectedUser ? null : userId); 
    };

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
            {/* Display chat component when a user is selected */}
            {selectedUser && (
                <div className="chat-popup">
                    {/* You can render the chat component here */}
                    <p>Chat with {chatUsers.find(user => user.id === selectedUser).name}</p>
                </div>
            )}
        </div>
    );
}

export default ChatFeed;
