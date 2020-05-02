/**
 * Created by Basil on 04/04/20.
 */

import React, { useEffect, useState } from "react";

import mainLogo from "../../Assets/img/logo.png";
// import navBarIcon from "../../Assets/img/menu.svg";
import { Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import {
  Nav,
  // NavDropdown,
  Navbar,
} from "react-bootstrap";

import { RENDER_URL } from "../../Utils/Urls";
const HeaderComponent = (props) => {
  const [navbarShrink, setNavbarShrink] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const shortHeader = props.shortHeader || "";

  const localIsLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== null) {
      setIsLoggedIn(true);
    }
    window.onscroll = () => {
      if (window.pageYOffset > 100) {
        setNavbarShrink("navbar-shrink");
      } else {
        setNavbarShrink("");
      }
    };
  }, [localIsLoggedIn, isLoggedIn]);

  return (
    <React.Fragment>
      <Nav
        className={`navbar navbar-expand-md navbar-light fixed-top ${navbarShrink} ${shortHeader}`}
        id="mainNav"
      >
        <div className="container">
          <Navbar expand="md" className="w-100">
            <Navbar.Brand className="my-auto mobile-view">
              <span className="my-auto mobile-view">
                <Link to={RENDER_URL.HOME_URL}>
                  <img
                    src={mainLogo}
                    alt="FreshTrak"
                    className="d-inline-block"
                  />{" "}
                </Link>
              </span>
              {/* Out of Scope */}
              {/* <button
                className="navbar-toggler mr-2"
                type="button"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon">
                  <img src={navBarIcon} alt="UserLogo" className="img-fluid" />
                </span>
              </button> */}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {/* Out of Scope */}
            {/* <Navbar.Collapse
              id="navbarCollapse"
              className="justify-content-end"
            >
              <Nav className="navbar-nav small main-menu align-items-center">
                <NavDropdown
                  title="Find Resources"
                  aria-labelledby="dropdown01"
                >
                  <NavDropdown.Item className="dropdown-item" href="#1">
                    Find Resources
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="navbar-nav small  main-menu align-items-center">
                <NavDropdown
                  title="For Food Banks"
                  aria-labelledby="dropdown01"
                >
                  <NavDropdown.Item className="dropdown-item" href="#4">
                    For Food Banks
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse> */}
            <LinkContainer to={RENDER_URL.SIGN_IN}>
              <Nav.Link href="" className="header-sign-in">
                  SIGN IN
              </Nav.Link>
            </LinkContainer>
          </Navbar>
        </div>
      </Nav>

    </React.Fragment>
  );
};

export default HeaderComponent;
