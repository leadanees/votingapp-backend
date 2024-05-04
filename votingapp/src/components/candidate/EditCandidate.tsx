import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import { baseUrl, ROLES } from "../../config.tsx";
import { UserModel } from "../../models/userModel.tsx";
import axios from "axios";
import { globalService } from "../../utility/GlobleService.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { CandidateModel } from "../../models/CandidateModel.tsx";

function EditCandidate() {
  const _id = useParams();
  const navigate = useNavigate();
  const candidateId = _id._id;
//   const history = useHistory();

  const [candidateData, setcandidateData] = useState<CandidateModel | any>([]);

  const [candidate, setcandidate] = useState("");
  const [candidateError, setcandidateError] = useState("");

  useEffect(() => {
    if(candidateId){
        getCandidateDataById()
    }
    getCandidateData();
  }, []);

  const getCandidateData = async () => {
    let response = await axios.get(baseUrl + "candidates/getAll");
    let result = response.data.list;
    debugger;
    setcandidateData(result);
  };

  const getCandidateDataById = async() => {
    try {
        await axios.get(baseUrl+`candidates/getByCandidateId/${candidateId}`).then((response) => {
            let result = response.data.data;
            debugger;
            setcandidateData(result);
        })
    } catch (error) {
        
    }
  }

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
    if (!candy) {
      const userAdd = () => {
        const payload = {
          candidate: candidate,
          _id:candidateId,
        };
        try {
          axios.put(baseUrl + `candidates/Edit`, payload).then((response) => {
            let result = response.data;
            globalService.success(result.message);
            // navigate("/login");
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
                  <h2>Candidate Edit Page</h2>
                </div>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <FontAwesomeIcon className="icon" icon={faUser} />
                    <span> Candidate Name</span>
                    <input
                      type="text"
                      name="candidate"
                      value={candidateData.candidate}
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

export default EditCandidate;
