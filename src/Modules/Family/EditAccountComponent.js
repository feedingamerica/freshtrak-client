import React from 'react';
import NavigationBtnComponent from '../General/NavigationBtnComponent';
import PrimaryInfoFormComponent from '../Family/PrimaryInfoFormComponent';
import AdditionalPickUpFormComponent from '../Family/AdditionalPickUpFormComponent';
import HouseHoldFormComponent from '../Family/HouseHoldFormComponent';
import PasswordRegistrationFormComponent from '../Family/PasswordRegistrationFormComponent';
const EditAccountComponent = (props) => {
    let page = props.location.state.page;
    const commonHandler = ()=>{
        
       switch (page){
           case 'your-info': return (<PrimaryInfoFormComponent onSelectedChild={()=>{}} onFormErrors = {()=>{}}/>);

          case 'pickup-info': return (<AdditionalPickUpFormComponent onSelectedChild={()=>{}} onFormErrors = {()=>{}} />);
          case 'house-info': return (<HouseHoldFormComponent onSelectedChild={()=>{}} onFormErrors = {()=>{}} />);
          case 'login-info': return (<PasswordRegistrationFormComponent onSelectedChild={()=>{}} onFormErrors = {()=>{}} />);
  
           default: return  'Somethings wrong';
       }
   }
    return (
        <React.Fragment>
                 <section>
            <div className="container pt-100 pb-100 register-confirmation">
                <div className="row">
                    <div className="col-md-12">
                      <NavigationBtnComponent  />
                    </div>
                </div>
                {commonHandler(page)}
                
                </div>
                </section>
            
        </React.Fragment>
    )
};

export default EditAccountComponent;