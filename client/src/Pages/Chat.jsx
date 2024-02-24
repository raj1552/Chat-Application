import ChatFeed from '../components/chatComponents/Chat-Feed.jsx';
import ChatMessage from '../components/chatComponents/Chat-Message.jsx';
import ChatNavbar from '../components/chatComponents/Chat-Navbar.jsx';

const Chat = () => {
    return ( 
       <>
       <ChatNavbar/>
       <ChatFeed/>
       <ChatMessage/>
       </>
     );
}
 
export default Chat;