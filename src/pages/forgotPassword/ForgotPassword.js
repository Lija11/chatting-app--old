// import React, { useState } from "react";
// import "../../style.css";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import "../registration/registration.css";
// import "./forgotPassword.css";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { getAuth, sendPasswordResetEmail } from "firebase/auth";

// const ForgotPassword = () => {
//   let navigate = useNavigate();
//   const [forgotEmail, setForgotEmail] = useState("");
//   const [Ferror, setFerror] = useState("");

//   // forget password

//   let handleForgotPassword = (e) => {
//     e.preventDefault();
//     sendPasswordResetEmail(auth, forgotEmail)
//       .then(() => {
//         toast("Please Check Your Inbox");
//         setTimeout(() => {
//           navigate("/login");
//         }, 5000);
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         console.log(errorCode);
//         if (errorCode.includes("auth/missing-email")) {
//           setFerror("Email Not Register");
//         }
//         // ..
//       });
//   };

//   const auth = getAuth();
//   return (
//     <div className="registrationFrom">
//       <ToastContainer position="top-center" autoClose={5000} />
//       <div className="innerBox loginInnerBox">
//         <div className="innerTextBox loginBox">
//           <div className="innerText">
//             <h4 className="title-h">Login to your account!</h4>
//           </div>
//           <Form>
//             <Form.Text className=" inputError">{Ferror}</Form.Text>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Control
//                 className="from"
//                 type="email"
//                 placeholder="Enter email "
//                 onChange={(e) => setForgotEmail(e.target.value)}
//               />
//             </Form.Group>
//             <Button
//               className="btn forgotBtn"
//               onClick={handleForgotPassword}
//               type="submit"
//             >
//               Forgot Password
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState } from "react";
import "../../style.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../registration/registration.css";
import "./forgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  let navigate = useNavigate();
  const [forgotEmail, setForgotEmail] = useState("");
  const [Ferror, setFerror] = useState("");
  const [show, setShow] = useState(false);

  // forget password

  let handleForgotPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, forgotEmail)
      .then(() => {
        toast("Please Check Your Inbox");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode.includes("auth/missing-email")) {
          setFerror("Email Not Register");
        }
        // ..
      });
  };

  const auth = getAuth();
  return (
    <div className="registrationFrom">
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
                onChange={(e) => setForgotEmail(e.target.value)}
              />
            </div>
          </form>
          <div style={{ display: "flex" }}>
            <button
              className="btn forgotBtn"
              onClick={handleForgotPassword}
              type="submit"
            >
              Upload
            </button>
            {!show && (
              <button
                className="btn forgotBtn"
                type="submit"
                onClick={() => setShow(show)}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

{
  /* {forgot && (
        <div className="registrationFrom forgotPasswordForm">
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
        </div>
      )} */
}
