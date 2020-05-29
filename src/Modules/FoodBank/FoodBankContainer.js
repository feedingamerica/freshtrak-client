/**
 * Created by Basil on 24/04/20.
 */
import React, {useRef,useState} from 'react';
import { useForm } from 'react-hook-form';
import FoodBankTitleComponent from './FoodBankTitleComponent';
import FoodBankTextComponent from './FoodBankTextComponent';
import FoodBankRegistrationComponent from './FoodBankRegistrationComponent';
import FoodBankContactInfoComponent from './FoodBankContactInfoComponent';
import ButtonComponent from '../General/ButtonComponent';
import FoodBankSuccessComponent from './FoodBankSuccessComponent';
import {confirm} from '../../Utils/Util';

const FoodBankContainer = () => {	
	const { register, handleSubmit, errors} = useForm();
    const [isSucces, setIsSucces] = useState(false);
	const handleSubmitConfirm = (data) => {	
	    let title = "Are you sure you want to proceed?";
	    confirm(title, onSubmit,data);
  	}

  	const onSubmit = (data) => {
  		console.log(data);
  		setIsSucces(true);
  	}
	return (
			<section> { !isSucces &&
            	<div className="container pt-100 pb-100 register-confirmation"> 
	    			<div className="row">
		    			<FoodBankTitleComponent />
						<FoodBankTextComponent />
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
					</div>  
				</div> 
			}
			{ isSucces && 
				<FoodBankSuccessComponent/>
			}
        </section> 
    )
};

export default FoodBankContainer;
