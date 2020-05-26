/**
 * Created by Basil on 24/04/20.
 */
import React, { forwardRef } from 'react';
import {Link} from 'react-router-dom';

const FoodBankContactInfoComponent = React.forwardRef(({register,errors}, ref) => {
	return (
		<div className="form-fields pt-50">
			<div className="form-title">
				Contact Information
			</div>
			<div className="form-group" data-testid="first-name">
				<label>First Name</label>
				<input type="text" name="first_name" className="form-control" 
					ref={register({ required: true })}
				/>
				{errors.first_name && (
                    <span className="validationError">This field is required</span>
                )}
			</div>			
			<div className="form-group" data-testid="last-name">
				<label>Last Name</label>
				<input type="text" name="last_name" className="form-control"  
					ref={register({ required: true })}
				/>
				{errors.last_name && (
                    <span className="validationError">This field is required</span>
                )}
			</div>
			<div className="form-group">
				<label>Suffix</label>
				<select name="suffix" id="" className="form-control" 
				ref={register}>
					<option>--Select one--</option>
					<option>Jr</option>
                    <option>Sr</option>
				</select>
			</div>
			<div className="form-group" data-testid='phone-number'>
				<label>Phone Number</label>
				<input type="text" name="phone_number" className="form-control"  
					ref={register({ required: true })}
				/>
				{errors.phone_number && (
                    <span className="validationError">This field is required</span>
                )}
			</div>
			<div className="form-group" data-testid="contact-email">
				<label>Email Address</label>
				<input type="text" name="contact_email" className="form-control"  
					ref={register({ required: true, pattern: /^[a-zA-Z0-9.]+@([a-zA-Z0-9]{2,})+\.[a-zA-Z]{2,4}$/ })}
				/>
				{errors.contact_email && errors.contact_email.type ==='required' && (
                    <span className="validationError">This field is required</span>
                )}
                {errors.contact_email && errors.contact_email.type ==='pattern' && (
                    <span className="validationError">The email address is not valid</span>
                )}
				<div className="mt-2">
					<small className="text-muted">
						No Email? <Link to="#">Get one free from Google.</Link>
					</small>
				</div>
			</div>
			<div className="form-group">
				<label>Communication Preference</label>
				<select name="comm_preference" id="comm_preference" className="form-control" ref={register}>
					<option>--Select one--</option>
					<option>Email</option>
                    <option>Phone</option>
				</select>
			</div>
		</div>
	)
});

export default FoodBankContactInfoComponent;
