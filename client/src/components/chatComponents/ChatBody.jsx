import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import io from "socket.io-client";
import BodyBar from './BodyBar.jsx';

const ChatBody = ({ messages, socket }) => {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      socket.on("getMessage", (message) => {
        setReceivedMessages((prevMessages) => [...prevMessages, message]);
      });
    }
    return () => {
      if (socket) {
        socket.off("getMessage");
      }
    };
  }, [socket]);

  return (
    <>
      <div className="message__container">
        <BodyBar/>
        {messages.length > 0 ? (
          messages.map(({ message, user: { id, username } = {} }) => (
            <div className="message__chats" key={message.id}>
              {id === JSON.parse(localStorage.getItem("user")).id ? (
                <>
                  <p className="sender__name">You</p>
                  <div className="message__sender">
                    <p>{message}</p>
                  </div>
                </>
              ) : (
                <>
                  <p>{username}</p>
                  <div className="message__recipient">
                    <p>{message}</p>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="no-conversation">
            <p>No conversation</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBody;
