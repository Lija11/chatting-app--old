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

const BlockUser = () => {
  const db = getDatabase();
  const auth = getAuth();

  let [block, setBlock] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "blockUsers/");
    onValue(usersRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (item.val().blockById == auth.currentUser.uid) {
          array.push({
            id: item.key,
            block: item.val().blockName,
            blockId: item.val().blockId,
          });
        } else {
          array.push({
            id: item.key,
            block: item.val().blockBy,
            blockById: item.val().blockById,
          });
        }
      });
      setBlock(array);
    });
  }, []);

  let handleUnblock = (item) => {
    console.log(item, "handleUnblock");
    set(push(ref(db, "friends")), {
      senderName: item.block,
      senderId: item.blockId,
      recieverId: auth.currentUser.uid,
      recieverName: auth.currentUser.displayName,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "blockUsers/" + item.id));
    });
  };

  return (
    <div className="friendRequest">
      <h2>Block List</h2>
      {block.map((item) => (
        <div className="groupItem">
          <picture>
            <img src="images/groupImage.png" loading="lazy" />
          </picture>
          <div className="groupText">
            <h3>{item.block}</h3>
            <p>Hi Guys, Wassup!</p>
          </div>
          <div className="groupBtn">
            {!item.blockById && (
              <button onClick={() => handleUnblock(item)} className="searchBtn">
                Unblock
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlockUser;
