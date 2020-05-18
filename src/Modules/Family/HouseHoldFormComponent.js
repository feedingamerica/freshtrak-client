import React from 'react';
import useForm from '../../Utils/UseForm';

const HouseHoldFormComponent= React.forwardRef((props, ref)=> {

    const [streetAddress, setStreetAddress] = React.useState('');
    const [aptNo, setAptNo] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [housingType, setHousingType] = React.useState('Apartment');
    const [childFamilyData, setChildFamilyData] = React.useState({
        street_address:'',
        apt_no:'',
        zip_code:'',
        housing_type:'Apartment'
    });

      const buildAddressForm = (event)=>{
    setChildFamilyData({...childFamilyData,[event.target.name] : event.target.value});
    }


    const { errors, handleErrors } =
        useForm(props, {
            'street_address' : ['required', 'min:1'],
            'apt_no' : ['required'],
            'zip_code' : ['required','number']
        }, ()=>{});

    React.useImperativeHandle(ref, () => ({

        getCurrentData(){
            return childFamilyData
        },
        triggerErrors(){
            return handleErrors(childFamilyData);
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
                    <option value="Home or townhouse">Home or townhouse</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Mobile home or house trailer" >Mobile home or house trailer</option>'
                    <option value="Military housing" >Military housing</option>
                    <option value="Student housing" >Student housing</option>
                    <option value="Temporary" >Temporary</option>
                    <option value="Prefer not to answer" >Prefer not to answer</option>'
                </select>
            </div>

            <div className="form-group" data-testid="street-address">
                <label>Street Address</label>
                <input type="text" className="form-control" onChange={buildAddressForm} name="street_address" id="street_address"
                       onBlur={handleErrors} />
                {errors.street_address && (
                    <span className="validationError">{errors.street_address}</span>
                )}
            </div>

            <div className="d-flex">
                <div className="form-group" data-testid="apt-no" >
                    <label>Unit or Apt.</label>
                    <input type="text" className="form-control" onChange={buildAddressForm} name="apt_no" id="apt_no"  onBlur={handleErrors}  />
                    {errors.apt_no && (
                        <span className="validationError">{errors.apt_no}</span>
                    )}
                </div>
                <div className="form-group ml-2"  data-testid="zip-code">
                    <label>ZIP Code</label>
                    <input type="text" className="form-control"   name="zip_code" id="zip_code"  onChange={buildAddressForm}  onBlur={handleErrors} />
                    {errors.zip_code && (
                        <span className="validationError">{errors.zip_code}</span>
                    )}
                </div>
            </div>
        </div>
    )
});

export default HouseHoldFormComponent;
