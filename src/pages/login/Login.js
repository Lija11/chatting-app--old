import React, { useState } from "react";
import "../../style.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../registration/registration.css";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [show, setShow] = useState(false);
  const [Ferror, setFerror] = useState("");
  const [loader, setLoader] = useState(false);
  const [forgot, setForgot] = useState(false);

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }
    setLoader(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        toast("Login Successful. Please wait for homepage");
        setTimeout(() => {
          navigate("/");
        }, 4000);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode.includes("auth/user-not-found")) {
          setFerror("User not match");
        }
        if (errorCode.includes("auth/wrong-password")) {
          setFerror("Password not match");
        }
        if (errorCode.includes("auth/invalid-email")) {
          setFerror("invalid-email");
        }
      });
  };

  let handlePasswordShow = () => {
    setShow(!show);
  };

  return (
    <div className="forgot_position">
      <div className="registrationFrom">
        <ToastContainer position="top-center" autoClose={2000} />
        <div className="innerBox loginInnerBox">
          <div className="innerTextBox loginBox">
            <div className="innerText">
              <h4 className="title-h">Login to your account!</h4>
            </div>
            <form>
              <p className=" inputError">{Ferror}</p>
              <div className="input-gap" controlId="formBasicEmail">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter email "
                  onChange={handleEmail}
                />
                <p className=" inputError">{emailError}</p>
              </div>
              <div className="input-gap" controlId="formBasicEmail">
                <input
                  className="form-control"
                  type={show ? "text" : "password"}
                  placeholder="Password "
                  onChange={handlePassword}
                />
                <p className=" inputError">
                  {passwordError}
                  {show ? (
                    <RiEyeFill
                      onClick={handlePasswordShow}
                      className="hidePassword"
                    />
                  ) : (
                    <RiEyeCloseFill
                      onClick={handlePasswordShow}
                      className="hidePassword"
                    />
                  )}
                </p>
              </div>
              <button className="btn" type="submit" onClick={handleSubmit}>
                Login
              </button>
              <div className="forgotPass">
                <p>
                  <Link
                    to="/forgotPassword"
                    className="singIn"
                    onClick={() => setForgot(!forgot)}
                  >
                    Forgot Password
                  </Link>
                </p>
              </div>
              <p>
                Don't Have An Account?
                <Link to="/registration" className="singIn">
                  Registration
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      {forgot && (
        <div className="registrationFrom forgotPasswordForm">
          {/* <div className="forgotPasswordForm"> */}
          <ToastContainer position="top-center" autoClose={5000} />
          <div className="innerBox ">
            <div className="innerTextBox ">
              <div className="innerText">
                <h4 className="title-h">Enter Your Email</h4>
              </div>
              <form>
                <p className=" inputError">{Ferror}</p>
                <div className="input-gap" controlId="formBasicEmail">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Enter email "
                    // onChange={(e) => setForgotEmail(e.target.value)}
                  />
                </div>
              </form>
              <div style={{ display: "flex" }}>
                <button
                  className="btn forgotBtn"
                  // onClick={handleForgotPassword}
                  type="submit"
                >
                  Upload
                </button>
                <button
                  className="btn forgotBtn"
                  type="submit"
                  onClick={() => setShow(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default Login;
