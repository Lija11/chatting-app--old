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
  // const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);

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
    <div className="registrationFrom">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="innerBox loginInnerBox">
        <div className="innerTextBox loginBox">
          <div className="innerText">
            <h4 className="title-h">Login to your account!</h4>
          </div>
          <Form>
            <Form.Text className=" inputError">{Ferror}</Form.Text>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                className="from"
                type="email"
                placeholder="Enter email "
                onChange={handleEmail}
              />
              <Form.Text className=" inputError">{emailError}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                className="from"
                type={show ? "text" : "password"}
                placeholder="Password "
                onChange={handlePassword}
              />
              <Form.Text className=" inputError">
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
              </Form.Text>
            </Form.Group>
            <Button className="btn" type="submit" onClick={handleSubmit}>
              Login To Continue
            </Button>
            <p>
              <Link to="/forgotPassword" className="singIn">
                Forgot Password
              </Link>
            </p>
            <p>
              Don't Have An Account?
              <Link to="/registration" className="singIn">
                Registration
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
