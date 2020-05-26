/**
 * Created by Basil on 24/04/20.
 */
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import useForm from '../../Utils/UseForm';
const FoodBankContactInfoComponent = React.forwardRef((props, ref) => {
	const [contactData,setContactData] = useState({
		first_name:'',
        last_name:'',
        suffix:'',
        phone_number:'',
        contact_email:'',
        comm_preference:''
	});

    const buildContactInfoForm = (event)=>{
        setContactData({...contactData,[event.target.name] : event.target.value});
    }   

    const { errors, handleErrors } =
    useForm(props, {
        'first_name' 	: ['required'],
        'last_name' 	: ['required'],
        'phone_number' 	: ['required'],
        'contact_email'	: ['required','email'],
    }, ()=>{});     
	
	React.useImperativeHandle(ref, () => ({
        getCurrentData(){
            return contactData;
        },
        triggerErrors(){            
            return handleErrors(contactData);
        }})
    );
	return (
		<div className="form-fields pt-50">
			<div className="form-title">
				Contact Information
			</div>
			<div className="form-group" data-testid="first-name">
				<label>First Name</label>
				<input type="text" name="first_name" className="form-control" onChange={buildContactInfoForm} onBlur={handleErrors} />
				{errors.first_name && (
                    <span className="validationError">{errors.first_name}</span>
                )}
			</div>			
			<div className="form-group" data-testid="last-name">
				<label>Last Name</label>
				<input type="text" name="last_name" className="form-control"  onChange={buildContactInfoForm} onBlur={handleErrors} />
				{errors.last_name && (
                    <span className="validationError">{errors.last_name}</span>
                )}
			</div>
			<div className="form-group">
				<label>Suffix</label>
				<select name="suffix" id="" className="form-control" onChange={buildContactInfoForm}>
					<option>--Select one--</option>
					<option>Jr</option>
                    <option>Sr</option>
				</select>
			</div>
			<div className="form-group" data-testid='phone-number'>
				<label>Phone Number</label>
				<input type="text" name="phone_number" className="form-control"  onChange={buildContactInfoForm} onBlur={handleErrors} />
				{errors.phone_number && (
                    <span className="validationError">{errors.phone_number}</span>
                )}
			</div>
			<div className="form-group" data-testid="contact-email">
				<label>Email Address</label>
				<input type="text" name="contact_email" className="form-control"  onChange={buildContactInfoForm} onBlur={handleErrors} />
				{errors.contact_email && (
                    <span className="validationError">{errors.contact_email}</span>
                )}
				<div className="mt-2">
					<small className="text-muted">
						No Email? <Link to="">Get one free from Google.</Link>
					</small>
				</div>
			</div>
			<div className="form-group">
				<label>Communication Preference</label>
				<select name="comm_preference" id="" className="form-control" onChange={buildContactInfoForm}>
					<option>--Select one--</option>
					<option>Email</option>
                    <option>Phone</option>
				</select>
			</div>
		</div>
	)
});

export default FoodBankContactInfoComponent;
