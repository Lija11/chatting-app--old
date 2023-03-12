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
import { useDispatch } from "react-redux";
import { activeChat } from "../../slices/activeChat";

const Friends = ({ block }) => {
  const db = getDatabase();
  const auth = getAuth();
  const dispatch = useDispatch();

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
      let userInfo = {};
      if (array[0].recieverId == auth.currentUser.uid) {
        userInfo.status = "single";
        userInfo.id = array[0].senderId;
        userInfo.name = array[0].senderName;
      } else {
        userInfo.status = "single";
        userInfo.id = array[0].recieverId;
        userInfo.name = array[0].recieverName;
      }
      dispatch(activeChat(userInfo));
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

  let handleActiveChat = (item) => {
    let userInfo = {};
    if (item.recieverId == auth.currentUser.uid) {
      userInfo.status = "single";
      userInfo.id = item.senderId;
      userInfo.name = item.senderName;
    } else {
      userInfo.status = "single";
      userInfo.id = item.recieverId;
      userInfo.name = item.recieverName;
    }
    dispatch(activeChat(userInfo));
  };

  return (
    <div>
      <h2>Friends</h2>
      {friendList.map((item) => (
        <div className="boxInnerItem" onClick={() => handleActiveChat(item)}>
          <div className="boxInnerItemText">
            <div className="boxInnerItemTextFlex">
              <picture>
                <img src="images/groupImage.png" loading="lazy" />
              </picture>
              <div className="itemText">
                {auth.currentUser.uid == item.senderId ? (
                  <h5>{item.recieverName}</h5>
                ) : (
                  <h5>{item.senderName}</h5>
                )}
                <p>Hi Guys, Wassup!</p>
              </div>
            </div>
          </div>
          <div className="boxInnerItemBtn">
            {block ? (
              <button onClick={() => handleBlock(item)} className="searchBtn">
                Block
              </button>
            ) : (
              <button className="searchBtn">
                <i className="fa-solid fa-message"></i>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Friends;
