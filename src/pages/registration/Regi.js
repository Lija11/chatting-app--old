import React from "react";
import "../../style.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Registration = () => {
  return (
    <div className="flex">
      <div className="w-1/2">
        <div className="w-[800px] h-[800px] text-box drop-shadow-box1 ml-40 my-14 bg-box">
          <div className="p-20">
            <h4 className="font-montserrat font-bold text-fontH4 text-heading text-center">
              Get Started With Easily Register
            </h4>
            {/* <h4 className="lija">Get Started With Easily Register</h4> */}
            <p className="text-p text-center text-fontP mb-10">
              Free register and you can enjoy it
            </p>

            <Form>
              {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className="w-6/12 block m-auto h-[55px] bg-[#191b1e] rounded-md border-solid border-2 border-[#191b1e] drop-shadow-inner"
                  type="email"
                  placeholder="Enter email "
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className="from"
                  type="email"
                  placeholder="Enter email "
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group> */}
              <Button className="bg-heading" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <h1 className="text-h1 text-heading">hihihusjhbfdjgdh</h1>
        {/* <picture>
          <img
            className="h-screen w-full object-cover"
            src="images/registration.png"
            loading="lazy"
          />
        </picture> */}
      </div>
    </div>
  );
};

export default Registration;
