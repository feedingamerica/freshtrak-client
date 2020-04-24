/**
 * Created by Basil on 24/04/20.
 */
import React from 'react';
import NavigationBtnComponent from '../General/NavigationBtnComponent';
/*import MainHeadingComponent from '../General/MainHeadingComponent';*/

const FoodBankSuccessComponent = () => {
    return (        
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
                                We’re all in this together.
                            </h1>
                        	{/*<MainHeadingComponent text="We’re all in this together." />*/}
                        </div>
                        <div className="medium-title font-weight-bold mb-3 mt-3">Thank you for registering your organization! </div>
                        <div className="caption-text">
                            <p>A FreshTrak team member will reach out to you shortly to get you started.</p>
                        </div>
                        <div><button className="btn custom-button mt-3">Back to Home</button></div>
                    </div>
                </div>             
            </div>          
    )
};

export default FoodBankSuccessComponent;
