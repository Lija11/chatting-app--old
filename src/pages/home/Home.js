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
        <div className="homePage">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="groupRequest">
            <div className="searchGroup">
              <Search />
              <GroupRequest />
            </div>
            <FriendRequest />
          </div>
          <div className="friends">
            <Friends />
            <MyGroup />
          </div>
          <div className="userList">
            <UserList />
            <BlockUser />
          </div>
        </div>
      ) : (
        <VerifyEmail />
      )}
    </>
  );
};

export default Home;
