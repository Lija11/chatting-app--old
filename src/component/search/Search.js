import React from "react";
import Form from "react-bootstrap/Form";
import "../../pages/registration/registration.css";
import "./search.css";

const Search = ({ handleSearch }) => {
  return (
    <div>
      <Form.Group className="mb-3 search" controlId="formBasicEmail">
        <Form.Control
          className="from"
          type="text"
          placeholder="Search... "
          onChange={handleSearch}
        />
      </Form.Group>
    </div>
  );
};

export default Search;
