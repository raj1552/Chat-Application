import React, { useState, useEffect } from "react";
import BodyBar from "./BodyBar.jsx";

const ChatBody = ({ messages, lastMessageRef }) => {
  const userId = JSON.parse(localStorage.getItem("user")).id;
  return (
    <>
      <BodyBar />
      <div className="message__container">
        {messages.length > 0 ? (
          messages.map(({ message, user, send_at }, index) => {
            return (
              <div className="message__chats" key={index}>
                {user.id === userId ? (
                  <>
                    <div className="sender-container">
                      <p className="sender__name">You</p>
                      <div className="message__sender">
                        <p>{message}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="receiver_container">
                      <p className="recipient__name">{user.username}</p>
                      <div className="message__recipient">
                        <p>{message}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <div className="no-conversation">
            <p>No conversation</p>
          </div>
        )}
        <div className="message__status"></div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
