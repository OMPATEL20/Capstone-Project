import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import UrbanRegistrationForm from "./components/UrbanRegistrationForm";
import ChatbotPage from "./components/ChatbotPage";
import BlogPost from "./components/BlogsPage";
import AddPost from "./components/AddPost";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<><Navbar /><UrbanRegistrationForm /></>} />
        <Route path="/main" element={<><Navbar /><ChatbotPage /></>} />
        <Route path="/blogs" element={<><Navbar /><BlogPost /></>} />
         <Route path="/add-post" element={<><Navbar /><AddPost /></>} />
      </Routes>
    </>
  );
}

export default App;
