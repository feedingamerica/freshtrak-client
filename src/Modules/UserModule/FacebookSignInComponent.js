import React, { useState }from 'react';
import { Auth } from 'aws-amplify';
import {COGNITO_CONFIG}  from "../../Utils/Constants";

Auth.configure(COGNITO_CONFIG);

const FacebookSignInComponent = () => { 
	const onFacebookLogin = () => {
		Auth.federatedSignIn({provider: 'Facebook'})
	}
  return (
    <div>
      <button type="submit" className="btn fb-button mt-3 w-100" onClick={onFacebookLogin}>
        Login with Facebook
      </button>
    </div>
  );
};

export default FacebookSignInComponent;