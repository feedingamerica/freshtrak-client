import React from "react";

import {confirm, showMessage} from '../../Utils/Util';
import FooterContainer from "../Footer/FooterContainer";
import HeaderComponent from "../Header/HeaderComponent";
import '../../Assets/scss/main.scss';
import MemberInfoComponent from './MemberInfoComponent';
import MemberCountFormComponent from './MemberCountFormComponent';

const MemberContainer = () => {
   let familyData=''

    const handleSubmit = () => {
        let MemberDetails = {};
        if(MemberDetails) {
        } else {
            showMessage('error', 'Something went wrong');
        }};

    const buildFamilyData = (childFamilyData) => {
        let dataKey = Object.keys(childFamilyData)[0];
        familyData= childFamilyData;
    };

    return (
        <div>
            <HeaderComponent shortHeader={'navbar-green'} />
            <div className="main-wrapper">
                    <form>
                        <div className="content-wrapper pt-100">
                            <div className="form-fields">
                                <MemberCountFormComponent onSelectedChild = {buildFamilyData} />
                                <MemberInfoComponent  onSelectedChild = {buildFamilyData} />
                                <div className="button-wrap mt-4">
                                    <button className="btn custom-button">Continue</button>
                                    <small className="text-muted">
                                         <a href="">Skip this step </a>
                                    </small>
                        </div>
                        </div>
                        </div>
                    </form>
                </div>
        </div>
    )
};

export default MemberContainer;
