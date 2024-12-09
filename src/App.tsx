import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatLayout from "./pages/ChatModule/layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatLayout />} />
        <Route path="/:id" element={<ChatLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
