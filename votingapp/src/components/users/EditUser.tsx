import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import {
    Container,
    Form,
    FormGroup,
    Row,
    Button,
    Navbar,
    Col,
    Nav,
    Dropdown,
    NavbarBrand,
    NavItem,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    NavbarText,
  } from "reactstrap";
import { UserModel } from "../../models/userModel";
import { baseUrl } from "../../config.tsx";
import axios from "axios";
import { globalService } from "../../utility/GlobleService.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faPhone,
  faUser,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

function EditUser() {
    const navigate = useNavigate();
    const _id = useParams();
    const userId = _id._id;
  const [userData, setUserData] = useState<UserModel | any>([]);
  const [userSingleData, setuserSingleData] = useState<UserModel | any>([
    {
    _id: "",
    username: "",
    password: "",
    email: "",
    phone: "",}
  ]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phonenumberError, setphonenumberError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);


  useEffect(() => {
    getUserData();
    if(userId){
        getUserById();
    }
  }, []);

  const getUserData = async () => {
    let response = await axios.get(baseUrl + "users/getAll");
    let result = response.data.list;
    setUserData(result);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const getUserById = async() => {
    try {
    await axios.get(baseUrl+`users/getById/${userId}`).then((response) => {
        let result = response.data.data;
        setuserSingleData(result);
    })
    } catch (error) {
      globalService.error(error);  
    }
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
      setUsernameError(value ? "" : "Username is required");
    } else if (name === "password") {
      setPassword(value);
      setPasswordError(value ? "" : "Password is required");
    } else if (name === "email") {
      setEmail(value);
      setEmailError(value ? "" : "Email is required");
    }else if(name === "phonenumber"){
      setphonenumber(value);
      setphonenumberError(value ? "" : "Password is required");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const email = e.target.elements.email.value;
    const phonenumber = e.target.elements.phonenumber.value;

    if (!username || !password || !email || !phonenumber) {
      setUsernameError(username ? "" : "Username is required");
      setPasswordError(password ? "" : "Password is required");
      setEmailError(email ? "" : "Email is required");
      setphonenumberError(phonenumber ? "" : "Password is required");
      return;
    }

    // const isUserExist = userData.find((user) => user.username === username);
    const isEmailExist = userData.find((user) => user.email === email);
    if (!isEmailExist) {
      const userAdd = () => {
        const payload = {
            _id:userId,
          username: username,
          password: password,
          email: email,
          phone: phonenumber,
        };
        try {
          axios.put(baseUrl + `users/Edit`, payload).then((response) => {
            let result = response.data;
            globalService.success(result.message);
            navigate("/login");
          });
        } catch (error) {
          globalService.error(error);
          // console.log(error);
        }
      };
      userAdd();
    } else {
      globalService.error("User Already Exist");
    }
  };

  
//   const handleLogin = (e) => {
//     e.preventDefault();
//     navigate("/login");
//   };
  
//   const handleLoginUser = (e) => {
//     e.preventDefault();
//     navigate(`/edituser/${userId}`);
//   };

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);


  return (
    <section>
        <Navbar  className="nav__conatainer" fluid>
      <Container>
        <Row className="m-1">
            <div className="d-flex justify-content-between m-1 p-1">
          <div>
            <NavbarBrand>Voting App</NavbarBrand>
          </div>
          <div>
            <Nav className="mr-auto" navbar>
              <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle  nav caret>
                  Menu
                </DropdownToggle>
                <DropdownMenu className="drop__dwon">
                  {/* <DropdownItem  onClick={handleLoginUser}>My Profile</DropdownItem> */}
                  <DropdownItem  onClick={handleLogin}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </div>
          </div>
        </Row>
      </Container>
    </Navbar>
      <Container>
        <Row>
          <Col lg="5" className="m-auto">
            <div className="main__conatainerAdmin d-flex justify-content-between">
              <div className="main__form">
                <div>
                  <h2>User Update</h2>
                </div>
                <Form onSubmit={handleSubmit}>
                  <FontAwesomeIcon className="icon" icon={faUser} /> <span>User</span>
                  <FormGroup>
                    <input
                      type="text"
                      name="username"
                      value={userSingleData.username}
                      onChange={handleOnChange}
                      placeholder="Enter username"
                    />
                    {usernameError && (
                      <span className="text-danger">{usernameError}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <FontAwesomeIcon className="icon"  icon={faEnvelope} /> <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      value={userSingleData.email}
                      onChange={handleOnChange}
                      placeholder="Enter email"
                    />
                    {emailError && (
                      <span className="text-danger">{emailError}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <FontAwesomeIcon className="icon" icon={faPhone} /> <span>Phone Number</span>
                    <input
                      type="number"
                      name="phonenumber"
                      value={userSingleData.phone}
                      onChange={handleOnChange}
                      placeholder="Phone No."
                      // min={10}
                      // max={10}
                    />
                     {phonenumberError && (
                      <span className="text-danger">{[phonenumberError]}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <FontAwesomeIcon className="icon" icon={faLock} /> <span>Password</span>
                    <input
                      type="password"
                      name="password"
                      value={userSingleData.password}
                      onChange={handleOnChange}
                      placeholder="Enter Password."
                    />
                    {passwordError && (
                      <span className="text-danger">{passwordError}</span>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-center loginregister_btn">
                    {/* <Button
                      onClick={handleLogin}
                      className="btnsecondary_btn auth_btn"
                    >
                      Login
                    </Button> */}
                    <Button type="submit" className="btnsecondary_btn auth_btn">
                      Update
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

export default EditUser;
