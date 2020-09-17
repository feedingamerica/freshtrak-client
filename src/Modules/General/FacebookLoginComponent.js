import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { API_URL } from '../../Utils/Urls';
import TagManager from 'react-gtm-module'

const FacebookLoginComponent = ({onLogin} ) => {

  const responseFacebook = async (response) => {
    console.log(response);
    const { FB_URL_RESP } = API_URL;
    try {
      await axios({
        method: 'post',
        url: FB_URL_RESP,
        data: JSON.stringify(response),
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (e) {
      console.error(e);
    }
    onLogin();
    TagManager.dataLayer({
      dataLayer: {
      event: 'facebook-login'
      }
    })
  }

  return (
    <div style={{width: '100%'}}>
      <FacebookLogin
        appId="2790354964530637"
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
