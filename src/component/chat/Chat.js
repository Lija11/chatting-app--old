import React, { useState, useEffect } from "react";
import "./chat.css";
import { useSelector } from "react-redux";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment/moment";

const Chat = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [message, setMessage] = useState("");
  const [singleMessageList, setSingleMessageList] = useState([]);
  const [groupMessageList, setGroupMessageList] = useState([]);
  let data = useSelector((state) => state.activeChat.value);

  let handleMessage = (e) => {
    setMessage(e.target.value);
  };

  let handleSendMessage = () => {
    if (data.status == "group") {
      set(push(ref(db, "groupMessage/")), {
        whoSendId: auth.currentUser.uid,
        whoSendName: auth.currentUser.displayName,
        whoReceivedId: data.groupId,
        whoReceivedName: data.name,
        message: message,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
    } else {
      set(push(ref(db, "singleMessage/")), {
        whoSendId: auth.currentUser.uid,
        whoSendName: auth.currentUser.displayName,
        whoReceivedId: data.id,
        whoReceivedName: data.name,
        message: message,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
    }
  };

  useEffect(() => {
    const groupMessageRef = ref(db, "groupMessage/");
    onValue(groupMessageRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        // if (
        //   (item.val().whoSendId == auth.currentUser.uid &&
        //     item.val().whoReceivedId == data.groupId) ||
        //   (item.val().whoSendId == data.groupId &&
        //     item.val().whoReceivedId == auth.currentUser.uid)
        // ) {
        //   array.push(item.val());
        // }

        array.push(item.val());
      });
      setGroupMessageList(array);
    });
  }, [data.groupId]);

  useEffect(() => {
    const singleMessageRef = ref(db, "singleMessage/");
    onValue(singleMessageRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (
          (item.val().whoSendId == auth.currentUser.uid &&
            item.val().whoReceivedId == data.id) ||
          (item.val().whoSendId == data.id &&
            item.val().whoReceivedId == auth.currentUser.uid)
        ) {
          array.push(item.val());
        }
      });
      setSingleMessageList(array);
    });
  }, [data.id]);

  return (
    <div>
      <div className="groupItem">
        <picture>
          <img src="images/groupImage.png" loading="lazy" />
        </picture>
        <div className="groupText">
          <h3>{data ? data.name : "Please Select A Friend or Group"}</h3>
          <p>Online</p>
        </div>
        <div className="groupBtn">
          <button className="searchBtn">
            <i className="fa-solid fa-message"></i>
          </button>
        </div>
      </div>
      <div className="chat">
        {data.status == "group"
          ? groupMessageList.map((item) =>
              item.whoSendId !== auth.currentUser.uid
                ? item.whoReceivedId == data.groupId && (
                    <div className="chatText">
                      <h3 className="anotherChats">{item.message}</h3>
                      <h5 className="date">
                        {moment(item.date, "YYYYMMDD h:mm").fromNow()}
                      </h5>
                    </div>
                  )
                : item.whoReceivedId == data.groupId && (
                    <div className="flexChat">
                      <div className="chatText">
                        <h3 className="anotherChats">{item.message}</h3>
                        <h5 className="date">
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </h5>
                      </div>
                    </div>
                  )
            )
          : singleMessageList.map((item) =>
              item.whoSendId !== auth.currentUser.uid ? (
                <div className="chatText">
                  <h3 className="anotherChats">{item.message}</h3>
                  <h5 className="date">
                    {moment(item.date, "YYYYMMDD h:mm").fromNow()}
                  </h5>
                </div>
              ) : (
                <div className="flexChat">
                  <div className="chatText">
                    <h3 className="anotherChats">{item.message}</h3>
                    <h5 className="date">
                      {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </h5>
                  </div>
                </div>
              )
            )}

        {/* <div className="flexChat">
          <div className="chatText">
            <h3 className="anotherChats">{data.message}</h3>
            <h5 className="date">Today, 4:37pm</h5>
          </div>
        </div> */}

        {/* <div className="chatText">
          <h3 className="anotherChats">
            <img src="images/chatImg.png" alt="" />
          </h3>
          <h5 className="date">Today, 4:37pm</h5>
        </div>
        <div className="flexChat">
          <div className="chatText">
            <h3 className="anotherChats">
              <img src="images/chatImg.png" alt="" />
            </h3>
            <h5 className="date">Today, 4:37pm</h5>
          </div>
        </div> */}
      </div>
      <div className="messageSend">
        <input
          className="anotherChats"
          type="text"
          placeholder="Send Your Message"
          onChange={handleMessage}
        />
        <div className="groupBtn">
          <button className="searchBtn" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
