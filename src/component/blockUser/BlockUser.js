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
    <div>
      <h2>Block List</h2>
      {block.length == 0 ? (
        <h5 className="available">No Block User Available</h5>
      ) : (
        block.map((item) => (
          <div className="boxInnerItem">
            <div className="boxInnerItemText">
              <div className="boxInnerItemTextFlex">
                <picture>
                  <img src="images/groupImage.png" loading="lazy" />
                </picture>
                <div className="itemText">
                  <h5>{item.block}</h5>
                  <p>Hi Guys, Wassup!</p>
                </div>
              </div>
            </div>

            <div className="boxInnerItemBtn">
              {!item.blockById && (
                <button
                  onClick={() => handleUnblock(item)}
                  className="searchBtn"
                >
                  Unblock
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlockUser;
