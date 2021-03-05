import React, { useState }from 'react';

const GuestSignInComponent = () => {  
  const onGuestLogin = (props)=>{
    console.log('guest login')
  }
  return (
    <div>      
      <button type="submit" className="btn btn-outline-secondary mt-3 w-100" onClick={onGuestLogin}>
        Continue as Guest
      </button> 
    </div>
  );
};

export default GuestSignInComponent;