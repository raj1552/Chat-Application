import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Profile = ({ handleGroup, handleUser }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLeaveChat = () => {
      const cookies = new Cookies();
      cookies.remove("token");
      navigate("/");
      window.location.reload();
    };

    return ( 
    <>
      <div className="user">
      <header className="chat__mainHeader">
      <img src="./image.webp" alt="" />
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
          <FontAwesomeIcon icon={faEllipsisVertical} />
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
            <MenuItem onClick={handleUser}>New Chat</MenuItem>
            <MenuItem onClick={handleGroup}>New Group Chat</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleLeaveChat}>Logout</MenuItem>
          </Menu>
      </header>
      </div>
    </> );
}
 
export default Profile;