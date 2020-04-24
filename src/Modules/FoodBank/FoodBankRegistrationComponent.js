/**
 * Created by Basil on 24/04/20.
 */
import React from 'react';

const FoodBankRegistrationComponent = () => {	
	return (
		<div className="form-fields">
			<div className="form-title">
				Organization Information
			</div>
			<div className="form-group">
				<label>Organization Name</label>
				<input type="text" className="form-control" />
			</div>
			<div className="d-flex">
				<div className="form-group">
					<label>Address</label>
					<input type="text" className="form-control" />
				</div>
				<div className="form-group ml-2">
					<label>Suite/Blg</label>
					<input type="text" className="form-control" />
				</div>
			</div>
			<div className="form-group">
				<label>Zipcode</label>
				<input type="text" className="form-control" />
			</div>
		</div>
    )
};

export default FoodBankRegistrationComponent;
