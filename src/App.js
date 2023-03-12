import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./component/sidebar/Sidebar";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Message from "./pages/message/Message";
import Notification from "./pages/notification/Notification";
import Registration from "./pages/registration/Registration";
import Setting from "./pages/setting/Setting";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import "./style.css";
function App() {
  let [dark, setDark] = useState(false);

  return (
    <div className={dark ? "lightmode" : "darkmode"}>
      {/* <div className={dark && "bg-white text-white"}> */}
      {/* <div>
        <input
          className="dark"
          onChange={() => setDark(!dark)}
          id="abc"
          type="checkbox"
        />
        <label className="abc" for="abc"></label>{" "}
        <span>{dark ? "Light" : "Dark"}</span>
      </div> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verifyEmail" element={<VerifyEmail />} />
        <Route path="/message" element={<Message />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </div>
  );
}

export default App;
