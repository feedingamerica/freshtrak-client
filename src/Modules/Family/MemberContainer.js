import React from "react";

import { confirm, showMessage } from '../../Utils/Util';
import FooterContainer from "../Footer/FooterContainer";
import HeaderComponent from "../Header/HeaderComponent";
import '../../Assets/scss/main.scss';
import MemberInfoComponent from './MemberInfoComponent';
import MemberCountFormComponent from './MemberCountFormComponent';

const MemberContainer = () => {
    let familyData = ''

    const handleSubmit = () => {
        let MemberDetails = {};
        if (MemberDetails) {
        } else {
            showMessage('error', 'Something went wrong');
        }
    };

    const buildFamilyData = (childFamilyData) => {
        let dataKey = Object.keys(childFamilyData)[0];
    };

    return (
        <div>
            <HeaderComponent shortHeader={'navbar-green'} />
            <div className="container pt-100 pb-100 ">
                <div className="row">
                    <div className="col-md-12">
                        <div className="back-button">
                            <span className="back-arrow">
                                <img src="img/back.svg" />
                            </span>
                            <span className="font-weight-bold text-uppercase ml-2">Back</span>
                        </div>
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
                                    <p>This helps us
                                    provide you with better service in the future.</p>
                                </p>
                                <p className="medium-title font-weight-bold">
                                    This page is optional.
                                </p>
                            </div>
                            <button className="btn custom-button">Skip This</button>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 register-confirmation">
                        <form>
                        <div className="content-wrapper mt-0">
                        <div className="form-fields">
                            <MemberCountFormComponent onSelectedChild={buildFamilyData} />
                            <MemberInfoComponent onSelectedChild={buildFamilyData} />
                            <div className="button-wrap mt-4">
                                <button className="btn custom-button">Continue</button>
                                <small className="text-muted">
                                    <a href="" className="ml-2">Skip this step </a>
                                </small>
                            </div>
                        </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            <FooterContainer />

        </div>
    )
};

export default MemberContainer;
