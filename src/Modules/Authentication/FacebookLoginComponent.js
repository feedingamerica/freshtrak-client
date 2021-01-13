import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginComponent = ({onFbLogin} ) => {
  const responseFacebook = async (response) => {
    console.log(response);
    if (response.status !== 'unknown') {
      onFbLogin(response);
    }
  }
  const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;

  return (
    <div style={{width: '100%'}}>
      <FacebookLogin
        appId={FACEBOOK_APP_ID}
        size='small'
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        icon="fa-facebook"
        style={{width: '100%'}}
      />
    </div>
  )
};

export default FacebookLoginComponent;
