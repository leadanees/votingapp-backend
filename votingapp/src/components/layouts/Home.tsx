import React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handelCLick = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  return (
    <section>
      <Container className="vh-100 d-flex align-items-center">
        <Row>
          <Col lg={{ size: 25, offset: 3 }}>
            <div className="main__form text-center">
              <h2>Welcome to Voting App</h2>
              <Button onClick={handelCLick}>Go to Login</Button>
            </div>
          </Col>
          {/* <Col lg="6">
            <div className="login__img">
                <img src={voteImg} alt="" />
            </div>
          </Col> */}
        </Row>
      </Container>
    </section>
  );
}

export default Home;
