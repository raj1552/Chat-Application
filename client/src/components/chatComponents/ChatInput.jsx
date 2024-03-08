import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ChatInput({ handleSendMsg, socket }) {
  const [msg, setMsg] = useState("");

  const sendChat = (event) => {
    event.preventDefault();

    if (msg.length > 0) {
      handleSendMsg(msg);

      setMsg("");
    }
  };

  return (
    <div className="container">
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />

        <button type="submit">
          <FontAwesomeIcon icon="fa-solid fa-paper-plane" />
        </button>
      </form>
    </div>
  );
}
