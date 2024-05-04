import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import { baseUrl, ROLES } from "../../config.tsx";
import { UserModel } from "../../models/userModel.tsx";
import axios from "axios";
import { globalService } from "../../utility/GlobleService.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { CandidateModel } from "../../models/CandidateModel.tsx";

function Candidate() {
  const navigate = useNavigate();
//   const history = useHistory();

  const [candidateData, setcandidateData] = useState<CandidateModel | any>([]);
  const [candidate, setcandidate] = useState("");
  const [candidateError, setcandidateError] = useState("");

  useEffect(() => {
    getCandidateData();
  }, []);

  const getCandidateData = async () => {
    let response = await axios.get(baseUrl + "candidates/getAll");
    let result = response.data.list;
    debugger;
    setcandidateData(result);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "candidate") {
      setcandidate(value);
      setcandidateError(value ? "" : "candidate is required");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const candidate = e.target.elements.candidate.value;

    if (!candidate) {
      setcandidateError(candidate ? "" : "candidate is required");
      return;
    }

    const candy = candidateData.find((cand) => cand.candidate === candidate);
    debugger;
    if (!candy) {
      const userAdd = () => {
        const payload = {
          candidate: candidate,
        };
        try {
          axios.post(baseUrl + `candidates/Add`, payload).then((response) => {
            let result = response.data;
            globalService.success(result.message);
            navigate(`/login`);
          });
        } catch (error) {
          globalService.error(error);
          // console.log(error);
        }
      };
      userAdd();
    } else {
      globalService.error("Candidate Already Exist");
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
                  <h2>Candidate Page</h2>
                </div>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <FontAwesomeIcon className="icon" icon={faUser} />
                    <span> Candidate Name</span>
                    <input
                      type="text"
                      name="candidate"
                      value={candidate}
                      onChange={handleOnChange}
                      placeholder="Enter New Candidate Name"
                    />
                    {candidateError && (
                      <span className="text-danger">{candidateError}</span>
                    )}
                  </FormGroup>
                  {/* <FormGroup>
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
                  </FormGroup> */}
                  <div className="d-flex justify-content-center">
                    {/* <Button onClick={handleLogin} className='btnsecondary_btn auth_btn'> Login</Button> */}
                    <Button type="submit" className="btnsecondary_btn auth_btn">
                      {" "}
                      Add
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

export default Candidate;
