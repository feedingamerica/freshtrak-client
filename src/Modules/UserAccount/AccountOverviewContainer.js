import React from 'react';
import NavigationBtnComponent from '../General/NavigationBtnComponent';
import LoginInfoComponent from './LoginInfoComponent';
import YourInfoComponent from './YourInfoComponent';
import PickUpInfoComponent from './PickUpInfoComponent';
import HouseholdInfoComponent from './HouseholdInfoComponent';

const AccountOverviewContainer = () => {
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
                        <YourInfoComponent />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                        <PickUpInfoComponent />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                        <HouseholdInfoComponent />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                        <LoginInfoComponent />
                    </div>
                </div>
            </div>
        </section>
        </React.Fragment>
    )
};

export default AccountOverviewContainer;