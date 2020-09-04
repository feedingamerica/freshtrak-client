import React from 'react';
import Modal from 'react-bootstrap/Modal';

const LoginModalComponent = ({show, onLogin}) => {
  return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>
            Guest Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
        <button type="submit" className="btn primary-button ml-1 flex-grow-1" onClick={onLogin}> Continue AS Guest </button>
        </Modal.Footer>
      </Modal>
  );
};

export default LoginModalComponent;