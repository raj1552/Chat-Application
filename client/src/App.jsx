import { Routes, Route, Navigate }from "react-router-dom"
import Login from './Pages/Login.jsx';
import Chat from './Pages/Chat.jsx'
import Register  from './Pages/Register.jsx';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Chat/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="*" element={<Navigate to = '/'/>} />
    </Routes>
    </>
  );
}

export default App;
