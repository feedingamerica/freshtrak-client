import React, { useState, useEffect } from 'react';
import '../../Assets/scss/main.scss';
import { userSlice } from '../../Store/userSlice';

const RegistrationTextComponent = ({event}) => {
  const [isRegRequired, setRegRequired] = useState()
  const OPTIONAL = "optional"
  const REQUIRED = "required" 
  useEffect(() =>{
    if (event && event.acceptWalkin){
      setRegRequired(OPTIONAL)
    }
    else {
      setRegRequired(REQUIRED)
    }
  } )

  return (
    <div>
      <div className="content-wrapper page-info-wrap">
        <p>
          <span className="font-weight-bold">
            Registering in advance is {isRegRequired}.
          </span>{' '}
          By registering now, you can save time time on-site and keep yourself and our volunteers safe.
        </p>
      </div>
    </div>
  );
};

export default RegistrationTextComponent;
