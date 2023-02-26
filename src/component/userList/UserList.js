import React, { useState, useEffect } from "react";
import "../friends/friends.css";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const UserList = () => {
  const db = getDatabase();
  const auth = getAuth();

  let [userList, setUserList] = useState([]);
  let [friend, setFriend] = useState([]);
  let [blockUser, setBlockUser] = useState([]);
  let [friendList, setFriendList] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (item.key !== auth.currentUser.uid) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(array);
    });
  }, []);

  let handleFriendRequest = (item) => {
    set(push(ref(db, "friendRequest/")), {
      senderName: auth.currentUser.displayName,
      senderPhoto: auth.currentUser.photoURL,
      senderId: auth.currentUser.uid,
      recieverId: item.id,
      recieverName: item.name,
    });
    // console.log(item, "userlist");
  };

  useEffect(() => {
    const usersRef = ref(db, "friendRequest/");
    onValue(usersRef, (snapshot) => {
      let friendArray = [];
      snapshot.forEach((item) => {
        friendArray.push(item.val().recieverId + item.val().senderId);
        // console.log(item.val().recieverId, "space" + item.val().senderId);
      });
      setFriend(friendArray);
    });
  }, []);

  // friend ache naki check

  useEffect(() => {
    const usersRef = ref(db, "friends/");
    onValue(usersRef, (snapshot) => {
      let friendArray = [];
      snapshot.forEach((item) => {
        friendArray.push(item.val().recieverId + item.val().senderId);
      });
      setFriendList(friendArray);
    });
  }, []);

  // block

  useEffect(() => {
    const usersRef = ref(db, "blockUsers/");
    onValue(usersRef, (snapshot) => {
      let blockArray = [];
      snapshot.forEach((item) => {
        // blockArray.push(item.val().recieverId + item.val().senderId);
        blockArray.push(item.val().blockId + item.val().blockById);
      });
      setBlockUser(blockArray);
    });
  }, []);

  return (
    <div className="friendsList">
      <h2>User</h2>
      {userList.map((item) => (
        <div className="groupItem" key={item.id}>
          <picture>
            <img src={item.photoURL} loading="lazy" />
          </picture>
          <div className="groupText">
            <h3>{item.name}</h3>
            <p>{item.email}</p>
          </div>
          <div className="groupBtn">
            {blockUser.includes(item.id + auth.currentUser.uid) ||
            blockUser.includes(auth.currentUser.uid + item.id) ? (
              <button className="searchBtn">block</button>
            ) : friendList.includes(item.id + auth.currentUser.uid) ||
              friendList.includes(auth.currentUser.uid + item.id) ? (
              <button className="searchBtn">Friend</button>
            ) : friend.includes(item.id + auth.currentUser.uid) ||
              friend.includes(auth.currentUser.uid + item.id) ? (
              <button className="searchBtn">Pending</button>
            ) : (
              <button
                onClick={() => handleFriendRequest(item)}
                className="searchBtn"
              >
                Friend Request
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
