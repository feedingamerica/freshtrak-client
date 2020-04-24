/**
 * Created by Basil on 24/04/20.
 */
import React from 'react';
import { useHistory } from 'react-router-dom';
import FoodBankRegistrationComponent from './FoodBankRegistrationComponent';
import FoodBankContactInfoComponent from './FoodBankContactInfoComponent';
import ButtonComponent from '../General/ButtonComponent';
const FoodBankRegistrationContainer = () => {
	let history = useHistory();
	const handleClick = (e) =>{
    	history.push('/foodbank/success');
	}  
	return (
		<div className="col-lg-4 col-md-6">
			<form>
				<div className="content-wrapper">
					<FoodBankRegistrationComponent />
					<FoodBankContactInfoComponent />
					<div className="button-wrap mt-4">
						<ButtonComponent type ='button' name="savefoodbank" dataid= '' id="save-food-bank" value="Continue" className = 'btn custom-button' onClickfunction={handleClick} />
                   	</div>
				</div>
			</form>
		</div>
    )
};

export default FoodBankRegistrationContainer;
