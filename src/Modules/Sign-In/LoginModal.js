import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const LoginModalComponent = ({show, onHide, setGuest}) => {
  const [email, setEmail] = useState("");
  const onSubmit = ()=>{
    setGuest(email);
    onHide();
  };

  return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>
            Guest Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn primary-button ml-1 flex-grow-1" onClick={onSubmit}> Submit </button>
        </Modal.Footer>
      </Modal>
  );
};

export default LoginModalComponent;