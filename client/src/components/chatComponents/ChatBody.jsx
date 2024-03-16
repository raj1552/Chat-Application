import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import io from "socket.io-client";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ChatBody = ({ messages, socket }) => {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (socket) {
      socket.on("getMessage", (data) => {
        setReceivedMessages((prevMessages) => [...prevMessages, data]);
      });
      setIsLoading(false);
    }
    return () => {
      if (socket) {
        socket.off("getMessage");
      }
    };
  }, [socket]);

  const handleLeaveChat = () => {
    const cookies = new Cookies();
    cookies.remove("token");
    navigate("/");
    window.location.reload();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <header className="chat__mainHeader">
        <p>Chat App</p>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
           <img style={{ width:'40px', height:'40px', borderRadius:'50px'}} src="/image.webp" alt="" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLeaveChat}>Logout</MenuItem>
          </Menu>
        </div>
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
