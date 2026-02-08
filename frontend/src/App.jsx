import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Signup from "./pages/signup";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
    
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
