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
                onChange={(e) => setForgotEmail(e.target.value)}
              />
            </Form.Group>
            <Button
              className="btn forgotBtn"
              onClick={handleForgotPassword}
              type="submit"
            >
              Upload
            </Button>
            <Button
              className="btn forgotBtn"
              onClick={handleForgotPassword}
              type="submit"
            >
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
