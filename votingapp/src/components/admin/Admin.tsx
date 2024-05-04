import React, { useEffect, useState } from "react";
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
import { baseUrl, ROLES } from "../../config.tsx";
import axios from "axios";
import { VoterCountModel, VoterModel } from "../../models/voterModel.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { UserModel } from "../../models/userModel.tsx";
import { globalService } from "../../utility/GlobleService.tsx";
import { CandidateModel } from "../../models/CandidateModel.tsx";
// import Navbar from "../layouts/Navbar.tsx";

function Admin() {
  const _id = useParams();
  const navigate = useNavigate();
  const userId = _id._id;
  const [voterData, setVoterData] = useState<VoterModel | any>([]);
  const [candidateData, setcandidateData] = useState<CandidateModel | any>([]);
  const [userData, setUserData] = useState<UserModel | any>([]);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [candidateCount , setcandidateCount] = useState<VoterCountModel | any>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [countCandidate1, setCountCandidate1] = useState();
  const [countCandidate2, setCountCandidate2] = useState();
  const [countCandidate3, setCountCandidate3] = useState();
  const [countCandidate4, setCountCandidate4] = useState();

  // const [candidate, setCandidate] = useState(
  //    [{candidt1:0},{candidt2:0},{candidt3:0},{candidt4:0}]
  // );

  useEffect(() => {
    getVoterData();
    if (userId) {
      getUserdata();
    }
    getCandidate();
    getTotalCandidateCount();

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
    try {
      let response = await axios.get(baseUrl + `users/getById/${userId}`);
      let result = response.data.data;
      setUserData(result.username);
    } catch (error) {
      globalService.error(error);
    }
  };

  const getCandidate = async () => {
    try {
      let response = await axios.get(baseUrl + `candidates/getAll`);
      let result = response.data.list;
      setcandidateData(result);
    } catch (error) {
      globalService.error(error);
    }
  };

  const getTotalCandidateCount = async() => {
    await axios.get(baseUrl + `voters/getCandidateCount`).then((response) => {
      let result = response.data.data;
      setcandidateCount(result);
      debugger;
    })
  }

  const getVoterData = async () => {
    try {
      let response = await axios.get(baseUrl + "voters/getAll");
      let result = response.data.data;
      let candy1 = result.filter((cand) => cand.candidate === "Candidate1");
      let candy2 = result.filter((cand) => cand.candidate === "Candidate2");
      let candy3 = result.filter((cand) => cand.candidate === "Candidate3");
      let candy4 = result.filter((cand) => cand.candidate === "Candidate4");

      setCountCandidate1(candy1.length);
      setCountCandidate2(candy2.length);
      setCountCandidate3(candy3.length);
      setCountCandidate4(candy4.length);
      setVoterData(result);
    } catch (error) {
      globalService.error(error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleEditCandidate = (id) => {
    navigate(`/editcandidate/${id}`);
  };

  const handleDetailCandidate = (e) => {
    e.preventDefault();
    navigate(`/adminDetails/${userId}`);
  };

  const handleDeleteCandidate = async (id) => {
    try {
      const response = await axios.delete(baseUrl + `candidates/${id}`);
      const result = response.data;
      globalService.success(result.message);
      navigate(`/admin/${userId}`);
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No Response:", error.request);
      } else {
        console.error("Request Error:", error.message);
      }
      globalService.error(error.message);
    }
  };
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   navigate("/login");
  // };
  
  const handleLoginUser = (e) => {
    e.preventDefault();
    navigate("/addcandidate");
  };

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
                  <DropdownItem  onClick={handleLoginUser}>Add New Candidate</DropdownItem>
                  <DropdownItem  onClick={handleDetailCandidate}>Candidate List</DropdownItem>
                  <DropdownItem  onClick={handleLogin}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </div>
          </div>
        </Row>
      </Container>
    </Navbar>
      {userData === ROLES.Admin && (
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center" style={{ width: "80%", margin: "0 auto" }}>
              <div className="main__conatainerAdmin d-flex justify-content-between">
                <div className="candidate__form">
                  <h2>List Of Candidate</h2>
                  <table className="" style={{ width: "100%", margin: "0 auto" }}>
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Candidates Name</th>
                        <th>Total Vote Of each Candidate</th>
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    {candidateCount &&
                      candidateCount.map((cand, index) => (
                        <tbody key={index}>
                          <tr>
                            <td>{++index}</td>
                            <td>{cand._id.candidate}</td>
                            <td>{cand.count}</td>
                            {/* <td className="d-flex justify-content-between loginregister_btn">
                              <Button className="btnsecondary_btn auth_btn"
                                onClick={() => handleEditCandidate(cand._id.candidateId)}
                              >
                                Edit
                              </Button>
                              <Button className="btnsecondary_btn auth_btn"
                                onClick={() => handleDeleteCandidate(cand._id.candidateId)}
                              >
                                Delete
                              </Button>
                            </td> */}
                          </tr>
                        </tbody>
                      ))}
                    {/* {voterData &&
                      voterData.map((voter, index) => (
                        <tbody>
                          <tr key={index}>
                            <td>{count++}</td>
                            <td>{voter.userName}</td>
                            <td>{voter.candidate}</td>
                          </tr>
                        </tbody>
                      ))} */}
                  </table>
                </div>
              </div>
            </Col>
            {/* <Col lg="6" className="m-auto">
              <div className="main__conatainer d-flex justify-content-between">
                <div className="candidate__form">
                  <h2>Candidate Count</h2>
                  <div className="candidate_box">
                    <h4>Candidate 1 got {countCandidate1} votes</h4>
                  </div>
                  <div className="candidate_box">
                    <h4>Candidate 2 got {countCandidate2} votes</h4>
                  </div>
                  <div className="candidate_box">
                    <h4>Candidate 3 got {countCandidate3} votes</h4>
                  </div>
                  <div className="candidate_box">
                    <h4>Candidate 4 got {countCandidate4} votes</h4>
                  </div>
                </div>
              </div>
            </Col> */}
          </Row>
        </Container>
      )}
    </section>
  );
}

export default Admin;
