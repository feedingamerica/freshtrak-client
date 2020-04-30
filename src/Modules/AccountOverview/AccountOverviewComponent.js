import React from 'react';
import {useHistory} from 'react-router-dom';
import NavigationBtnComponent from '../General/NavigationBtnComponent';
const AccountOverviewComponent = () => {
    let history = useHistory();

    return (
        <React.Fragment>
            <section>
            <div className="container pt-100 pb-100 register-confirmation">
                <div className="row">
                    <div className="col-md-12">
                      <NavigationBtnComponent  />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="title-wrap">
                            <h1 className="big-title mt-5 mb-5 mobile-mb">
                                Account Overview
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                        <div className="content-wrapper">
                            <div className=" d-flex mb-3 flex-wrap">
                                <div className="flex-grow-1 medium-title font-weight-bold">Your Information</div>
                                <div className="ml-auto"  onClick={()=>{history.push('/account/edit',{page:'your-info',title:'Edit Your Info',btntext:'Save Changes'})}}><span className="cursor text-underline">Edit</span></div>
                            </div>
                            <div className="d-flex flex-column mt-3 mb-3 time-wrapper">
                                <span>Savannah Neeley</span>
                                <span>5190 Preferred Place</span>
                                <span>Unit 304</span>
                                <span>Hilliard Ohio </span>
                                <span>43026</span>
                            </div>
                            <div className="d-flex flex-column mt-3 mb-3 time-wrapper">
                                <span>sneeley@gmail.com</span>
                                <span>(312) 456-6789</span>
                            </div>
                            <div className="d-flex flex-column mt-3 mb-3 time-wrapper">
                                <span>
                                    <span className="font-weight-bold"> Head of Household?</span> Yes</span>
                                <span>
                                    <span className="font-weight-bold">Contact Preference: </span>Email</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                        <div className="content-wrapper">
                            <div className=" d-flex flex-wrap mb-3">
                                <div className="flex-grow-1 medium-title font-weight-bold">Pickup Information</div>
                                <div className="ml-auto"  onClick={()=>{history.push('/account/edit',{page:'pickup-info',title:'Your Pickup Info',btntext:'Continue'})}}><span className="cursor text-underline">Edit</span></div>
                            </div>
                            <div className="d-flex flex-column mt-3 mb-3 time-wrapper">
                                <div className="d-flex">
                                    <span>Recipient:</span>
                                    <span>Zak Orner</span>
                                </div>
                                <div className="d-flex">
                                    <span>License Plate:</span>
                                    <span>EJF 5442</span>
                                </div>                                  
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                        <div className="content-wrapper">
                            <div className=" d-flex flex-wrap mb-3">
                                <div className="flex-grow-1 medium-title font-weight-bold">Household Info</div>
                                <div className="ml-auto"  onClick={()=>{history.push('/account/edit',{page:'house-info',title:'Household Members',btntext:'Save Changes'})}}><span className="cursor text-underline">Edit</span></div>
                            </div>
                            <div className="d-flex flex-column mt-3 mb-3 time-wrapper">
                               <span className="font-weight-bold">First Adult Member</span>
                               <span>Savannah Neeley</span>
                               <span>04/04/1980 </span>
                               <span>Female</span>                                
                            </div>
                            <div className="d-flex flex-column mt-3 mb-3 time-wrapper">
                                <span className="font-weight-bold">Second Adult Member</span>
                                <span>Jeremia Neeley</span>
                                <span>07/09/1976 </span>
                                <span>Male</span>                                
                             </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                        <div className="content-wrapper">
                            <div className=" d-flex flex-wrap mb-3">
                                <div className="flex-grow-1 medium-title font-weight-bold">Login Info</div>
                            </div>
                            <div className="row mt-3 mb-3 time-wrapper">
                               <div className="col-xl-8 col-lg-8 col-sm-8 col-8">
                                <div className="font-weight-bold">Email or Username</div>
                                <div>s*******@gmail.com</div>
                               </div>
                               <div className="col-xl-4 col-lg-4 col-sm-4 col-4 text-right">
                                <span  onClick={()=>{history.push('/account/edit',{page:'login-info',title:'Change Password',btntext:'Save Changes'})}} className="cursor text-underline">Change Password</span>  
                               </div>                              
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </section>
        </React.Fragment>
    )
};

export default AccountOverviewComponent;