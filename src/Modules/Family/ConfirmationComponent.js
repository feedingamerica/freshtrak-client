import React from "react";
import NavigationBtnComponent from "../General/NavigationBtnComponent";
import ButtonComponent from "../General/ButtonComponent";

import YourInformationComponent from './YourInformationComponent';
import EventDescriptionComponent from '../Events/EventDescriptionFormComponent';
import TimeDateComponent from '../General/TimeDateComponent';
import {useHistory} from 'react-router-dom';

//  Static data is provided as of now.
const ConfirmationComponent = (props) => {
 let history = useHistory();
  return (
    <React.Fragment>
             <section>
            <div className="container pt-100 pb-100 register-confirmation">
                <div className="row d-none-xs">
                    <div className="col-md-12">
                        <NavigationBtnComponent />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="title-wrap">
                            <h1 className="big-title mt-5 mb-5 mobile-mb">
                                You’re Registered!
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-md-6">
                        <div className="content-wrapper">
                            <div className="medium-title font-weight-bold">
                                Kroger Food Pantry EXPRESS
                            </div>
                            <div className="d-flex">
                                <div className="pantry-name flex-grow-1">Prepack Pantry</div>
                                <div className="distance">14 miles</div>
                            </div>
                           <TimeDateComponent />
                        </div>
                        
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="small-title font-weight-bold">Your Information</div>
                        <div className="mt-2 address-details mb-2">
                            <span className="text-uppercase">Head of Household</span>
                            <div>Savannah Neeley</div>
                            <div>5190 Preferred Place</div>
                            <div>Unit 304</div>
                            <div>Hilliard Ohio</div>
                            <div>43026</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-md-6">
                        <div className="content-wrapper event-details">
                            <div className="small-title font-weight-bold mb-2">
                                Event Details
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non erat vestibulum,
                                bibendum risus non, gravida felis. Vestibulum vulputate vel odio hendrerit eleifend.
                                Duis ut neque iaculis, aliquam neque eget, tempor nibh.

                            </p>
                            <p>Foodbank can add details to an event using an open form field. Light styling optins
                                available (bold, italic, line breaks, ordered lists, preset text styles)
                            </p>
                            <p>Photo inclusion TBD on LOE/tech reqs
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <button className="btn custom-button mt-3 w-100" onClick={()=>history.push('/')}>Back to Home</button>
                    </div>
                </div>

            </div>
        </section>
    </React.Fragment>
  );
};
export default ConfirmationComponent;