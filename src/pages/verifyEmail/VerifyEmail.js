import React, { useState } from "react";
import "../../style.css";
import "../registration/registration.css";

const VerifyEmail = () => {
  return (
    <div className="registrationFrom">
      <div className="innerBox loginInnerBox">
        <div className="innerTextBox loginBox">
          <div className="innerText">
            <h4 className="title-h">Please Verify Your Email</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
