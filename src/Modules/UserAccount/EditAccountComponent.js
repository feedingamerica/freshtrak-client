import React, { useEffect, useState } from 'react';
import NavigationBtnComponent from '../General/NavigationBtnComponent';
import PrimaryInfoFormComponent from '../Family/PrimaryInfoFormComponent';
import AdditionalPickUpFormComponent from '../Family/AdditionalPickUpFormComponent';
import HouseHoldFormComponent from '../Family/HouseHoldFormComponent';
import ChangePasswordComponent from './ChangePasswordComponent';
import ButtonComponent from '../General/ButtonComponent';
import {useHistory} from 'react-router-dom';
import { confirm } from "../../Utils/Util";
import MemberCountFormComponent from '../Family/MemberCountFormComponent';
const EditAccountComponent = (props) => {

    

    let page =props?.location?.state?.page 
    let title = props?.location?.state?.title 
    let btnText = props?.location?.state?.btntext  
    let history = useHistory();
    const primaryInfoRef = React.useRef();
    const houseHoldRef = React.useRef();
    
//  Currently, 'Change Password' is kept static. 
    const [currentPage] = useState(page);

    let familyData = [];
    let formError = {};

    useEffect(()=>{
        if (props.location?.state === undefined){
            handleNoStateError();
        }
    });
    

    const handleFormValidation = async(e) => {
        e.preventDefault();
        let componentErrors = [];

        switch(currentPage){
            case 'your-info':  componentErrors.push(
                await houseHoldRef.current.triggerErrors(),
                await primaryInfoRef.current.triggerErrors());break;

        //  cases will be defined here for password and membercountinfo component after code review.
            default: break;
            
        }
            if (componentErrors.includes(true) || Object.keys(formError).length !== 0) {
                return false;
              }
              handleSubmitConfirm();
      
     
      };
    
      const handleSubmitConfirm = () => {
        let title = "Are you sure you want to proceed?";
        confirm(title, handleSubmit);
      };
    
      const handleSubmit = () => {
        let familyDetails = {
          familyMemberData: {
            first_name: familyData.nameData
              ? familyData.nameData.nameData.first_name
              : "",
            last_name: familyData.nameData
              ? familyData.nameData.nameData.last_name
              : "",
            middle_name: familyData.nameData
              ? familyData.nameData.nameData.middle_name
              : "",
            hoh: familyData.nameData ? familyData.nameData.nameData.hoh : "",
            dob: familyData.nameData ? familyData.nameData.nameData.dob : "",
            suffix: familyData.nameData ? familyData.nameData.nameData.suffix : "",
            phoneNumber: familyData.nameData
              ? familyData.nameData.nameData.phoneNumber
              : "",
            phoneNumberCheckBOx: familyData.nameData
              ? familyData.nameData.nameData.phoneNumberCheckBOx
              : "",
            email: familyData.nameData ? familyData.nameData.nameData.email : "",
            communicationPreference: familyData.nameData
              ? familyData.nameData.nameData.communicationPreference
              : "",
          },
    
          HouseHoldData: {
            address: familyData.addressData
              ? familyData.addressData.addressData.streetAddress
              : "",
            apt_number: familyData.addressData
              ? familyData.addressData.addressData.aptNo
              : "",
            zipcode: familyData.zipData ? familyData.zipData.zipData.zip : "",
          },
    
          passwordData: {
            password: familyData.passwordData
              ? familyData.passwordData.passwordData.password
              : "",
          },
    
          memberCountData: {
            countSenior: familyData.memberCountData
              ? familyData.memberCountData.memberCountData.countSenior
              : "",
            countMiddle: familyData.memberCountData
              ? familyData.memberCountData.memberCountData.countMiddle
              : "",
            countJunior: familyData.memberCountData
              ? familyData.memberCountData.memberCountData.countMiddle
              : "",
          },
    
          pickuptData: {
            pickupInfo: familyData.pickupData
              ? familyData.pickupData.pickupData.pickupInfo
              : "",
            pickupName: familyData.pickupData
              ? familyData.pickupData.pickupData.pickupName
              : "",
            pickupNumberPlate: familyData.pickupData
              ? familyData.pickupData.pickupData.pickupNumberPlate
              : "",
          },
        };
    
      // No action is specified here as of now.
      };
    
      const buildFamilyData = (childFamilyData) => {
        let dataKey = Object.keys(childFamilyData)[0];
        familyData[dataKey] = childFamilyData;
      };
    
      const formErrors = (errors) => {
        formError = errors;
      };

      



    // go to home page in case of missing state
    const handleNoStateError = ()=> {
        history.push('/');
    }
    const commonHandler = () => {
        switch (page) {
            case 'your-info': return (<React.Fragment><HouseHoldFormComponent ref={houseHoldRef} onSelectedChild={buildFamilyData} onFormErrors={formErrors} /><PrimaryInfoFormComponent ref={primaryInfoRef} onSelectedChild={buildFamilyData} onFormErrors={formErrors} /></React.Fragment>);

            case 'pickup-info':  return (<AdditionalPickUpFormComponent  onSelectedChild={buildFamilyData} onFormErrors={formErrors} />);
            case 'house-info':  return (<MemberCountFormComponent  onSelectedChild={buildFamilyData} onFormErrors={formErrors} />);
            case 'login-info':  return (<ChangePasswordComponent  onSelectedChild={buildFamilyData} onFormErrors={formErrors} />);

            default: return 'Somethings wrong'; 
        }
    }
    return (
        <React.Fragment>
            <section>
                <div className="container pt-100 pb-100 register-confirmation">
                    <div className="row">
                        <div className="col-md-12">
                            <NavigationBtnComponent />
                        </div>
                    </div>
                    <div className ="row">
                        <div className="col-12">
                            <div className="title-wrap">
                                <h1 className="big-title mt-5 mb-5 mobile-mb" data-testid="title">
                                    {title}
                            </h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-6">
                            <p className="d-none d-lg-block d-xl-block">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                            <p className="d-none d-lg-block d-xl-block">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-sm-12 col-12 edit-account" >
                            <form>
                                
                                {commonHandler(page)}
                                
                                <div className="button-wrap mt-4">
                                    <ButtonComponent type='button' name='submit' dataid='' id='submit-btn' className = "btn custom-button" value = {btnText} onClickfunction={handleFormValidation} />
                                </div>

                                {/* Shows except for Pickup info */}
                                {page!=='pickup-info' && 
                                <div className="button-wrap mt-4 text-underline">
                                    <a onClick={()=>history.goBack()}>Cancel Changes</a>
                                </div>}
                        
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};

export default EditAccountComponent;