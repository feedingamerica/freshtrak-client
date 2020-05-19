/**
 * Created by Basil on 04/04/20.
 */

import React, { useEffect, useState } from "react";

import mainLogo from "../../Assets/img/logo.png";
import navBarIcon from "../../Assets/img/menu.svg";
import closeIcon from '../../Assets/img/close.svg';
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
  const [showMobileMenu, setMobileMenu] = useState(false);
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
                onClick={() => setMobileMenu(true)}
              >
                <span className="navbar-toggler-icon">
                  <img src={navBarIcon} alt="UserLogo" className="img-fluid" />
                </span>
              </button>
            </Navbar.Brand>
            {/* Commented to restrict triggering bootstrap dropdown */}
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
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
                  title="For Foodbanks"
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


            {/* Menu popup div */}

            {
                showMobileMenu && <div id="menuSlider" className="mobile-menu fadeIn">
                    <div className="d-flex h-100 justify-content-centre flex-column">
                        <div className="mobile-menu-items">
                            <div className="menu-item-title">FIND RESOURCES</div>
                                <ul className="mt-2">
                                    <li><a onClick={()=>{setMobileMenu(false);history.push('/freshtrak-about')}}>About FreshTrak</a></li>
                                </ul>
                            </div>
                            <div className="mobile-menu-items mt-4 mb-4">
                            <div className="menu-item-title">FOR FOODBANKS</div>
                                <ul className="mt-2">
                                    <li><a onClick={()=>{setMobileMenu(false);history.push('/freshtrak-working')}}>Working with FreshTrak</a></li>
                                </ul>
                            </div>
                            <hr></hr>
                            {/* Out of Scope */}
                            {/* <div className="status-info"> */}
                            {/* {isLoggedIn ? */}
                            {/* <div className="user-avatar">
                                <NavDropdown title={
                                    <div className="d-flex align-items-center">
                                        <span>
                                        <img className="thumbnail-image" src={userIcon} alt="user pic" />
                                    </span>
                                    <span className="text-uppercase ml-2">MANAGE YOUR ACCOUNT</span>
                                    </div> */}
                                {/* }> */}
                                    {/* <DropdownItem eventKey={1.3} onClick={(() => { localStorage.removeItem('isLoggedIn', false); setIsLoggedIn(false); window.location.reload(); })}>
                                        <i className="fa fa-sign-out"></i> Logout
                                    </DropdownItem>
                                </NavDropdown> */}
                                {/* <div className="user-avatar">
                                {isLoggedIn == false ? <LoggedInComponent/> : <SignInComponent/>} */}
{/* 
                            </div>
                            :

                            <button className="sign-in-button" onClick={() => setModalShow(true)}>
                                Sign In
                                </button>}
                            </div> */}
                        </div>
                        
                    <button className="mobile-close" onClick={() => setMobileMenu(false)}>
                        <img src={closeIcon}/>
                    </button>
                </div>
            }
    </React.Fragment>
  );
};

export default HeaderComponent;
