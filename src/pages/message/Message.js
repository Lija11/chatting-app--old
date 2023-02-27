import React from "react";
import JoinGroupList from "../../component/joinGroupList/JoinGroupList";
import Search from "../../component/search/Search";
import Sidebar from "../../component/sidebar/Sidebar";
import "./message.css";
import Friends from "../../component/friends/Friends";
import Chat from "../../component/chat/Chat";
// import "../../pages/registration/registration.css";
// import "./s";

const Message = () => {
  return (
    <div className="message">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="groupRequest">
        <div className="groupAndFriend">
          <Search />
          <JoinGroupList />
        </div>
        <Friends />
      </div>
      <div className="inbox">
        <Chat />
      </div>
    </div>
  );
};

export default Message;
