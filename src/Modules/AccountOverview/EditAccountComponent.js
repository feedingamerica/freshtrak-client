import React from 'react';
import NavigationBtnComponent from '../General/NavigationBtnComponent';
import PrimaryInfoFormComponent from '../Family/PrimaryInfoFormComponent';
import AdditionalPickUpFormComponent from '../Family/AdditionalPickUpFormComponent';
import HouseHoldFormComponent from '../Family/HouseHoldFormComponent';
import PasswordRegistrationFormComponent from '../Family/PasswordRegistrationFormComponent';
const EditAccountComponent = (props) => {
    let page = props.location.state.page;
    const commonHandler = () => {

        switch (page) {
            case 'your-info': return (<PrimaryInfoFormComponent onSelectedChild={() => { }} onFormErrors={() => { }} />);

            case 'pickup-info': return (<AdditionalPickUpFormComponent onSelectedChild={() => { }} onFormErrors={() => { }} />);
            case 'house-info': return (<HouseHoldFormComponent onSelectedChild={() => { }} onFormErrors={() => { }} />);
            case 'login-info': return (<PasswordRegistrationFormComponent onSelectedChild={() => { }} onFormErrors={() => { }} />);

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
                                <h1 className="big-title mt-5 mb-5 mobile-mb">
                                    Edit Your Info
                            </h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-6">
                            <p className="d-none d-lg-block d-xl-block">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                            <p className="d-none d-lg-block d-xl-block">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-sm-12 col-12 edit-account">
                            {commonHandler(page)}
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
};

export default EditAccountComponent;