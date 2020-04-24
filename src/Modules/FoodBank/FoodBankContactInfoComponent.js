/**
 * Created by Basil on 24/04/20.
 */
import React from 'react';

const FoodBankContactInfoComponent = () => {
	return (
		<div className="form-fields pt-50">
			<div className="form-title">
				Contact Information
			</div>
			<div className="form-group">
				<label>First Name</label>
				<input type="text" className="form-control" />
			</div>			
			<div className="form-group">
				<label>Last Name</label>
				<input type="text" className="form-control" />
			</div>
			<div className="form-group">
				<label>Suffix</label>
				<select name="suffix" id="" className="form-control" >
					<option>-</option>
				</select>
			</div>
			<div className="form-group">
				<label>Phone Number</label>
				<input type="text" className="form-control" />
			</div>
			<div className="form-group">
				<label>Email Address</label>
				<input type="text" className="form-control" />
				<small className="text-muted">
				No Email? <a href="">Get one free from Google.</a>
				</small>
			</div>
			<div className="form-group">
				<label>Communication Preference</label>
				<select name="" id="" className="form-control">
					<option>-</option>
				</select>
			</div>
		</div>
	)
};

export default FoodBankContactInfoComponent;
