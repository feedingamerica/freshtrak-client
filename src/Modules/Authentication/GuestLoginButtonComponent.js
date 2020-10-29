import React from 'react';
const GuestLoginButtonComponent = ({onGuestLogin}) => {

    return (
      <button type="submit" className="btn primary-button ml-1 flex-grow-1" onClick={onGuestLogin}> Continue AS Guest </button>
    )
};

export default GuestLoginButtonComponent;