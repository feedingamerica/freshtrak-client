/**
 * Created by Basil on 24/04/20.
 */
import React, {useRef} from 'react';
import { useHistory } from 'react-router-dom';
import FoodBankRegistrationComponent from './FoodBankRegistrationComponent';
import FoodBankContactInfoComponent from './FoodBankContactInfoComponent';
import ButtonComponent from '../General/ButtonComponent';
import {confirm} from '../../Utils/Util';
const FoodBankRegistrationContainer = (props) => {	
	const organizationFormRef = useRef();
	const contactInfoFormRef = useRef();
	let history = useHistory();
	let formError = {};

	const formErrors = (errors) => {
        formError = errors;
    };

	const handleFormValidation = (e) => {
		e.preventDefault();
		let componentErrors = [];
		componentErrors.push(
			organizationFormRef.current.triggerErrors(),
            contactInfoFormRef.current.triggerErrors()
        );
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
				organizationInfo :organizationFormRef.current.getCurrentData() ? organizationFormRef.current.getCurrentData():'',
				contactInfo :contactInfoFormRef.current.getCurrentData()? contactInfoFormRef.current.getCurrentData():''
				
			}
			console.log(foodBank);
		/*Once the api part is completed then update the request here
          Now just we redirect to succes page.
		*/
		history.push('/foodbank/success');	

	}
	return (
		<div className="col-lg-4 col-md-6">
			<form onSubmit = {handleFormValidation}>
				<div className="content-wrapper" data-testid="registr-data">
					<FoodBankRegistrationComponent 					    
						ref={organizationFormRef}
						onFormErrors = {formErrors}
                        />
					<FoodBankContactInfoComponent 
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
