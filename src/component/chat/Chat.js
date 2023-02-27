import React from "react";

const Chat = () => {
  return (
    <div>
      <div className="groupItem">
        <picture>
          <img src="images/groupImage.png" loading="lazy" />
        </picture>
        <div className="groupText">
          <h3>name</h3>
          <p>Online</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
