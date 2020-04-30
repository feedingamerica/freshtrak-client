/**
 * Created by Basil on 24/04/20.
 */
import React from 'react';
import NavigationBtnComponent from '../General/NavigationBtnComponent';
import {useHistory} from 'react-router-dom';
/*import MainHeadingComponent from '../General/MainHeadingComponent';*/
import ButtonComponent from '../General/ButtonComponent';
const FoodBankSuccessComponent = () => {
    let history = useHistory();
    const handleClick = (e) => {
        history.push('/');
    }
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
                        <div>
                            <ButtonComponent type ='button' name="backtohome" dataid= '' id="back-to-home" value="Back to Home" className = 'btn custom-button mt-3' onClickfunction={handleClick} />                       
                        </div>
                    </div>
                </div>             
            </div>          
    )
};

export default FoodBankSuccessComponent;
