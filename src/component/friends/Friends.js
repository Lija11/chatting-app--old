import "./friends.css";
import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  push,
  remove,
  set,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const Friends = () => {
  const db = getDatabase();
  const auth = getAuth();

  let [friendList, setFriendList] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "friends/");
    onValue(usersRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().recieverId ||
          auth.currentUser.uid == item.val().senderId
        ) {
          array.push({ ...item.val(), key: item.key });
        }
      });
      setFriendList(array);
    });
  }, []);

  let handleBlock = (item) => {
    auth.currentUser.uid == item.senderId
      ? set(push(ref(db, "blockUsers/")), {
          blockName: item.recieverName,
          blockId: item.recieverId,
          blockBy: item.senderName,
          blockById: item.senderId,
        }).then(() => {
          remove(ref(db, "friends/" + item.key));
        })
      : set(push(ref(db, "blockUsers/")), {
          blockName: item.senderName,
          blockId: item.senderId,
          blockBy: item.recieverName,
          blockById: item.recieverId,
        }).then(() => {
          remove(ref(db, "friends/" + item.key));
        });
  };

  return (
    <div className="friendsList">
      <h2>Friends</h2>
      {friendList.map((item) => (
        <div className="groupItem">
          <picture>
            <img src="images/groupImage.png" loading="lazy" />
          </picture>
          <div className="groupText">
            {auth.currentUser.uid == item.senderName ? (
              <h3>{item.recieverName}</h3>
            ) : (
              <h3>{item.senderName}</h3>
            )}
            <p>Hi Guys, Wassup!</p>
          </div>
          <div className="groupBtn">
            <button onClick={() => handleBlock(item)} className="searchBtn">
              Block
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Friends;
