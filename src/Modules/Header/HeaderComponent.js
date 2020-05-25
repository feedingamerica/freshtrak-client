/**
* Created by Basil on 04/04/20.
*/

import React, { useEffect, useState } from "react";

import mainLogo from "../../Assets/img/logo.png";
import navBarIcon from "../../Assets/img/menu.svg";
import userIcon from "../../Assets/img/Mask.svg";
import {useHistory,Link} from 'react-router-dom';
import closeIcon from '../../Assets/img/close.svg';
import ButtonComponent from '../General/ButtonComponent';
import {
    Nav,
    NavDropdown,
    Navbar,
    DropdownItem
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
                                />
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

                            {isLoggedIn ? (
                            <div className="user-avatar">
                                <NavDropdown
                                    title={
                                        <img
                                        className="thumbnail-image"
                                        src={userIcon}
                                        alt="user pic"
                                        />}>
                                    <DropdownItem
                                        eventKey={1.3}
                                        onClick={() => {
                                        localStorage.removeItem("isLoggedIn", false);
                                        setIsLoggedIn(false);
                                        window.location.reload();
                                        }}
                                        >
                                        <i className="fa fa-sign-out"></i> Logout
                                    </DropdownItem>
                                </NavDropdown>
                            </div>
                            ) : (              
                                <ButtonComponent type ='button' data-testid="signin" name="signin" dataid= 'signin' id="sign-in" value="Sign In" className = 'sign-in-button' onClickfunction={()=>{history.push('/account/signin')}} />
                            )}
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </Nav>
            {/* Menu popup div */}
            {
            showMobileMenu && <div id="menuSlider" className="mobile-menu fadeIn">
                <div className="d-flex h-100 justify-content-end flex-column">
                    <div className="mobile-menu-items mt-4 mb-4">
                      <div className="menu-item-title">FIND RESOURCES</div>
                                <ul className="mt-2">
                                    <li><Link to ="/freshtrak-about">About FreshTrak</Link></li>
                                </ul>
                            </div>
                            <div className="mobile-menu-items mt-4 mb-4">
                            <div className="menu-item-title">FOR FOODBANKS</div>
                                <ul className="mt-2">
                                    <li><Link to ="/freshtrak-working">About FreshTrak</Link></li>
                                </ul>
                            </div>
                            <hr></hr>

                        <div className="status-info">
                            {isLoggedIn ?
                            <div className="user-avatar">
                                <div className="d-flex align-items-center">
                                    {/* temporarily logout is set while clicking user icon */}
                                    <span  onClick={(() => { localStorage.removeItem('isLoggedIn', false); setIsLoggedIn(false); window.location.reload(); })}>
                                    <img className="thumbnail-image" src={userIcon} alt="user pic" />
                                    </span>
                                    <span className="text-uppercase ml-2">MANAGE YOUR ACCOUNT</span>
                                </div>
                                {/* <span  onClick={(() => { localStorage.removeItem('isLoggedIn', false); setIsLoggedIn(false); window.location.reload(); })}>
                                <i className="fa fa-sign-out"></i> Logout
                                </span> */}
                            </div>
                        :
                            <button className="sign-in-button" onClick={()=>{setMobileMenu(false);history.push('/account/signin')}}>
                                Sign In
                            </button>}
                        </div> 
                    </div>
                    <button className="mobile-close" onClick={() => setMobileMenu(false)}>
                        <img src={closeIcon} alt="close" />
                    </button>
                </div>
            }
        </React.Fragment>
    );
};

export default HeaderComponent;
