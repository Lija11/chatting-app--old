import React, { useState, useEffect } from "react";
import "./chat.css";
import { useSelector } from "react-redux";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment/moment";
import EmojiPicker from "emoji-picker-react";
import { ImCross } from "react-icons/im";
import ScrollableFeed from "react-scrollable-feed";
import {
  getStorage,
  ref as storageRef,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

const Chat = () => {
  const db = getDatabase();
  const auth = getAuth();
  const storage = getStorage();
  const storageRef = sref(storage, "some-child");

  let [audio, setAudio] = useState("");
  let [audioData, setAudioData] = useState("");
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudioData(blob);
    setAudio(url);
  };

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState("");
  const [singleMessageList, setSingleMessageList] = useState([]);
  const [groupMessageList, setGroupMessageList] = useState([]);
  let data = useSelector((state) => state.activeChat.value);

  let handleMessage = (e) => {
    setMessage(e.target.value);
  };

  let handleAudioUpload = () => {
    uploadBytes(storageRef, audioData).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        console.log("File available at", downloadURL);
        set(push(ref(db, "singleMessage/")), {
          whoSendId: auth.currentUser.uid,
          whoSendName: auth.currentUser.displayName,
          whoReceivedId: data.id,
          whoReceivedName: data.name,
          audio: downloadURL,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        }).then(() => {
          setAudio("");
        });
      });
    });
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
      }).then(() => {
        setMessage("");
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
      }).then(() => {
        setMessage("");
      });
    }
  };

  useEffect(() => {
    const groupMessageRef = ref(db, "groupMessage/");
    onValue(groupMessageRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
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

  let handleSingleImgUpload = (e) => {
    setFile(e.target.files[0]);
  };

  let handleUpload = () => {
    if (data.status == "group") {
      const singleImgStorageRef = sref(storage, "groupMessage/" + file.name);
      const uploadTask = uploadBytesResumable(singleImgStorageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            set(push(ref(db, "groupMessage/")), {
              whoSendId: auth.currentUser.uid,
              whoSendName: auth.currentUser.displayName,
              whoReceivedId: data.groupId,
              whoReceivedName: data.name,
              img: downloadURL,
              date: `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
            }).then(() => {
              setShow("");
            });
          });
        }
      );
    } else {
      const singleImgStorageRef = sref(storage, "singleImages/" + file.name);
      const uploadTask = uploadBytesResumable(singleImgStorageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            set(push(ref(db, "singleMessage/")), {
              whoSendId: auth.currentUser.uid,
              whoSendName: auth.currentUser.displayName,
              whoReceivedId: data.id,
              whoReceivedName: data.name,
              img: downloadURL,
              date: `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
            }).then(() => {
              setShow("");
            });
          });
        }
      );
    }
  };

  return (
    <div>
      <div className="boxInnerItem">
        <picture>
          <img src="images/groupImage.png" loading="lazy" />
        </picture>
        <div className="boxInnerItemTextFlex">
          <div className="boxInnerItemText">
            <h5>{data ? data.name : "Please Select A Friend or Group"}</h5>
            <p>Online</p>
          </div>
        </div>
      </div>
      <div className="chat">
        <ScrollableFeed>
          {data.status == "group"
            ? groupMessageList.map((item) =>
                item.whoSendId !== auth.currentUser.uid ? (
                  item.whoReceivedId == data.groupId && item.message ? (
                    <div className="chatText">
                      <h3 className="anotherChats">{item.message}</h3>
                      <h5 className="date">
                        {moment(item.date, "YYYYMMDD h:mm").fromNow()}
                      </h5>
                    </div>
                  ) : (
                    <div className="chatText">
                      <div className="chattingImg">
                        <img src={item.img} alt="" />
                      </div>
                      <h5 className="date">
                        <h5 className="date">
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </h5>
                      </h5>
                    </div>
                  )
                ) : item.whoReceivedId == data.groupId && item.message ? (
                  <div className="flexChat">
                    <div className="chatText">
                      <h3 className="anotherChats">{item.message}</h3>
                      <h5 className="date">
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                      </h5>
                    </div>
                  </div>
                ) : (
                  <div className="flexChat">
                    <div className="chatText">
                      <div className="chattingImg">
                        <img src={item.img} alt="" />
                      </div>
                      <h5 className="date">
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                      </h5>
                    </div>
                  </div>
                )
              )
            : singleMessageList.map((item) =>
                item.whoSendId !== auth.currentUser.uid ? (
                  item.audio ? (
                    <div className="chatText">
                      {/* <h3 className="anotherChats">{item.message}</h3> */}
                      <audio
                        className="anotherChats"
                        controls
                        src={item.audio}
                      ></audio>
                      <h5 className="date">
                        {moment(item.date, "YYYYMMDD h:mm").fromNow()}
                      </h5>
                    </div>
                  ) : item.message ? (
                    <div className="chatText">
                      <h3 className="anotherChats">{item.message}</h3>
                      <h5 className="date">
                        {moment(item.date, "YYYYMMDD h:mm").fromNow()}
                      </h5>
                    </div>
                  ) : (
                    <div className="chatText">
                      <div className="chattingImg">
                        <img src={item.img} alt="" />
                      </div>
                      <h5 className="date">
                        <h5 className="date">
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </h5>
                      </h5>
                    </div>
                  )
                ) : item.audio ? (
                  <div className="flexChat">
                    <div className="chatText">
                      {/* <h3 className="anotherChats">{item.message}</h3> */}
                      <audio
                        className="anotherChats"
                        controls
                        src={item.audio}
                      ></audio>
                      <h5 className="date">
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                      </h5>
                    </div>
                  </div>
                ) : item.message ? (
                  <div className="flexChat">
                    <div className="chatText">
                      <h3 className="anotherChats">{item.message}</h3>
                      <h5 className="date">
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                      </h5>
                    </div>
                  </div>
                ) : (
                  <div className="flexChat">
                    <div className="chatText">
                      <div className="chattingImg">
                        <img src={item.img} alt="" />
                      </div>
                      <h5 className="date">
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                      </h5>
                    </div>
                  </div>
                )
              )}
        </ScrollableFeed>
      </div>
      <div className="messageSend">
        {audio && (
          <>
            <audio controls src={audio}></audio>
            <br />
            <button className="searchBtn upload" onClick={handleAudioUpload}>
              Send
            </button>
            <button className="searchBtn cancel" onClick={() => setAudio("")}>
              Cancel
            </button>
          </>
        )}

        <input
          className="anotherChats"
          type="text"
          placeholder="Send Your Message"
          onChange={handleMessage}
          value={message}
        />
        <div className="groupBtn">
          <button className="searchBtn" onClick={handleSendMessage}>
            Send
          </button>
        </div>

        <div className="imgIcon">
          <i className="fa-regular fa-image" onClick={() => setShow(true)}></i>
        </div>
        {showEmoji && (
          <div className="emojiIcon">
            <EmojiPicker onEmojiClick={(e) => setMessage(message + e.emoji)} />
          </div>
        )}
        <div className="imgIcon emoji">
          {showEmoji ? (
            <ImCross
              className="crossIcon"
              onClick={() => setShowEmoji(false)}
            />
          ) : (
            <i
              className="fa-regular fa-face-smile"
              onClick={() => setShowEmoji(true)}
            ></i>
          )}
        </div>

        <div className="voiceRecord">
          <AudioRecorder
            onRecordingComplete={(blob) => addAudioElement(blob)}
            recorderControls={recorderControls}
          />
        </div>
      </div>
      {show && (
        <div className="uploadImg">
          <div className="imgBox">
            <h3>Select Image For Upload</h3>
            <input type="file" onChange={handleSingleImgUpload} />
            <h4>{progress}%</h4>
            <br />
            <button className="searchBtn upload" onClick={handleUpload}>
              Upload
            </button>
            <button className="searchBtn cancel" onClick={() => setShow(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
