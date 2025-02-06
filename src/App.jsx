import { Routes, Route } from "react-router-dom";
import SearchPage from "@@/SearchPage";
import LoginPage from "@@/loginPage/index.jsx";
import SignupPage from "@@/SignupPage/index.jsx";
import InfoPage from "@@/InfoPage/index.jsx";
import "@/App.css";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
    </div>
  );
}

export default App;
