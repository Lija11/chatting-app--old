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
    }).then(() => {
      setCreateGroup(false);
    });
  };

  useEffect(() => {
    const usersRef = ref(db, "createGroup");
    onValue(usersRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
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
    <div className="group">
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
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                className="from"
                type="text"
                placeholder="Group Name "
                onChange={(e) => setGroupName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                className="from"
                type="text"
                placeholder="Group tagline "
                onChange={(e) => setGroupTag(e.target.value)}
              />
            </Form.Group>
            <Button
              onClick={handleGroupSubmit}
              className="createBtn"
              type="submit"
            >
              Create Group
            </Button>
          </Form>
        </>
      ) : (
        groupList.map((item) => (
          <div className="groupItem">
            <picture>
              <img src="images/groupImage.png" loading="lazy" />
            </picture>
            <div className="groupText">
              <p>Admin : {item.adminName}</p>
              <h3>{item.groupName}</h3>
              <p>{item.groupTag}</p>
            </div>
            <div className="groupBtn">
              <button onClick={() => handleJoin(item)} className="searchBtn">
                Join
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GroupRequest;
