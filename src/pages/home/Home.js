import React, { useEffect, useState } from "react";
import BlockUser from "../../component/blockUser/BlockUser";
import FriendRequest from "../../component/friendRequest/FriendRequest";
// import "bootstrap/dist/css/bootstrap.css";
import Friends from "../../component/friends/Friends";
import GroupRequest from "../../component/grouprequest/GroupRequest";
import MyGroup from "../../component/myGroup/MyGroup";
import Search from "../../component/search/Search";
import Sidebar from "../../component/sidebar/Sidebar";
import UserList from "../../component/userList/UserList";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import VerifyEmail from "../verifyEmail/VerifyEmail";
import { Scrollbar } from "react-scrollbars-custom";

const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  const [verify, setVerify] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    } else {
      if (auth.currentUser.emailVerified) {
        setVerify(true);
      }
    }
  }, []);

  return (
    <>
      {verify ? (
        <>
          <div className="mobileSidebar">
            <Sidebar />
          </div>
          <div className="homePage">
            <div className="sidebar">
              <Sidebar />
            </div>
            <div className="groupRequest">
              <Scrollbar className="homePageItemBox scrollbarDesign searchHeight">
                <Search />
                <GroupRequest />
              </Scrollbar>
              <Scrollbar className="homePageItemBox scrollbarDesign requestHeight">
                <FriendRequest />
              </Scrollbar>
            </div>
            <div className="friends">
              <Scrollbar className="homePageItemBox scrollbarDesign">
                <Friends block="true" />
              </Scrollbar>
              <Scrollbar className="homePageItemBox scrollbarDesign">
                <MyGroup />
              </Scrollbar>
            </div>
            <div className="userList">
              <Scrollbar className="homePageItemBox scrollbarDesign">
                <UserList />
              </Scrollbar>
              <Scrollbar className="homePageItemBox scrollbarDesign">
                <BlockUser />
              </Scrollbar>
            </div>
          </div>
        </>
      ) : (
        <VerifyEmail />
      )}
    </>
  );
};

export default Home;
