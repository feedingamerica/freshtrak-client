import React from 'react';
import Modal from 'react-bootstrap/Modal';
import GuestLoginButtonComponent from './GuestLoginButtonComponent';
import FacebookLoginComponent from './FacebookLoginComponent';

const AuthenticationModalComponent = ({show, onLogin}) => {
  return (
      <Modal show={show} className={'authentication-modal'}>
        <Modal.Header>
          <Modal.Title>
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
        <FacebookLoginComponent onLogin={onLogin}/>
        <GuestLoginButtonComponent onLogin={onLogin}/>
        </Modal.Footer>
      </Modal>
  );
};

export default AuthenticationModalComponent;