import React, { useEffect, useState, Fragment } from "react";

import mainLogo from "../../Assets/img/logo.png";
import closeIcon from '../../Assets/img/close.svg';
//import userIcon from "../../Assets/img/Mask.svg";
// import navBarIcon from "../../Assets/img/menu.svg";
import { Link ,useHistory} from "react-router-dom";
//import { LinkContainer } from 'react-router-bootstrap';
import localization from '../Localization/LocalizationComponent';
import { useDispatch ,useSelector } from 'react-redux';
import {setCurrentLanguage} from '../../Store/languageSlice';
import CountryListComponent from '../Localization/countryListComponent';
import 'semantic-ui-css/semantic.min.css';
import UserBlockContainer from '../UserModule/UserBlockContainer';
import {Modal} from 'react-bootstrap';
import { setCurrentEvent } from '../../Store/Events/eventSlice';
import { setCurrentUser } from '../../Store/userSlice';
import { selectLoggedIn, setLoggedIn } from '../../Store/loggedInSlice';

import 'semantic-ui-css/semantic.min.css'
import {
  Nav,
  Navbar
   //NavDropdown,
   //DropdownItem
} from 'react-bootstrap';

import { RENDER_URL } from "../../Utils/Urls";
import { USER_TYPES } from "../../Utils/Constants";

import {LogOut} from "../../Utils/CognitoHandler";
//import { useHistory } from 'react-router-dom';


import { Auth } from 'aws-amplify';
import {COGNITO_CONFIG}  from "../../Utils/Constants";

Auth.configure(COGNITO_CONFIG);

const HeaderComponent = (props) => {
  const history = useHistory();
  const [navbarShrink, setNavbarShrink] = useState("");
  const loggedIn = useSelector(selectLoggedIn);
 // const [isLoggedIn, setIsLoggedIn] = useState(loggedIn); //commented to remove warning
  const [show, setShow] = useState(false);
  const shortHeader = props.shortHeader || "";
  const dispatch = useDispatch();
  const change = (event,data) => {
    localization.setLanguage(data.value);
    dispatch(setCurrentLanguage(data.value));
  }

  const localIsLoggedIn = localStorage.getItem("isLoggedIn");
  const userType = Number(localStorage.getItem("userType"));
  const [showMobileMenu, setMobileMenu] = useState(false);
  const FRESHTRAK_PARTNERS_URL = process.env.REACT_APP_FRESHTRAK_PARTNERS_URL;
  useEffect(() => {
    //const localStorageLoggedIn = localStorage.getItem('isLoggedIn');
    window.onscroll = () => {
      if (window.pageYOffset > 100) {
        setNavbarShrink("navbar-shrink");
      } else {
        setNavbarShrink("");
      }
    };
    return () => {
      setNavbarShrink("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn,dispatch,userType]);

   const clearStorage= () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('tokenExpiresAt');
    localStorage.removeItem('search_zip');
    localStorage.removeItem('userType');
    localStorage.removeItem('selectedEventId');
    localStorage.removeItem('authToken');
  }
 
  
  const logOut = async() => { 
   // setIsLoggedIn(false)
    dispatch(setLoggedIn(false));
    localStorage.setItem('isLoggedIn', false);
    localStorage.removeItem('isAdded');
     if(userType === 0){ 
     await LogOut().then(async res => {
         if(res && res.status){
           dispatch(setCurrentEvent({}));
           dispatch(setCurrentUser({}));
           clearStorage()
         }
         history.push(`${RENDER_URL.ROOT_URL}`);
       })
       .catch(err=>{
         console.log("err in logOut",err)
       })


     }
     else{
       localStorage.setItem('isLoggedIn',false);
       clearStorage()
       dispatch(setCurrentEvent({}));
       dispatch(setCurrentUser({}));
       dispatch(setLoggedIn(false));
       history.push(`${RENDER_URL.ROOT_URL}`);
     }  
     dispatch(setLoggedIn(false));
    //window.FB.logout()
  }

  const goToProfile=()=>{
    history.push(`${RENDER_URL.PROFILE_URL}`);
  }

  const handleClose = () => setShow(false);
  
  return (
    <Fragment>
      <Nav
        className={`navbar navbar-expand-md navbar-light fixed-top ${navbarShrink} ${shortHeader}`}
        id="mainNav"
      >
        <div className="container">
          <Navbar expand="md" className="w-100">
            <Navbar.Brand className="my-auto mobile-view">
              <span className="my-auto mobile-view">
                <Link to={RENDER_URL.ROOT_URL}>
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
                onClick={() => setMobileMenu(true)}
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
                  <NavDropdown.Item
                    tag={Link}
                    to={RENDER_URL.FRESHTRAK_ABOUT}
                    className="dropdown-item"
                  >
                    About Freshtrak
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="navbar-nav small  main-menu align-items-center">
                <NavDropdown
                  title="For Foodbanks"
                  aria-labelledby="dropdown01"
                >
                  <NavDropdown.Item
                    tag={Link}
                    to={RENDER_URL.FRESHTRAK_WORKING}
                    className="dropdown-item"
                  >
                    Working with Freshtrak
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse> */}

            {/* Out of Scope */}

            {/* {!isLoggedIn && (
              <LinkContainer to={RENDER_URL.SIGN_IN}>
                <Nav.Link href="" className="header-sign-in">
                    SIGN IN
                </Nav.Link>
              </LinkContainer>
            )}*/}
            {/*isLoggedIn && (
              <LinkContainer to={RENDER_URL.ROOT_URL}>
                <button
                type="submit"
                className="btn btn-link header-sign-in"
                onClick={logOut}
                >
                  LOG OUT
                </button>
              </LinkContainer>
            )*/}
            {/*!loggedIn && (
            <div className="mr-3 font-weight-bold pointer text-white" 
            onClick={() => setShow(true)}>
                Sign In
             </div>
             )}

            {loggedIn && (
               <LinkContainer to={RENDER_URL.ROOT_URL}>
               <a
               //type="submit"
               //className="btn btn-link header-sign-in"
               className="header-sign-in mr-3 font-weight-bold pointer"
               onClick={()=>logOut()}
               >
                 Sign Out
               </a>
             </LinkContainer>)*/}

             {userType === USER_TYPES.CUSTOMER && localIsLoggedIn === 'true' && (
            <div className="mr-3 font-weight-bold pointer text-white" 
            onClick={() => goToProfile()}>
                Profile
             </div>
             )}


          {localIsLoggedIn !== 'true' && (
            <div className="mr-3 font-weight-bold pointer text-white" 
            onClick={() => setShow(true)}>
                Sign In
             </div>
             )}


          {localIsLoggedIn === 'true' && (
            <div className="mr-3 font-weight-bold pointer text-white" 
            onClick={()=>logOut()}>
                Sign Out
             </div>
             )}
            {/* <div>
              <label>Select Language ?</label>
              <select onChange={change} value={language.language}>
                <option value= "en"> English </option>
                <option value= "spa"> Spanish </option>
                <option value= "som"> Somali </option>
                <option value= "rus"> Russian </option>
                <option value= "tur"> Turkish </option>
                <option value= "ara"> Arabic </option>
                <option value= "zho"> Chinese </option>
                <option value= "hin"> Hindi </option>
                <option value= "nep"> Nepali </option>
              </select>
            </div> */}
            <CountryListComponent change={change}/>
          </Navbar>
        </div>
      </Nav>
      {/* Menu popup div */}
      {showMobileMenu && (
        <div id="menuSlider" className="mobile-menu fadeIn">
          <div className="d-flex h-100 justify-content-end flex-column">
            <div className="mobile-menu-items">
              <div className="menu-item-title">FIND RESOURCES</div>
              <ul className="mt-2">
                <li>
                  <Link to={RENDER_URL.FRESHTRAK_ABOUT}>
                    About FreshTrak
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mobile-menu-items mt-4 mb-4">
              <div className="menu-item-title">For Foodbanks & Agencies</div>
              <ul className="mt-2">
                <li>
                  <a href={FRESHTRAK_PARTNERS_URL} target="_blank" rel="noopener noreferrer" > FreshTrak: Partner </a>
                </li>
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
            <img alt="close menu" src={closeIcon}/>
          </button>
        </div>
      )}
      <Modal show={show} backdrop="static" onHide={handleClose} className="custom-modal light">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <UserBlockContainer handleClose={()=>setShow(false)} />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default HeaderComponent;
