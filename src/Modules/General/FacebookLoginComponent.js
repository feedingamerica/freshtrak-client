import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { API_URL } from '../../Utils/Urls';

const FacebookLoginComponent = ( ) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // const [accessToken, setAccessToken] = React.useState("");

  const componentClicked = () => console.log('clicked..');

  const responseFacebook = async (response) => {
    console.log(response);
    setIsLoggedIn(true);
    // setAccessToken(response.accessToken);

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
  }

  let fbContent;

  if(isLoggedIn){
    fbContent = null
  } else{
    fbContent = (
      <FacebookLogin
        appId="2790354964530637"
        size="small"
        autoLoad={false}
        onClick={componentClicked}
        callback={responseFacebook}
        icon="fa-facebook"
      />
    );
  }

  return (
    <div>{fbContent}</div>
  )
};

export default FacebookLoginComponent;
