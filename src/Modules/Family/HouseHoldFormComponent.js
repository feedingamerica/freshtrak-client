import React from 'react';
import useForm from '../../Utils/UseForm';

const HouseHoldFormComponent= React.forwardRef((props, ref)=> {

    const [streetAddress, setStreetAddress] = React.useState('');
    const [aptNo, setAptNo] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [housingType, setHousingType] = React.useState('Apartment');
    const [childFamilyData, setChildFamilyData] = React.useState([]);
    const [isChanged, setIsChanged] = React.useState('');
    let data='';

    const buildAddressForm = (event) => {
        event.preventDefault();
        let name = event.target.name;
        setIsChanged(name)
        switch (name) {
            case 'street_address':
                setStreetAddress(event.target.value);
                break;
            case 'apt_no':
                setAptNo(event.target.value);
                break;
            case 'zip_code':
                setZip(event.target.value);
                break;

            case 'housing_type':
                setHousingType(event.target.value);
                break;
            default:
                break;
        }
    };

    const handleChange = () => {
        data = {
            addressData: {
                streetAddress: streetAddress,
                aptNo: aptNo,
                zipCode: zip,
                housingType: housingType,
            }
        };
        props.onSelectedChild(data);
    };

    React.useEffect(() => {
        handleChange();
    }, [isChanged]);


    const dataToParent = () => {
        props.onSelectedChild(childFamilyData);
    };

    const { errors, handleErrors } =
        useForm(props, {
            'street_address' : ['required', 'min:1'],
            'apt_no' : ['required'],
            'zip_code' : ['required','number'],
        }, dataToParent);

    React.useImperativeHandle(ref, () => ({

        triggerErrors(){
            handleChange();
            return handleErrors(data.addressData);
        }
    }));

    return (
        <div>
            <div className="form-title">
                Household Information
            </div>
            <div className="form-group">
                <label>Housing Type</label>
                <select className="form-control" name="housing_type" id="housing_type"  defaultValue="Apartment" onChange={buildAddressForm} >
                    <option value="Home or townhouse">Home or townhouse</option>'
                    <option value="Apartment">Apartment</option>'
                    <option value="Mobile home or house trailer" >Mobile home or house trailer</option>'
                    <option value="Military housing" >Military housing</option>'
                    <option value="Student housing" >Student housing</option>'
                    <option value="Temporary" >Temporary</option>'
                    <option value="Prefer not to answer" >Prefer not to answer</option>'
                </select>
            </div>

            <div className="form-group" data-testid="street-address">
                <label>Street Address</label>
                <input type="text" className="form-control" onChange={buildAddressForm} name="street_address" id="street_address"
                       onBlur={handleErrors} required/>
                <div> {errors.street_address && (
                    <span className="validationError">{errors.street_address}</span>
                )}
                </div>
            </div>

            <div className="d-flex">
                <div className="form-group" data-testid="apt-no" >
                    <label>Unit or Apt.</label>
                    <input type="text" className="form-control" onChange={buildAddressForm} name="apt_no" id="apt_no"  onBlur={handleErrors}  required/>
                    <div> {errors.apt_no && (
                        <span className="validationError">{errors.apt_no}</span>
                    )}
                </div>

                </div>
                <div className="form-group ml-2"  data-testid="zip-code">
                    <label>ZIP Code</label>
                    <input type="number" className="form-control"   name="zip_code" id="zip_code"  onChange={buildAddressForm}  onBlur={handleErrors} required/>
                    <div> {errors.zip_code && (
                        <span className="validationError">{errors.zip_code}</span>
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
});

export default HouseHoldFormComponent;
