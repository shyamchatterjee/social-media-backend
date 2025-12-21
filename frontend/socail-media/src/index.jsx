import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./component/home/home";
import "./App.css";
import { ContextFunction } from "./context/context";
import Login from "./component/user/login";
import { ToastContainer } from "react-toastify";
import Register from "./component/user/register";
function App() {
  return (
    <>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <ContextFunction>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ContextFunction>
      </BrowserRouter>
    </>
  );
}

export default App;
