import ChatFeed from '../components/chatComponents/Chat-Feed.jsx';
import ChatMessage from '../components/chatComponents/Chat-Message.jsx';
import ChatNavbar from '../components/chatComponents/Chat-Navbar.jsx';
import usesocketsetup from '../components/usesocketsetup.jsx';
import socket from '../socket.js';

const Chat = () => {
  usesocketsetup()
    return ( 
       <>
       <ChatNavbar/>
       <ChatFeed/>
       <ChatMessage socket={socket}/>
       </>
     );
}
 
export default Chat;