/*
 * Created by Basil on 24/04/20.
 */
import React, {useState} from 'react';
import useForm from '../../Utils/UseForm';
const FoodBankRegistrationComponent = React.forwardRef((props, ref) => {
	const [organazationData,setOrganizationData] = useState({})
	const [organizationName, setOrganizationName] = useState('');
    const [address, setAddress] = useState('');
    const [suiteBlg, setSuiteBlg] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [isChanged, setIsChanged] = useState('');
    let data;
	const buildOrganizationForm = (event) => {		
		event.preventDefault();		
		let name = event.target.name;
		setIsChanged(name);
		switch (name) {
			case 'org_name'	: 	setOrganizationName(event.target.value);
								break;
			case 'address'	: 	setAddress(event.target.value);
								break;
			case 'suiteblg'	: 	setSuiteBlg(event.target.value);
								break;    
			case 'zipcode'	: 	setZipCode(event.target.value);
								break;
			default 		:	break;
		}
    };
    const handleChange = () => {
        data = {
            organizationInfo: {
                org_name: organizationName,
                address: address,
                suiteblg: suiteBlg,
                zipcode: zipCode,
            }
        };  
        setOrganizationData(data);
    };	

    React.useEffect(() => {
        handleChange();
    }, [isChanged]);

    const dataToParent = () => {
        props.onSelectedChild(organazationData);
    };

    const { errors, handleErrors } =
        useForm(props, {
            'org_name' : ['required'],
            'address' : ['required'],
            'zipcode' : ['required','numeric']
        }, dataToParent);

    React.useImperativeHandle(ref, () => ({
        triggerErrors(){
            handleChange();
            return handleErrors(organazationData.organizationInfo);
        }

    }));

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
