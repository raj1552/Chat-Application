import React, { useState, useEffect } from "react";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch the list of active users from the backend

    fetch("http://localhost:5000/message/contacts")
      .then((res) => res.json())

      .then((data) => setUsers(data));

    // Handle the 'private message' event emitted from the server

    socket.on("private message", (message) => {
      if (message.name === selectedUser?.username) {
        setMessages((prev) => [...prev, message]);
      }
    });
  }, [socket, selectedUser]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/message/contacts");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch users");
  //       }
  //       const data = await response.json();
  //       const filteredUsers = data.filter(
  //         (user) =>
  //           user.email !== localStorage.getItem("username") &&
  //           user.username !== localStorage.getItem("username")
  //       );
  //       setUsers(filteredUsers);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };
  //   socket.on("private message", (message) => {
  //     if(message.name === selectedUser?.username){
  //       setMessages((prevMessages) => [...prevMessages, message]);
  //     }
  //   fetchUsers();
  // }, [socket, selectedUser]);

  const handleUserClick = async (user) => {
    try {
      setSelectedUser(user);
      const response = await fetch("http://localhost:5000/message/getmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: user.id,
          to: user.id,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const messages = await response.json();
      setMessages(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <div key={user.username} onClick={() => handleUserClick(user)}>
              {user.username}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
