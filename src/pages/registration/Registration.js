import React, { useState } from "react";
import "../../style.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./registration.css";
import { RotatingLines } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cPasswordError, setCpasswordError] = useState("");
  const [show, setShow] = useState(false);
  const [Ferror, setFerror] = useState("");
  const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  let handleName = (e) => {
    setName(e.target.value);
    setNameError("");
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  let handleCpassword = (e) => {
    setCpassword(e.target.value);
    setCpasswordError("");
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email is required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailError("valid email is required");
      }
    }
    if (!name) {
      setNameError("Name is required");
    } else {
      if (name.length <= 2) {
        setNameError("Name must be 2 character");
      }
    }
    if (!password) {
      setPasswordError("Password is required");
    } else {
      if (!/^(?=.*[a-z])/.test(password)) {
        setPasswordError("Password contain at least 1 lowercase");
      } else if (!/^(?=.{8,})/.test(password)) {
        setPasswordError("Password must be 8 characters or longer");
      }
    }

    // else {
    //   if (!/^(?=.*[a-z])/.test(password)) {
    //     setPasswordError("Password contain at least 1 lowercase");
    //   } else if (!/^(?=.*[A-Z])/.test(password)) {
    //     setPasswordError("Password contain at least 1 uppercase");
    //   } else if (!/^(?=.*[0-9])/.test(password)) {
    //     setPasswordError("Password contain at least 1 number");
    //   } else if (!/^(?=.*[!@#$%^&*])/.test(password)) {
    //     setPasswordError("Password contain at least 1 special character");
    //   } else if (!/^(?=.{8,})/.test(password)) {
    //     setPasswordError("Password must be 8 characters or longer");
    //   }
    // }
    if (!cPassword) {
      setCpasswordError("Confirm Password is required");
    } else {
      if (password !== cPassword) {
        setCpasswordError("Confirm password doesn't match");
      }
      if (
        email &&
        name &&
        password &&
        cPassword &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
        /^(?=.*[a-z])/.test(password) &&
        /^(?=.{8,})/.test(password)
      ) {
        setLoader(true);
        createUserWithEmailAndPassword(auth, email, password)
          .then((user) => {
            console.log(user, "userrrrr");
            updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: "images/profile.png",
            })
              .then(() => {
                console.log(user);
                sendEmailVerification(auth.currentUser)
                  .then(() => {
                    setSuccess(
                      "Registration Successful. Please verify your email address"
                    );
                  })
                  .then(() => {
                    console.log(user.user.photoURL);
                    console.log(user, "userrrr");
                    set(ref(db, "users/" + user.user.uid), {
                      name: user.user.displayName,
                      photoURL: user.user.photoURL,
                      email: user.user.email,
                    }).then(() => {
                      setLoader(false);
                      setTimeout(() => {
                        console.log("2s");
                        navigate("/login");
                      }, 2000);
                    });
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            if (errorCode.includes("auth/email-already-in-use")) {
              setFerror("Email Already In Use");
            }
          });
      }
    }
  };

  let handlePasswordShow = () => {
    setShow(!show);
  };

  return (
    <div className="registrationFrom">
      <div className="innerBox">
        <div className="innerBoxText">
          <div className="innerText">
            <h4 className="title-h">Get Started With Easily Register</h4>
            <p className="title-p">Free register and you can enjoy it</p>
          </div>

          <form className="rForm">
            <p style={{ color: "green" }}>{success}</p>
            <div className="input-gap" controlId="formBasicEmail">
              <input
                className="form-control"
                type="email"
                placeholder="Enter email "
                onChange={handleEmail}
              />
              <p className="inputError form-text">
                {emailError}
                {Ferror}
              </p>
            </div>
            <div className="input-gap" controlId="formBasicEmail">
              <input
                className="from form-control"
                type="text"
                placeholder="Enter Name "
                onChange={handleName}
              />
              <p className="inputError form-text">{nameError}</p>
            </div>
            <div className="input-gap" controlId="formBasicEmail">
              <input
                className="from form-control"
                type={show ? "text" : "password"}
                placeholder="Password "
                onChange={handlePassword}
              />
              <p className="inputError form-text">
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
            <div className="input-gap" controlId="formBasicEmail">
              <input
                className="from form-control"
                type="password"
                placeholder="Confirm Password "
                onChange={handleCpassword}
              />
              <p className=" inputError form-text">{cPasswordError}</p>
            </div>
            {loader ? (
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            ) : (
              <button className="btn" type="submit" onClick={handleSubmit}>
                Submit
              </button>
            )}
            <p className="bottom-p">
              Already Have An Account?
              <Link to="/login" className="singIn">
                Sing In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
