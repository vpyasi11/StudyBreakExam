import "./App.css";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Forms/Signup";
import Login from "./components/Forms/Login";
import ResetPassword from "./components/Forms/ResetPassword";
import Home from "./components/Forms/Home";
import TestFormations from "./components/Forms/TestFormations/TestFormations";
import Questions from "./components/Forms/Questions/Questions";

function App() {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Layout />} />
      <Route path="addQuestion" element={<Questions />} />
      {/* add sections */}
      <Route path="/createTestFormation" element={<TestFormations />} />
      {/* <Route path="" element={} /> */}
    </Routes>
    // </BrowserRouter>
  );
}

export default App;