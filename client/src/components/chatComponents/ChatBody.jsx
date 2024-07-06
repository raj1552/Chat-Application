import React, { useState, useEffect } from "react";
import BodyBar from "./BodyBar.jsx";

const ChatBody = ({ messages, lastMessageRef }) => {
  return (
    <>
    <BodyBar />
      <div className="message__container">
        {messages.length > 0 ? (
          messages.map(({ message, user: { id, username } = {} }) => (
            <div className="message__chats" key={message.id}>
              {id == JSON.parse(localStorage.getItem("user")).id ? (
                <>
                  <p className="sender__name">You</p>
                  <div className="message__sender">
                    <p>{message}</p>
                  </div>
                </>
              ) : (
                <div className="message__chats" key={message.id}>
                  <p>{username}</p>
                  <div className="message__recipient">
                    <p>{message}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-conversation">
            <p>No conversation</p>
          </div>
        )}

        <div className="message__status">
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
