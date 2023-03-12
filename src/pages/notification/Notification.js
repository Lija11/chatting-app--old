import React from "react";
import Sidebar from "../../component/sidebar/Sidebar";
import "./notification.css";

const Notification = () => {
  return (
    <div className="notification">
      <div className="notificationSidebar">
        <Sidebar />
      </div>
      <div className="notificationItem">
        <h1>coming soon...</h1>
      </div>
    </div>
  );
};

export default Notification;
