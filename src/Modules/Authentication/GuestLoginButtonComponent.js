import React from 'react';
const GuestLoginButtonComponent = ({onLogin}) => {
	 
    return (
            <button type="submit" className="btn primary-button ml-1 flex-grow-1" onClick={onLogin}> Continue AS Guest </button>     
    )
};

export default GuestLoginButtonComponent;