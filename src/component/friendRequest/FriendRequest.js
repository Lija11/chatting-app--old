import React, { useState, useEffect } from "react";
import "./friendRequest.css";
import {
  getDatabase,
  ref,
  onValue,
  push,
  remove,
  set,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const FriendRequest = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [friendRequest, setFriendRequest] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "friendRequest/");
    onValue(usersRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (item.val().recieverId == auth.currentUser.uid) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setFriendRequest(array);
    });
  }, []);

  let handleFriendRequestAccept = (item) => {
    console.log(item, "friendRequest");
    set(push(ref(db, "friends/")), {
      id: item.id,
      senderName: item.senderName,
      senderPhoto: item.senderPhoto,
      senderId: item.senderId,
      recieverId: item.recieverId,
      recieverName: item.recieverName,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "friendRequest/" + item.id));
    });

    console.log(item);
  };

  return (
    <div className="friendRequest">
      <h2>Friend Request</h2>
      {friendRequest.length == 0 ? (
        <h1>No Friend Request Available</h1>
      ) : (
        friendRequest.map((item) => (
          <div className="groupItem">
            <picture>
              <img src={item.senderPhoto} loading="lazy" />
            </picture>
            <div className="groupText">
              <h3>{item.senderName}</h3>
              <p>Hi Guys, Wassup!</p>
            </div>
            <div className="groupBtn">
              <button
                className="searchBtn"
                onClick={() => handleFriendRequestAccept(item)}
              >
                Accept
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendRequest;
