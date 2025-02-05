import { Routes, Route } from "react-router-dom";
import SearchPage from "@@/SearchPage";
import "@/App.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/login" element={<div>Login Page Placeholder</div>} />
        <Route path="/signup" element={<div>Signup Page Placeholder</div>} />
      </Routes>
    </div>
  );
}

export default App;
