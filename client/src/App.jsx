import { Routes, Route, Navigate }from "react-router-dom"
import Login from './Pages/Login.jsx';
import Chat from './Pages/Chat.jsx'
import Register  from './Pages/Register.jsx';
import Forgetpassword from "./Pages/Forgetpassword.jsx";
import Resetpassword from "./Pages/Resetpassword.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import socketIO from "socket.io-client"

const socket = socketIO.connect("https://d6b9-2400-1a00-b012-38-f235-fb19-b9dd-312b.ngrok-free.app")

function App() {
  return (
    <>
    <Routes>
      <Route element={<PrivateRoutes/>}>
      <Route path="/" element={<Chat socket={socket}/>}/>
      </Route>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/forgetpassword" element={<Forgetpassword/>} />
      <Route path="/resetpassword" element={<Resetpassword/>} />
      <Route path="*" element={<Navigate to = '/'/>} />
    </Routes>
    </>
  );
}

export default App;
