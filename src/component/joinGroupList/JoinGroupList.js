import React, { useEffect, useState } from "react";
import "./joinGroupList.css";
import {
  getDatabase,
  ref,
  onValue,
  push,
  remove,
  set,
} from "firebase/database";
import { getAuth } from "firebase/auth";

import { useDispatch } from "react-redux";
import { activeChat } from "../../slices/activeChat";

const JoinGroupList = () => {
  const db = getDatabase();
  const auth = getAuth();
  const dispatch = useDispatch();

  const [joinMyGroupList, setJoinMyGroupList] = useState([]);
  const [joinGroupList, setJoinGroupList] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "createGroup");
    onValue(usersRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (item.val().adminId == auth.currentUser.uid) {
          array.push({ ...item.val(), key: item.key });
        }
      });
      setJoinMyGroupList(array);
    });
  }, []);

  useEffect(() => {
    const usersRef = ref(db, "groupMember");
    onValue(usersRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().userId) {
          array.push(item.val());
        }
      });
      setJoinGroupList(array);
    });
  }, []);

  let handleActiveChat = (item) => {
    console.log("group info", item);
    let userInfo = {
      status: "group",
      groupId: auth.currentUser.uid == item.adminId ? item.key : item.gid,
      // groupId: item.key,
      name: item.groupName,
    };
    dispatch(activeChat(userInfo));
  };

  return (
    <div className="group">
      <div className="createGroup">
        <h2>Joined Groups</h2>
      </div>
      {joinMyGroupList.map((item) => (
        <div className="boxInnerItem" onClick={() => handleActiveChat(item)}>
          <div className="boxInnerItemText">
            <div className="boxInnerItemTextFlex">
              <picture>
                <img src="images/groupImage.png" loading="lazy" />
              </picture>
              <div className="itemText">
                <p>Admin : {item.adminName}</p>
                <h5>{item.groupName}</h5>
                <p>{item.groupTag}</p>
              </div>
            </div>
          </div>
          <div className="boxInnerItemBtn ">
            <div className="groupBtn">
              <button className="searchBtn">
                <i className="fa-solid fa-message"></i>
              </button>
            </div>
          </div>
        </div>
      ))}

      {joinGroupList.map((item) => (
        <div className="boxInnerItem" onClick={() => handleActiveChat(item)}>
          <div className="boxInnerItemText">
            <div className="boxInnerItemTextFlex">
              <picture>
                <img src="images/groupImage.png" loading="lazy" />
              </picture>
              <div className="itemText">
                <p>Admin : {item.adminName}</p>
                <h5>{item.groupName}</h5>
                <p>{item.groupTag}</p>
              </div>
            </div>
          </div>
          <div className="boxInnerItemBtn">
            <div className="groupBtn">
              <button className="searchBtn">
                <i class="fa-solid fa-message"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JoinGroupList;
