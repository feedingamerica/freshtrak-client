/**
 * Created by Basil on 24/04/20.
 */
import React, {useState} from 'react';
import useForm from '../../Utils/UseForm';
const FoodBankContactInfoComponent = React.forwardRef((props, ref) => {
	const [contactInfoData,setContactInfoData] = useState([])
	const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [suffix, setSuffix] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [commPreference, setCommmPreference] = useState('');
    const [isChanged, setIsChanged] = useState('');
    let data;
    const buildContactInfoForm = (event) => {		
		event.preventDefault();
		setIsChanged(event.target.name);
		let name = event.target.name;
		switch (name) {
			case 'first_name'		: 	setFirstName(event.target.value);
										break;
			case 'last_name'		: 	setLastName(event.target.value);
										break;
			case 'suffix'			: 	setSuffix(event.target.value);
										break;    
			case 'phone_number'		: 	setPhoneNumber(event.target.value);
										break;
			case 'email'			: 	setEmail(event.target.value);
										break;
			case 'comm_prefrencence': 	setCommmPreference(event.target.value);
										break;										
			default 				:	break;
		}
    };
    const handleChange = () => {
        data = {
            contactInfoData: {
                first_name: firstName,
                last_name: lastName,
                suffix: suffix,
                phone_number: phoneNumber,
                email: email,
                comm_prefrencence: commPreference
            }
        };  
        setContactInfoData(data.contactInfoData);
    };
    React.useEffect(() => {
        handleChange();
    }, [isChanged]);

    const dataToParent = () => {
        props.onSelectedChild(contactInfoData);
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
            return handleErrors(contactInfoData);
        }

    }));
    
	return (
		<div className="form-fields pt-50">
			<div className="form-title">
				Contact Information
			</div>
			<div className="form-group">
				<label>First Name</label>
				<input type="text" name="first_name" className="form-control" onChange={buildContactInfoForm} onBlur={handleErrors} />
				{errors.first_name && (
                    <span className="validationError">{errors.first_name}</span>
                )}
			</div>			
			<div className="form-group">
				<label>Last Name</label>
				<input type="text" name="last_name" className="form-control"  onChange={buildContactInfoForm} onBlur={handleErrors} />
				{errors.last_name && (
                    <span className="validationError">{errors.last_name}</span>
                )}
			</div>
			<div className="form-group">
				<label>Suffix</label>
				<select name="suffix" name="suffix" id="" className="form-control" >
					<option>-</option>
				</select>
			</div>
			<div className="form-group">
				<label>Phone Number</label>
				<input type="text" name="phone_number" className="form-control"  onChange={buildContactInfoForm} onBlur={handleErrors} />
				{errors.phone_number && (
                    <span className="validationError">{errors.phone_number}</span>
                )}
			</div>
			<div className="form-group">
				<label>Email Address</label>
				<input type="text" name="contact_email" className="form-control"  onChange={buildContactInfoForm} onBlur={handleErrors} />
				{errors.contact_email && (
                    <span className="validationError">{errors.contact_email}</span>
                )}
				<small className="text-muted">
				No Email? <a href="">Get one free from Google.</a>
				</small>
			</div>
			<div className="form-group">
				<label>Communication Preference</label>
				<select name="comm_preference" id="" className="form-control">
					<option>-</option>
				</select>
			</div>
		</div>
	)
});

export default FoodBankContactInfoComponent;
