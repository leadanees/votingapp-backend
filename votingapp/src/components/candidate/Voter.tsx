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
import { baseUrl } from "../../config.tsx";
import axios from "axios";
import { UserModel } from "../../models/userModel.tsx";
import { VoterModel } from "../../models/voterModel.tsx";
import { globalService } from "../../utility/GlobleService.tsx";
import { CandidateModel } from "../../models/CandidateModel.tsx";
// import Navbar from "../layouts/Navbar.tsx";

function Voter() {
  const navigate = useNavigate();
  const _id = useParams();
  const userId = _id._id;
  const [userData, setUserData] = useState<UserModel | any>([]);
  const [voterData, setVoterData] = useState<VoterModel | any>([]);
  const [checkVoterExist, setcheckVoterExist] = useState<VoterModel | any>([]);
  const [candidateData, setcandidateData] = useState<CandidateModel | any>([]);
  const [checkVoterExists, setcheckVoterExists] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  useEffect(() => {
    if (userId) {
      getUserdata();
    }
    getVoterData();
    getVoterDataFromUserId();
    getCandidate();

    const expiryDurationInMinutes = 20;
    const expiryTime =
      new Date().getTime() + expiryDurationInMinutes * 60 * 1000;
    localStorage.setItem("sessionExpiryTime", expiryTime.toString());
    const interval = setInterval(checkSessionExpiry, 1000);
    return () => clearInterval(interval);
  }, [_id]);

  const checkSessionExpiry = () => {
    const expiryTime = localStorage.getItem("sessionExpiryTime");
    if (expiryTime) {
      const currentTime = new Date().getTime();
      if (currentTime > parseInt(expiryTime, 10)) {
        setSessionExpired(true);
      }
    }
  };

  if (sessionExpired) {
    globalService.warning("Your session expired.");
    return navigate("/login");
  }

  const getUserdata = async () => {
    let response = await axios.get(baseUrl + `users/getById/${userId}`);
    let result = response.data.data;
    setUserData(result);
  };

  const getVoterData = async () => {
    let response = await axios.get(baseUrl + "voters/getAll");
    let result = response.data.data;
    setVoterData(result);
  };

  const getVoterDataFromUserId = async () => {
    try {
      let response = await axios.get(baseUrl + `voters/getByUserId/${userId}`);
      let result = response.data.data;
      if (result) {
        setcheckVoterExists(true);
      }
      setcheckVoterExist(result);
    } catch (error) {
      globalService.error(error);
    }
  };

  const getCandidate = async () => {
    try {
      let response = await axios.get(baseUrl + `candidates/getAll`);
      let result = response.data.list;
      debugger;
      setcandidateData(result);
    } catch (error) {
      globalService.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const candidateValue = e.target.elements.candidate.value;
    const [candidateId, candidateName] = candidateValue.split('|');
    // to fetch the
    // const isuser = voterData.find((user) => user.username === userData.username);

    // to check whether user exist or not
    const isUsernameMatch = voterData.some(
      (user) => user.email === userData.email
    );

    debugger;
    if (candidateName) {
      if (!isUsernameMatch) {
        const addVoter = () => {
          const payload = {
            userName: userData.username,
            candidate: candidateName,
            email: userData.email,
            userId: userData._id,
            candidateId:candidateId,
          };
          try {
            axios.post(baseUrl + "voters/Add", payload).then((response) => {
              let result = response.data;
              globalService.success("Your Vote Added Successfully");
              navigate("/voter/" + userId);
            });
          } catch (error) {
            console.error("Error adding voter:", error);
          }
        };
        addVoter();
      } else {
        globalService.error("You Already Voted");
      }
    } else {
      globalService.error("Please Select one Candidate");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  
  const handleLoginUser = (e) => {
    e.preventDefault();
    navigate(`/edituser/${userId}`);
  };

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
                  <DropdownItem  onClick={handleLoginUser}>My Profile</DropdownItem>
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
        {!checkVoterExists ? (
          <Row>
            <Col lg="5" className="m-auto">
              <div className="main__conatainer d-flex justify-content-between">
                <div className="candidate__form text-center">
                  <div>
                    <h2>Vote For Candidate</h2>
                  </div>
                  <Form onSubmit={handleSubmit}>
                    {candidateData.map(
                      (cand,index) => (
                        <FormGroup key={cand.id} className="form-group">
                          <input
                            type="radio"
                            name="candidate"
                            value={`${cand._id}|${cand.candidate}`}
                          />
                          <label htmlFor={`candidate${index}`}>
                            {cand.candidate}
                          </label>
                        </FormGroup>
                      )
                    )}
                    {/* <FormGroup className="form-group">
                      <input type="radio" name="candidate" value="Candidate1" />
                      <label htmlFor="candidate1">Candidate 1</label>
                    </FormGroup>
                    <FormGroup className="form-group">
                      <input type="radio" name="candidate" value="Candidate2" />
                      <label htmlFor="candidate2">Candidate 2</label>
                    </FormGroup>
                    <FormGroup className="form-group">
                      <input type="radio" name="candidate" value="Candidate3" />
                      <label htmlFor="candidate3">Candidate 3</label>
                    </FormGroup>
                    <FormGroup className="form-group">
                      <input type="radio" name="candidate" value="Candidate4" />
                      <label htmlFor="candidate4">Candidate 4</label>
                    </FormGroup> */}
                    <div className="d-flex justify-content-center">
                      {/* <Button onClick={handleLogin} className='btnsecondary_btn auth_btn'> Login</Button> */}
                      <Button
                        type="submit"
                        className="btnsecondary_btn auth_btn"
                      >
                        {" "}
                        Vote
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <Col lg="6" className="m-auto">
            <div className="candidate__form">
              <h2>You Already Voted</h2>
            </div>
          </Col>
        )}
      </Container>
    </section>
  );
}

export default Voter;
