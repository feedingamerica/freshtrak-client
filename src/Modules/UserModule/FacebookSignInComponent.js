import React, { useState }from 'react';
import { Auth } from 'aws-amplify';
import awsExports from "../../aws-exports";
Auth.configure(awsExports);

const FacebookSignInComponent = () => { 
  return (
    <div>
      <button type="submit" className="btn fb-button mt-3 w-100" onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}>
        Login with Facebook
      </button>
    </div>
  );
};

export default FacebookSignInComponent;