/**
 * Created by Basil on 24/04/20.
 */
import React, {useState} from 'react';
import useForm from '../../Utils/UseForm';
const FoodBankContactInfoComponent = React.forwardRef((props, ref) => {
	const [contactData,setContactData] = useState({})
	const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [suffix, setSuffix] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [commPreference, setCommmPreference] = useState('');
    const [isChanged, setIsChanged] = useState('');
    let data ={};
    const buildContactInfoForm = (event) => {		
		event.preventDefault();
		let name = event.target.name;
		setIsChanged(name);
		switch (name) {
			case 'first_name'		: 	setFirstName(event.target.value);
										break;
			case 'last_name'		: 	setLastName(event.target.value);
										break;
			case 'suffix'			: 	setSuffix(event.target.value);
										break;    
			case 'phone_number'		: 	setPhoneNumber(event.target.value);
										break;
			case 'contact_email'	: 	setEmail(event.target.value);
										break;
			case 'comm_preference': 	setCommmPreference(event.target.value);
										break;										
			default 				:	break;
		}
    };
    const handleChange = () => {
        data = {
            contactInfo: {
                first_name: firstName,
                last_name: lastName,
                suffix: suffix,
                phone_number: phoneNumber,
                contact_email: email,
                comm_preference: commPreference
            }
        };  
        setContactData(data);
    };
    React.useEffect(() => {
        handleChange();
    }, [isChanged]);

    const dataToParent = () => {
        props.onSelectedChild(contactData);
    };

    const { errors, handleErrors } =
        useForm(props, {
            'first_name' 	: ['required'],
            'last_name' 	: ['required'],
            'phone_number' 	: ['required'],
            'contact_email'	: ['required','email'],
        }, dataToParent);

    React.useImperativeHandle(ref, () => ({
        triggerErrors(){
            handleChange();
            return handleErrors(contactData.contactInfo);
        }

    }));
    
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
				<div class="mt-2">
					<small className="text-muted">
						No Email? <a href="">Get one free from Google.</a>
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
