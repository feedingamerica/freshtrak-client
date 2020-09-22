import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginComponent = ({onFbLogin} ) => {
  const responseFacebook = async (response) => {
    console.log(response);
    onFbLogin(response);
  }

  return (
    <div style={{width: '100%'}}>
      <FacebookLogin
        appId="876144606126554"
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
