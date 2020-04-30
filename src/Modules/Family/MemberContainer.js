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
        familyData = childFamilyData;
    };

    return (
        <div>
            <HeaderComponent shortHeader={'navbar-green'} />
            <div className="container pt-100 pb-100 ">
                <div class="row">
                    <div class="col-md-12">
                        <div class="back-button">
                            <span class="back-arrow">
                                <img src="img/back.svg" />
                            </span>
                            <span class="font-weight-bold text-uppercase ml-2">Back</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="title-wrap">
                            <h1 class="big-title mt-5 mb-5 mobile-mb">
                                Household Info
                            </h1>
                            
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8 col-md-6">
                        <div class="content-wrapper">
                            <div class="caption-text">
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
                    <div class="col-lg-4 col-md-6 register-confirmation">
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
