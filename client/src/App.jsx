import { Routes, Route, Navigate }from "react-router-dom"
import Login from './Pages/Login.jsx';
import Chat from './Pages/Chat.jsx'
import Register  from './Pages/Register.jsx';
import Forgetpassword from "./Pages/Forgetpassword.jsx";
import Resetpassword from "./Pages/Resetpassword.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import Setting from "./Pages/Setting.jsx";


function App() {
  return (
    <>
    <Routes>
      <Route element={<PrivateRoutes/>}>
      <Route path="/" element={<Chat/>} />
      <Route path="/setting" element={<Setting/>} />
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
