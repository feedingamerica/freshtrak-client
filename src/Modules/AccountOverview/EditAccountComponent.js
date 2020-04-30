import React, { useEffect } from 'react';
import NavigationBtnComponent from '../General/NavigationBtnComponent';
import PrimaryInfoFormComponent from '../Family/PrimaryInfoFormComponent';
import AdditionalPickUpFormComponent from '../Family/AdditionalPickUpFormComponent';
import HouseHoldFormComponent from '../Family/HouseHoldFormComponent';
import ChangePasswordComponent from './ChangePasswordComponent';
import ButtonComponent from '../General/ButtonComponent';
import {useHistory} from 'react-router-dom';
const EditAccountComponent = (props) => {
    let page =props?.location?.state?.page 
    let title = props?.location?.state?.title 
    let btnText = props?.location?.state?.btntext  
    let history = useHistory();
    const handleSubmit = () => {
        // handle Save Changes/Continue btn handling here
        // Routing back to Account Overview page tempoararily.
        
        history.goBack();

    }

    useEffect(()=>{
        if (props.location.state === undefined){
            handleNoStateError();
        }
    });
    
    // go to home page in case of missing state
    const handleNoStateError = ()=> {
        history.push('/');
    }
    const commonHandler = () => {
        
        switch (page) {
            case 'your-info': return (<React.Fragment><HouseHoldFormComponent onSelectedChild={() => { }} onFormErrors={() => { }} /><PrimaryInfoFormComponent onSelectedChild={() => { }} onFormErrors={() => { }} /></React.Fragment>);

            case 'pickup-info':  return (<AdditionalPickUpFormComponent onSelectedChild={() => { }} onFormErrors={() => { }} />);
            
            // Adding HouseHoldComponent for now, as Members component is not yet merged with the code.
            case 'house-info':  return (<HouseHoldFormComponent onSelectedChild={() => { }} onFormErrors={() => { }} />);
            case 'login-info':  return (<ChangePasswordComponent onSelectedChild={() => { }} onFormErrors={() => { }} />);

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
                        <div className="col-xl-4 col-lg-4 col-sm-12 col-12 edit-account">
                            <form>
                                
                                {commonHandler(page)}
                                
                                <div className="button-wrap mt-4">
                                    <ButtonComponent type='button' name='submit' dataid='' id='submit-btn' className = "btn custom-button" value = {btnText} onClickfunction={handleSubmit} />
                                </div>

                                {/* Shows except for Pickup info */}
                                {page!=='pickup-info' && 
                                <div className="button-wrap mt-4">
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