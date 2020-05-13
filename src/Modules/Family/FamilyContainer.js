import React from "react";
import PrimaryInfoFormComponent from './PrimaryInfoFormComponent';
import HouseHoldFormComponent from './HouseHoldFormComponent';
import MemberCountFormComponent from './MemberCountFormComponent';
import PasswordRegistrationFormComponent from './PasswordRegistrationFormComponent';
import AdditionalPickUpFormComponent from './AdditionalPickUpFormComponent';
import RegistrationTextComponent from './RegistrationTextComponent';
import {confirm, showMessage} from '../../Utils/Util';
import EventDescriptionFormComponent from "../Events/EventDescriptionFormComponent";
import '../../Assets/scss/main.scss';
import ButtonComponent from '../General/ButtonComponent';
import back from '../../Assets/img/back.svg';
import {useHistory} from 'react-router-dom';

const FamilyContainer = () => {
    let familyData = [];
    let formError = {};
    const primaryFormRef = React.useRef();
    const addressFormRef = React.useRef();
    const passwordFormRef = React.useRef();
    const memberCountFormRef = React.useRef();
    let history = useHistory();
    const [passwordFlag, setPasswordFlag] = React.useState(false);


    const buildFamilyData = (childFamilyData) => {
        let dataKey = Object.keys(childFamilyData)[0];
        familyData[dataKey] = childFamilyData;
    };
    const formErrors = (errors) => {
        formError = errors;
    };
    const handleFormValidation = async (e) => {
        e.preventDefault();
        let componentErrors = [];
        componentErrors.push(
            await addressFormRef.current.triggerErrors(),
            await primaryFormRef.current.triggerErrors(),
            await  passwordFormRef.current.triggerErrors()
            );
            if( componentErrors.includes(true) || Object.keys(formError).length !== 0 || passwordFlag===false ){
                return false;
            }handleSubmitConfirm();
          
  
    };

    const handleSubmitConfirm = () => {
        let title = "Are you sure you want to proceed?";
        confirm(title, handleSubmit);
    };
    const handleSubmit = (e) => {
        let familyDetails = {
            familyMemberData:familyData.primaryData ? familyData.primaryData.primaryData:'',
            HouseHoldData:familyData.addressData ? familyData.addressData.addressData:'',
            passwordData:familyData.passwordData ? familyData.passwordData.passwordData:'',
            memberCountData:familyData ? familyData:'',
            pickupData:familyData.pickupData ? familyData.pickupData.pickupData:''
        };
        // Deleted a condition check as it seemed unnecessary and has unreachable code
        history.push('/');
    };

    const getPasswordStatus = (passwordData) => {
        setPasswordFlag(passwordData.passwordStatus)
    };


    return (
        <div>
            <div className="main-wrapper">
                <section>
                    <div className="container pt-100 pb-100 register-confirmation">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="back-button">
                            <span className="back-arrow">
                                <img src={back} />
                            </span>
                                    <span className="font-weight-bold text-uppercase ml-2">Back</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="title-wrap">
                                    <h1 className="big-title mt-5 mb-5 mobile-mb">
                                        Register Now. Save time Later.
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8 col-md-6">
                                <EventDescriptionFormComponent/>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <RegistrationTextComponent/>
                                <form onSubmit={handleFormValidation}>
                                    <div className="content-wrapper pt-100">
                                        <div className="form-fields">
                                            <HouseHoldFormComponent   ref={addressFormRef}
                                                                      onSelectedChild = {buildFamilyData}
                                                                      onFormErrors = {formErrors} />
                                            <MemberCountFormComponent
                                                ref={memberCountFormRef}
                                                onSelectedChild = {buildFamilyData}
                                                onFormErrors = {formErrors} />
                                        </div>
                                        <div className="form-fields pt-50">
                                            <PrimaryInfoFormComponent ref={primaryFormRef}
                                                                      onSelectedChild = {buildFamilyData}
                                                                      onFormErrors = {formErrors} />
                                            <PasswordRegistrationFormComponent ref={passwordFormRef}
                                                                               onSelectedChild = {buildFamilyData}
                                                                               onFormErrors = {formErrors}  getPasswordStatus={getPasswordStatus}/>
                                            <AdditionalPickUpFormComponent
                                                onSelectedChild = {buildFamilyData}
                                                onFormErrors = {formErrors} />
                                            <div className="button-wrap mt-4">
                                                <ButtonComponent type ='submit' data-testid="savefamily" name="savefamily" dataid= 'savefamily' id="save-family" value="Continue" className = 'btn custom-button' onClickfunction={handleFormValidation} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
};
export default FamilyContainer;