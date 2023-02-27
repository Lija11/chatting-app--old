import React, { useState, useEffect } from "react";
import "../friendRequest/friendRequest.css";
import {
  getDatabase,
  ref,
  onValue,
  push,
  remove,
  set,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const MyGroup = () => {
  const db = getDatabase();
  const auth = getAuth();

  const [groupList, setGroupList] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [memberRequest, setMemberRequest] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [showMemberList, setShowMemberList] = useState(false);

  useEffect(() => {
    const usersRef = ref(db, "createGroup");
    onValue(usersRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (item.val().adminId == auth.currentUser.uid) {
          array.push({ ...item.val(), gid: item.key });
        }
      });
      setGroupList(array);
    });
  }, []);

  let handleMemberRequestInfo = (item) => {
    // console.log(item);
    setShowInfo(!showInfo);
    const usersRef = ref(db, "groupJoinRequest/");
    onValue(usersRef, (snapshot) => {
      let array = [];
      snapshot.forEach((gitem) => {
        if (
          item.adminId == auth.currentUser.uid &&
          item.gid == gitem.val().gid
        ) {
          array.push({ ...gitem.val(), key: gitem.key });
        }
      });
      setMemberRequest(array);
    });
  };

  let handleReject = (item) => {
    remove(ref(db, "groupJoinRequest/" + item.key));
  };

  let handleMemberRequestAccept = (item) => {
    set(push(ref(db, "groupMember/")), {
      adminId: item.adminId,
      gid: item.gid,
      groupName: item.groupName,
      groupTag: item.groupTag,
      userId: item.userId,
      userName: item.userName,
      userPhoto: item.userPhoto,
      key: item.key,
      adminName: auth.currentUser.displayName,
    }).then(() => {
      remove(ref(db, "groupJoinRequest/" + item.key));
    });
  };

  let handleMember = (id) => {
    setShowMemberList(true);
    const gMemberRef = ref(db, "groupMember");
    onValue(gMemberRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        console.log("key", item.val());
        if (id.gid == item.val().gid) {
          array.push({ ...item.val(), key: item.key });
        }
      });
      setMemberList(array);
    });
  };

  let handleRemove = (item) => {
    console.log("remove");
    remove(ref(db, "groupMember/" + item.key));
  };

  return (
    <div className="friendRequest">
      <h2>My Group</h2>
      {showInfo ? (
        <>
          <h4>member request info</h4>
          <div className="groupBtn" style={{ marginRight: "10px" }}>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="searchBtn"
            >
              Back
            </button>
          </div>
          {memberRequest.map((item) => (
            <div className="groupItem">
              <picture>
                <img src={item.userPhoto} loading="lazy" />
              </picture>
              <div className="groupText">
                <h3>{item.userName}</h3>
                <p>{item.groupTag}</p>
              </div>
              <div className="groupBtn" style={{ marginRight: "10px" }}>
                <button
                  onClick={() => handleMemberRequestAccept(item)}
                  className="searchBtn"
                >
                  Accept
                </button>
              </div>
              <div className="groupBtn">
                <button
                  onClick={() => handleReject(item)}
                  className="searchBtn"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </>
      ) : showMemberList ? (
        <div className="groupBtn" style={{ marginRight: "10px" }}>
          <button
            onClick={() => setShowMemberList(false)}
            className="searchBtn"
          >
            Back
          </button>
          {memberList.map((item) => (
            <div className="groupItem">
              <picture>
                <img src={item.userPhoto} loading="lazy" />
              </picture>
              <div className="groupText">
                <h3>{item.userName}</h3>
                <p>{item.groupTag}</p>
              </div>
              <div className="groupBtn">
                <button
                  onClick={() => handleRemove(item)}
                  className="searchBtn"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        groupList.map((item) => (
          <div className="groupItem">
            <picture>
              <img src="images/groupImage.png" loading="lazy" />
            </picture>
            <div className="groupText">
              <h3>{item.groupName}</h3>
              <p>{item.groupTag}</p>
            </div>
            <div className="groupBtn" style={{ marginRight: "10px" }}>
              <button
                onClick={() => handleMemberRequestInfo(item)}
                className="searchBtn"
              >
                Info
              </button>
            </div>
            <div className="groupBtn">
              <button className="searchBtn" onClick={() => handleMember(item)}>
                Member
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyGroup;
