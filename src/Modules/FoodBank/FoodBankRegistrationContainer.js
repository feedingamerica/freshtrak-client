/**
 * Created by Basil on 24/04/20.
 */
import React, {useRef} from 'react';
import { useForm } from 'react-hook-form';
import FoodBankRegistrationComponent from './FoodBankRegistrationComponent';
import FoodBankContactInfoComponent from './FoodBankContactInfoComponent';
import ButtonComponent from '../General/ButtonComponent';
import {confirm} from '../../Utils/Util';

const FoodBankRegistrationContainer = () => {	
	const { register, handleSubmit, errors} = useForm();

	const handleSubmitConfirm = (data) => {	
	    let title = "Are you sure you want to proceed?";
	    confirm(title, onSubmit,data);
  	}

  	const onSubmit = (data) => {
  		console.log(data);
  	}
	return (
		<div className="col-lg-4 col-md-6">
			<form onSubmit={handleSubmit(handleSubmitConfirm)}>
				<div className="content-wrapper" data-testid="registr-data">
					<FoodBankRegistrationComponent register={register} errors={errors}
                    />
					<FoodBankContactInfoComponent register={register} errors={errors}
					/>
					<div className="button-wrap mt-4">
						<ButtonComponent type ='submit' name="savefoodbank" dataid= '' id="save-food-bank" value="Continue" className = 'btn custom-button' onClickfunction={()=>{}} />
                   	</div>
				</div>
			</form>
		</div>
    )
};

export default FoodBankRegistrationContainer;
