/**
 * Created by Basil on 24/04/20.
 */
import React from 'react';
import FoodBankTextComponent from './FoodBankTextComponent';
import FoodBankRegistrationContainer from './FoodBankRegistrationContainer';

const FoodBankDataContainer = () => {
	return (
		<div className="row">
			<FoodBankTextComponent />
			<FoodBankRegistrationContainer />
        </div>
        
    )
};

export default FoodBankDataContainer;
