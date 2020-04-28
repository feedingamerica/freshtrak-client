/**
 * Created by Basil on 24/04/20.
 */
import React, {useRef} from 'react';
import { useHistory } from 'react-router-dom';
import FoodBankRegistrationComponent from './FoodBankRegistrationComponent';
import FoodBankContactInfoComponent from './FoodBankContactInfoComponent';
import ButtonComponent from '../General/ButtonComponent';
import {confirm, showMessage} from '../../Utils/Util';
const FoodBankRegistrationContainer = (props) => {	
	const organizationFormRef = useRef();
	const contactInfoFormRef = useRef();
	let history = useHistory();
	let formError = {};
	let registrationData = {};
	/*const handleClick = (e) =>{
    	history.push('/foodbank/success');
	}*/  
	const buildRegistrationData = (data) => {
		if(Object.keys(data)[0]){
            let dataKey = Object.keys(data)[0];
            registrationData[dataKey] = data[dataKey];
        }
	};
	const formErrors = (errors) => {
        formError = errors;
    };
	const handleFormValidation = (e) => {
		e.preventDefault();
		let componentErrors = [];
		componentErrors.push(organizationFormRef.current.triggerErrors(),
            contactInfoFormRef.current.triggerErrors());
		if( componentErrors.includes(true) || Object.keys(formError).length !== 0){			
			return false;
		}
		handleSubmitConfirm();
	};
	const handleSubmitConfirm = () => {
	    let title = "Are you sure you want to proceed?";
	    confirm(title, handleSubmit);
  	};
	const handleSubmit = () => {
		let foodBank = {
				organizationInfo :registrationData.organizationInfo,
				contactInfo :registrationData.contactInfo 
			}
		/*Once the api part is completed then update the request here
          Now just we redirect to succes page.
		*/
		history.push('/foodbank/success');	

	}
	return (
		<div className="col-lg-4 col-md-6">
			<form onSubmit = {handleFormValidation}>
				<div className="content-wrapper">
					<FoodBankRegistrationComponent 
						onSelectedChild={buildRegistrationData}
						ref={organizationFormRef}
						onFormErrors = {formErrors}
                        />
					<FoodBankContactInfoComponent 
						onSelectedChild={buildRegistrationData}
						ref={contactInfoFormRef}
						onFormErrors = {formErrors}
					/>
					<div className="button-wrap mt-4">
						<ButtonComponent type ='submit' name="savefoodbank" dataid= '' id="save-food-bank" value="Continue" className = 'btn custom-button' onClickfunction={handleFormValidation} />
                   	</div>
				</div>
			</form>
		</div>
    )
};

export default FoodBankRegistrationContainer;
