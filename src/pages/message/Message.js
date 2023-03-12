import React from "react";
import JoinGroupList from "../../component/joinGroupList/JoinGroupList";
import Search from "../../component/search/Search";
import Sidebar from "../../component/sidebar/Sidebar";
import "./message.css";
import Friends from "../../component/friends/Friends";
import Chat from "../../component/chat/Chat";
import { Scrollbar } from "react-scrollbars-custom";

const Message = () => {
  return (
    <div className="message">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="groupRequest">
        <Scrollbar className="homePageItemBox scrollbarDesign">
          <Search />
          <JoinGroupList />
        </Scrollbar>
        <div style={{ paddingTop: "5px" }}></div>
        <Scrollbar className="homePageItemBox scrollbarDesign">
          <Friends />
        </Scrollbar>
      </div>
      <div className="inbox">
        <Chat />
      </div>
    </div>
  );
};

export default Message;
