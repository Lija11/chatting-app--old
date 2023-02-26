import React from "react";
import Form from "react-bootstrap/Form";
import "../../pages/registration/registration.css";
import "./search.css";

const Search = () => {
  return (
    <div>
      <Form.Group className="mb-3 search" controlId="formBasicEmail">
        <Form.Control className="from" type="text" placeholder="Search... " />
      </Form.Group>
    </div>
  );
};

export default Search;
