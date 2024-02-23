import "../../css/navbar.css";

const ChatNavbar = () => {
  return (
    <div className="navbar">
      <div className="navcontainer">
        <div className="navitems">
          <img src="/CHAT.io(1).png" alt="" />
        </div>
        <div className="chat-buttons">
          <a href="/setting">
            <div className="setting">
              <img src="/gear-solid.svg" alt="" />
            </div>
          </a>
          <div className="profile">
            <img src="/pexels-photo-415829.webp" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatNavbar;
