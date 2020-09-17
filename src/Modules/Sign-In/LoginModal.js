import React from 'react';
import Modal from 'react-bootstrap/Modal';
import FacebookLoginComponent from '../General/FacebookLoginComponent';

const LoginModalComponent = ({show, onLogin}) => {
  return (
      <Modal show={show} className={'login-modal'}>
        <Modal.Header>
          <Modal.Title>
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
        <FacebookLoginComponent onLogin={onLogin}/>
        <button type="submit" className="btn primary-button ml-1 flex-grow-1" onClick={onLogin}> Continue AS Guest </button>
        </Modal.Footer>
      </Modal>
  );
};

export default LoginModalComponent;