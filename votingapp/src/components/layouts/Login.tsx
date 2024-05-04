import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import { baseUrl, ROLES } from "../../config.tsx";
import { UserModel } from "../../models/userModel.tsx";
import axios from "axios";
import { globalService } from "../../utility/GlobleService.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';



function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserModel | any>([]);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    voterdt();
  }, []);

  const voterdt = async () => {
    let response = await axios.get(baseUrl + "users/getAll");
    let result = response.data.list;
    setUserData(result);
    }

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  
  const handleOnChange = (e) => {
    const { name, value } = e.target;
   if (name === "password") {
      setPassword(value);
      setPasswordError(value ? "" : "Password is required");
    } else if (name === "email") {
      setEmail(value);
      setEmailError(value ? "" : "Email is required");
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    if (!password || !email ) {
      setPasswordError(password ? "" : "Password is required");
      setEmailError(email ? "" : "Email is required");
      return;
    }

    const user = userData.find((user) => user.email === email && user.password === password);
    debugger;
    if (user) {
        debugger;
      if (user.username === ROLES.Admin) {
        globalService.success("Successfully Login");
        navigate("/admin/" + user._id);
      } else {
        globalService.success("Successfully Login");
        navigate("/voter/" + user._id);
      }
    } else {
        globalService.error("Invalid username and password")
    }
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="5" className="m-auto">
            <div className="main__conatainer d-flex justify-content-between">
              <div className="main__form">
                <div>
                  <h2>Login</h2>
                </div>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <FontAwesomeIcon className="icon"  icon={faUser}/><span>  User Email</span>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleOnChange}
                      placeholder="Enter email"
                    />
                     {emailError && (
                      <span className="text-danger">{emailError}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                  <FontAwesomeIcon className="icon"  icon={faLock}/> <span>Password</span>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleOnChange}
                      placeholder="Enter Password."
                    />
                     {passwordError && (
                      <span className="text-danger">{passwordError}</span>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between loginregister_btn">
                    <Button type="submit" className="btnsecondary_btn auth_btn">
                      Login
                    </Button>
                    <Button
                      onClick={handleRegister}
                      className="btnsecondary_btn auth_btn"
                    >
                      Register
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;
