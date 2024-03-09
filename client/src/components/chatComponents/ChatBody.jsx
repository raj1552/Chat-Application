import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const ChatBody = ({ messages }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    const cookies = new Cookies();
    cookies.remove("token");
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <header className="chat__mainHeader">
        <p>Chat App</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>
      <div className="message__container">
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
