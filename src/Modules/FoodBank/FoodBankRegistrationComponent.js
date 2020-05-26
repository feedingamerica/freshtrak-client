/*
 * Created by Basil on 24/04/20.
 */
import React, { forwardRef } from 'react';

const FoodBankRegistrationComponent = React.forwardRef(({ register, errors }, ref) => {
	return (
		<div className="form-fields">
			<div className="form-title">
				Organization Information
			</div>
			<div className="form-group" data-testid="org-name">
				<label>Organization Name</label>
				<input type="text" 
					name="org_name" 
					className="form-control" 
					ref={register({ required: true })}
				/>
				{errors.org_name && (<span className="validationError">This field is required</span> )}
			</div>
			<div className="d-flex">
				<div className="form-group" data-testid="address">
					<label>Address</label>
					<input type="text" 
						name ="address" 
						className="form-control"  
						ref={register({ required: true })}
					/>
					{errors.address && (<span className="validationError">This field is required</span>
                 	)}
				</div>
				<div className="form-group ml-2"  data-testid="suite-blg">
					<label>Suite/Blg</label>
					<input type="text" 
						name="suiteblg" className="form-control" 
						ref={register}
					/>
				</div>
			</div>
			<div className="form-group" data-testid="zip-code">
				<label>Zipcode</label>
				<input type="text" name="zipcode" className="form-control" 
				ref={register({ required:true, pattern: /^[0-9]{5}$/  })}/>
				{errors.zipcode && errors.zipcode.type ==='required' && (<span className="validationError">This field is required</span>
                )}
                {errors.zipcode && errors.zipcode.type ==='pattern' && (<span className="validationError">The Zipcode is not valid</span>
                )}
			</div>
		</div>
    )
});

export default FoodBankRegistrationComponent;
