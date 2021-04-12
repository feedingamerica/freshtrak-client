/**
 * Created by Basil on 6/1/20.
 */
import React from 'react';
import FooterComponent from './FooterComponent';
import { useLocation } from 'react-router-dom';
import { RENDER_URL } from '../../Utils/Urls';
import '../../Assets/scss/main.scss';
const FooterContainer = (props) => {
    let location = useLocation();
    
    return (
        location.pathname === RENDER_URL.USER_LOGIN ? <></> :  
        <footer className="footer-bg footer">
            <FooterComponent {...props}/>
        </footer>
    )

};

export default FooterContainer;
