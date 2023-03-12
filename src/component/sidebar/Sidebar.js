import React, { useState, useRef } from "react";
import "./sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { TbMessageCircle } from "react-icons/tb";
import { IoMdNotifications } from "react-icons/io";
// import { IoSettings } from "react-icons/io";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import "../../pages/registration/registration.css";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import { Blocks } from "react-loader-spinner";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

const Sidebar = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  const storage = getStorage();

  const [Mobile, setMobile] = useState(false);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [img, setImg] = useState(false);
  const [imgName, setImgName] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  const [cropper, setCropper] = useState();

  const cropperRef = useRef(null);
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setPreviewImg(cropper.getCroppedCanvas().toDataURL());
  };

  let handleSingOut = () => {
    signOut(auth)
      .then(() => {
        toast("Logout Successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let handleImgUpload = () => {
    setShow(!show);
    setImg("");
    setPreviewImg("");
  };

  let handleSelectImg = (e) => {
    setImgName(e.target.files[0].name);
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  // const getCropData = (e) => {
  //   e.preventDefault();
  //   setLoader(true);
  //   const storageRef = ref(storage, imgName);
  //   if (typeof cropper !== "undefined") {
  //     // cropper.getCroppedCanvas().toDataURL();
  //     const message4 = cropper.getCroppedCanvas().toDataURL();
  //     uploadString(storageRef, message4, "data_url").then((snapshot) => {
  //       getDownloadURL(storageRef).then((downloadURL) => {
  //         console.log("File available at", downloadURL);
  //         updateProfile(auth.currentUser, {
  //           photoURL: downloadURL,
  //         })
  //           .then(() => {
  //             setLoader(false);
  //             setShow(false);
  //           })
  //           .catch((error) => {
  //             console.log("error");
  //           });
  //       });
  //     });
  //   }
  // };

  const getCropData = (e) => {
    setLoader(true);
    const storageRef = ref(storage, imgName);
    if (typeof cropper !== "undefined") {
      cropper.getCroppedCanvas().toDataURL();
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
            .then(() => {
              console.log("upload ses");
              setLoader(false);
              setShow(false);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
    }
  };

  return (
    <div className="sidebarMenu">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="profile">
        <div className="profileImg" onClick={handleImgUpload}>
          <picture>
            <img src={auth.currentUser.photoURL} loading="lazy" />
          </picture>
          <div className="imgUpload">
            <i className="fa-solid fa-cloud-arrow-up"></i>
          </div>
        </div>
        <h4>{auth.currentUser.displayName}</h4>
      </div>
      {/* <h4>{auth.currentUser.displayName}</h4> */}

      <div
        className={Mobile ? "nav-links-mobile" : "sidebarIcons"}
        onClick={() => setMobile(false)}
      >
        <NavLink to="/">
          {/* <AiOutlineHome className="icon" /> */}
          <i className="fa-solid fa-house icon"></i>
        </NavLink>
        <NavLink to="/message">
          {/* <TbMessageCircle className="icon" /> */}
          <i className="fa-regular fa-comment-dots icon"></i>
        </NavLink>
        <NavLink to="/notification">
          {/* <IoMdNotifications className="icon" /> */}
          <i className="fa-sharp fa-regular fa-bell icon"></i>
        </NavLink>
        <NavLink to="/setting">
          {/* <AiOutlineSetting className="icon" /> */}
          <i className="fa-solid fa-gear icon"></i>
        </NavLink>
        {/* <RiLogoutCircleRLine className="icon logout" /> */}
        <i
          onClick={handleSingOut}
          class="fa-solid fa-arrow-right-from-bracket icon logout"
        ></i>
      </div>
      <button className="mobile-menu-icon" onClick={() => setMobile(!Mobile)}>
        {Mobile ? (
          <div className="closeIcon">
            <i className="fa-solid fa-xmark" />
          </div>
        ) : (
          <i className="fa-solid fa-bars" />
        )}
      </button>
      {show && (
        // <div className="registrationFrom">
        <div className="ImgUploader">
          <div className="innerBox ">
            <div className="innerBoxText ">
              <div className="innerText">
                <h4 className="title-h">Upload Image</h4>
              </div>
              {previewImg ? (
                <>
                  <img className="profileImg" src={previewImg} />
                  <h4 className="userName">{auth.currentUser.displayName}</h4>
                </>
              ) : (
                <img className="profileImg" src={auth.currentUser.photoURL} />
              )}
              <form className="rForm">
                <div className="input-gap" controlId="formBasicEmail">
                  <input
                    className="form-control"
                    type="file"
                    onChange={handleSelectImg}
                  />
                </div>
                <Cropper
                  src={img}
                  // Cropper.js options
                  style={{ height: 200, maxWidth: 400 }}
                  initialAspectRatio={16 / 9}
                  guides={false}
                  crop={onCrop}
                  ref={cropperRef}
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                />
                {loader ? (
                  <Blocks
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                  />
                ) : (
                  <div className="uploadBtn">
                    <button
                      onClick={getCropData}
                      className="btn forgotBtn"
                      type="submit"
                    >
                      Upload
                    </button>
                    <button
                      className="btn forgotBtn cancelBtn"
                      onClick={() => setShow(false)}
                      type="submit"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
