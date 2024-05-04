import React, { useRef, useEffect, useState } from "react";
import {
  Container,
  Row,
  Button,
  Navbar,
  Nav,
  Dropdown,
  NavbarBrand,
  NavItem,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  NavbarText,
} from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";


const NabBar = () => {
    const navigate = useNavigate();
  const headerRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  
  const handleLoginUser = (e) => {
    e.preventDefault();
    navigate("/addcandidate");
  };
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  return (
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
                  <DropdownItem  onClick={handleLogin}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </div>
          </div>
        </Row>
      </Container>
    </Navbar>
  );
};

export default NabBar;
