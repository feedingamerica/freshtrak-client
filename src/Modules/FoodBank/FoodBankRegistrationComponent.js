/*
 * Created by Basil on 24/04/20.
 */
import React, {useState} from 'react';
import useForm from '../../Utils/UseForm';
const FoodBankRegistrationComponent = React.forwardRef((props, ref) => {
	const [organazationData,setOrganizationData] = useState({
		org_name:'',
        address:'',
        suiteblg:'',
        zipcode:''
	});

	const buildOrganizationForm = (event)=>{
        setOrganizationData({...organazationData,[event.target.name] : event.target.value});
    }    

	const { errors, handleErrors } =
		useForm(props, {
		'org_name' : ['required'],
		'address' : ['required','is_address'],
		'zipcode' : ['required','numeric']
	}, ()=>{});  
	
    React.useImperativeHandle(ref, () => ({
        getCurrentData(){
            return organazationData;
        },
        triggerErrors(){            
            return handleErrors(organazationData);
        }})
    );

	return (
		<div className="form-fields">
			<div className="form-title">
				Organization Information
			</div>
			<div className="form-group" data-testid="org-name">
				<label>Organization Name</label>
				<input type="text" name="org_name" className="form-control" onChange={buildOrganizationForm} onBlur={handleErrors} />
				{errors.org_name && (
                    <span className="validationError">{errors.org_name}</span>
                )}
			</div>
			<div className="d-flex">
				<div className="form-group" data-testid="address">
					<label>Address</label>
					<input type="text" name ="address" className="form-control" onChange={buildOrganizationForm} onBlur={handleErrors} />
					{errors.address && (
                        <span className="validationError">{errors.address}</span>
                 	)}
				</div>
				<div className="form-group ml-2"  data-testid="suite-blg">
					<label>Suite/Blg</label>
					<input type="text" name="suiteblg" className="form-control" onChange={buildOrganizationForm}/>
				</div>
			</div>
			<div className="form-group" data-testid="zip-code">
				<label>Zipcode</label>
				<input type="text" name="zipcode" className="form-control" onChange={buildOrganizationForm} onBlur={handleErrors}/>
				{errors.zipcode && (
                    <span className="validationError">{errors.zipcode}</span>
                )}
			</div>
		</div>
    )
});

export default FoodBankRegistrationComponent;
