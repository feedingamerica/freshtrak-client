import React from 'react';
import Modal from 'react-bootstrap/Modal';
import TagManager from 'react-gtm-module'
import GuestLoginButtonComponent from './GuestLoginButtonComponent';
import FacebookLoginComponent from './FacebookLoginComponent';

const AuthenticationModalComponent = ({show, setshow, onLogin}) => {
  const handleClose = () => setshow(false);
  const onGuestLogin =  () => {
    onLogin();
    TagManager.dataLayer({
      dataLayer: {
      event: "guest-login"
      }
    })
  }
  const onFbLogin =  (response) => {
    localStorage.setItem('isFbLoggedIn', true);
    onLogin(response);
    TagManager.dataLayer({
      dataLayer: {
      event: 'facebook-login'
      }
    })
  }
  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={'w-100 text-center'}>
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <FacebookLoginComponent onFbLogin={onFbLogin}/>
          <GuestLoginButtonComponent onGuestLogin={onGuestLogin}/>
        </Modal.Footer>
      </Modal>
  );
};

export default AuthenticationModalComponent;