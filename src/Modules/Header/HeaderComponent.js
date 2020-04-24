/**
 * Created by Basil on 04/04/20.
 */

import React, { useEffect, useState } from "react";

import mainLogo from "../../Assets/img/logo.png";
import navBarIcon from "../../Assets/img/menu.svg";
import { Link,useHistory } from "react-router-dom";
import {
  Nav,
  NavDropdown,
  Navbar
} from "react-bootstrap";

import { RENDER_URL } from "../../Utils/Urls";
const HeaderComponent = (props) => {
  const [navbarShrink, setNavbarShrink] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const shortHeader = props.shortHeader || "";
  
  let history = useHistory();

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
              <button
                className="navbar-toggler mr-2"
                type="button"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon">
                  <img src={navBarIcon} alt="UserLogo" className="img-fluid" />
                </span>
              </button>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="navbarCollapse"
              className="justify-content-end"
            >
              <Nav className="navbar-nav small main-menu align-items-center">
                <NavDropdown
                  title="Find Resources"
                  aria-labelledby="dropdown01"
                >
                  <NavDropdown.Item className="dropdown-item" onSelect={()=>{history.push('/freshtrak-about')}}>
                    About Freshtrak
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="navbar-nav small  main-menu align-items-center">
                <NavDropdown
                  title="For Food Banks"
                  aria-labelledby="dropdown01"
                >
                  <NavDropdown.Item className="dropdown-item" onSelect={()=>{history.push('/freshtrak-working')}}>
                    Working with Freshtrak
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </Nav>

    </React.Fragment>
  );
};

export default HeaderComponent;
