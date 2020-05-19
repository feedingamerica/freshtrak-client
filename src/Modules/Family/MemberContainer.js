import React from "react";
import { confirm, showMessage } from '../../Utils/Util';
import FooterContainer from "../Footer/FooterContainer";
import HeaderComponent from "../Header/HeaderComponent";
import MemberInfoComponent from './MemberInfoComponent';
import MemberCountFormComponent from './MemberCountFormComponent';
import NavigationBtnComponent from '../General/NavigationBtnComponent';
import back from '../../Assets/img/back.svg';

import {useHistory} from 'react-router-dom';


const MemberContainer = () => {
    const memberCountRef = React.useRef();
    const memberInfoRef = React.useRef();
    let memberCountData = {};
    let history = useHistory();
    
    const handleSubmit = async() => {
        let familyData = await memberInfoRef.current.buildFamilyData()
        console.log('container',familyData)
    };


    const goToConfirmationPage = () => {
        history.push('/events/confirm');
    }

    return (
        <>
            <div className="container pt-100 pb-100 ">
                <div className="row">
                    <div className="col-md-12">
                        <NavigationBtnComponent />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="title-wrap">
                            <h1 className="big-title mt-5 mb-5 mobile-mb">
                                Household Info
                            </h1>
                            
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-md-6">
                        <div className="content-wrapper">
                            <div className="caption-text">
                                <p>
                                   Would you mind telling us a little more about your
                                   household and your living situation?
                                  
                                </p>
                                 <p>This helps us
                                   provide you with better service in the future.</p>
                                <p className="medium-title font-weight-bold">
                                    This page is optional.
                               </p>
                            </div>
                            <button className="btn custom-button" onClick={goToConfirmationPage}>Skip This</button>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 register-confirmation">
                        <div className="content-wrapper mt-0">
                        <div className="form-fields">
                            <MemberCountFormComponent ref={memberCountRef} />
                            <MemberInfoComponent  ref={memberInfoRef} />
                            <div className="button-wrap mt-4">
                                <button className="btn custom-button" value="Continue" onClick={handleSubmit}>Continue</button>
                                <small className="text-muted">
                                    <a href="" className="ml-2" onClick={goToConfirmationPage}>Skip this step </a>
                                </small>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};

export default MemberContainer;
