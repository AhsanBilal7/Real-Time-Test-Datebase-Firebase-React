import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

function FormExample() {
  const [validated, setValidated] = useState(false);

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    city: "",
    state: "",
    zip: "",
  });
  const handleSubmit = async (event) => {
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    // setValidated(true);
    event.preventDefault();
    const { firstname, lastname, username, city, state, zip } = userData;
    console.log("Logged in");
    // console.log(userData)
    try {
      if (firstname && lastname && username && city && state && zip) {
        const res = await fetch(
          "https://project-no-1-64816-default-rtdb.firebaseio.com/ahsanone.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstname,
              lastname,
              username,
              city,
              state,
              zip,
            }),
          }
        );

        if (res) {
          setUserData({
            firstname: "",
            lastname: "",
            username: "",
            city: "",
            state: "",
            zip: "",
          });
          alert("Succesfully Loaded");
        }
      } else {
        alert("Please fill out all forms");
      }
    } catch (error) {
      console.log("error", error);
      alert("CAUTION!! There is a problem");
    }
  };
  const change = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      method="POST"
    >
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue=""
            name="firstname"
            value={userData.firstname}
            onChange={change}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            defaultValue=""
            name="lastname"
            value={userData.lastname}
            onChange={change}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              name="username"
              onChange={change}
              value={userData.username}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            name="city"
            value={userData.city}
            onChange={change}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            value={userData.state}
            placeholder="State"
            onChange={change}
            name="state"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type="text"
            placeholder="Zip"
            value={userData.zip}
            onChange={change}
            name="zip"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  );
}

export default FormExample;
