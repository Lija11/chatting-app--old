import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "./grouprequest.css";
import {
  getDatabase,
  ref,
  onValue,
  push,
  remove,
  set,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const GroupRequest = () => {
  const db = getDatabase();
  const auth = getAuth();

  const [dark, setDark] = useState(false);
  const [createGroup, setCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupTag, setGroupTag] = useState("");
  const [groupList, setGroupList] = useState([]);

  let handleGroupSubmit = (e) => {
    e.preventDefault();
    set(push(ref(db, "createGroup/")), {
      groupName: groupName,
      groupTag: groupTag,
      adminName: auth.currentUser.displayName,
      adminId: auth.currentUser.uid,
      userPhoto: auth.currentUser.uid,
    }).then(() => {
      setCreateGroup(false);
    });
  };

  useEffect(() => {
    const usersRef = ref(db, "createGroup");
    onValue(usersRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        // console.log("create Group", item.val());
        console.log("create Group", auth.currentUser.uid == item.val().adminId);
        if (item.val().adminId !== auth.currentUser.uid) {
          array.push({ ...item.val(), gid: item.key });
        }
      });
      setGroupList(array);
    });
  }, []);

  let handleJoin = (item) => {
    // console.log(item, "item");
    set(push(ref(db, "groupJoinRequest/")), {
      adminId: item.adminId,
      adminName: item.adminName,
      gid: item.gid,
      groupName: item.groupName,
      groupTag: item.groupTag,
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName,
      userPhoto: auth.currentUser.photoURL,
    });

    // console.log(item, "item");
  };

  return (
    <div>
      <div className="createGroup">
        <h2>Group List</h2>
        <div className="groupBtn">
          <button
            onClick={() => setCreateGroup(!createGroup)}
            className="createBtn"
          >
            {createGroup ? "Go Back" : "Create Group"}
          </button>
        </div>
      </div>
      {createGroup ? (
        <>
          <form className="rForm">
            <div className="input-gap" controlId="formBasicEmail">
              <input
                className={dark ? "lightMode" : "form-control"}
                type="text"
                placeholder="Group Name "
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <div className="input-gap" controlId="formBasicEmail">
              <input
                className={dark ? "lightMode" : "form-control"}
                type="text"
                placeholder="Group tagline "
                onChange={(e) => setGroupTag(e.target.value)}
              />
            </div>
            <button
              onClick={handleGroupSubmit}
              className="searchBtn"
              type="submit"
            >
              Create Group
            </button>
          </form>
        </>
      ) : groupList.length == 0 ? (
        <h5 className="available">No Group Available</h5>
      ) : (
        groupList.map((item) => (
          <div className="boxInnerItem">
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
              {groupList.includes(item.adminId + auth.currentUser.uid) ||
              groupList.includes(auth.currentUser.uid + item.adminId) ? (
                <button className="searchBtn">Joined</button>
              ) : (
                <button onClick={() => handleJoin(item)} className="searchBtn">
                  Join
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GroupRequest;
