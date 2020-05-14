import React, {Component} from 'react';
import useForm from '../../Utils/UseForm';

const PrimaryInfoFormComponent =  React.forwardRef((props, ref) => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [middleName, setMiddleName] = React.useState('');
    const [suffix, setSuffix] = React.useState('Jr');
    const [dob, setDob] = React.useState('');
    const [hoh, setHoh] = React.useState('Yes');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [email, setEmail] = React.useState('Email');
    const [communicationPreference, setCommunicationPreference] = React.useState('Email');
    const [childFamilyData, setChildFamilyData] = React.useState({});
    const [phoneDisable, setPhoneDisable] = React.useState(false);

    // variable used to store complete object to be returned
    let data = {};

    const buildNameForm = (e) => {
        let { name, value } = e.target;
        let setFunction = '';
        switch (name) {
            case 'first_name':
                setFunction = setFirstName;
                break;
            case 'last_name':
                setFunction = setLastName;
                break;
            case 'middle_name':
                setFunction = setMiddleName;
                break;
            case 'Suffix':
                setFunction = setSuffix;
                break;
            case 'dob':
                setFunction=setDob;
                break;
            case 'hoh':
                setFunction=setHoh;
                break;
            case 'phone_number':
                setFunction=setPhoneNumber;
                break;
            case 'email':
                setFunction=setEmail;
                break;
            case 'communication_preference':
                setFunction=setCommunicationPreference;
                break;
            default:
                break;
        }
        if (setFunction !== '') {
            setFunction(value)
        }
    };

const buildChildData = ()=>{
    data = { primaryData :{
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        suffix: suffix,
        dob : dob,
        hoh : hoh,
        phone_number : phoneNumber,
        email : email,
        communicationPreference : communicationPreference
        }
    }
    setChildFamilyData(data);
}


    const { errors, handleErrors } =
        useForm(props, {
            'first_name' : ['required'],
            'last_name' : ['required'],
            'middle_name' : ['required'],
            'dob' : ['required'],
            'email' : ['required','is_address'],
            'phone_number' : ['required','is_phone']
        }, ()=>buildChildData());

    React.useImperativeHandle(ref, () => ({
        getCurrentData(){
            return childFamilyData
        },
        triggerErrors(){
            
            if(data.length===0){ buildChildData()};
            return handleErrors(childFamilyData['primaryData']);
        }}));

    const phoneDisableFunction=()=>{

        if (phoneDisable===true)
        { setPhoneDisable(false)
        }else {
            setPhoneDisable(true)
        }}


    return (
        <div>
            <div className="form-title">
                Your Information
            </div>
            <div className="form-group" data-testid="first-name">
                <label>First Name</label>
                <input type="text" className="form-control" data-value ={firstName} onChange={buildNameForm} name="first_name" id="first_name"
                       onBlur={handleErrors}  />
                <div> {errors.first_name && (
                    <span className="validationError" >{errors.first_name}</span>
                )}
                </div>
            </div>

            <div className="form-group" data-testid="middle-name">
                <label>Middle Name</label>
                <input type="text" className="form-control" onChange={buildNameForm} name="middle_name" id="middle_name"  onBlur={handleErrors}   />
                <div> {errors.middle_name && (
                    <span className="validationError" >{errors.middle_name}</span>
                )}
                </div>
            </div>

            <div className="form-group" data-testid="last-name">
                <label>Last Name</label>
                <input type="text" className="form-control" onChange={buildNameForm} name="last_name" id="last_name"
                       onBlur={handleErrors}   />
                <div> {errors.last_name && (
                    <span className="validationError" >{errors.last_name}</span>
                )}
                </div>
            </div>

            <div className="form-group" data-testid="suffix">
                <label>Suffix</label>
                <select  id="suffix" name="Suffix" className="form-control"  defaultValue="Jr" onChange={buildNameForm}>
                    <option value="Jr">Jr</option>
                    <option value="Sr">Sr</option>
                </select>
            </div>

            <div className="form-group" data-testid="dob">
                <label>Date of Birth</label>
                <input type="date" className="form-control"  name="dob" id="dob" min="1900-01-02" onChange={buildNameForm}  onBlur={handleErrors}   />
                <div> {errors.dob && (
                    <span className="validationError">{errors.dob}</span>
                )}
                </div>
            </div>

            <div className="form-group" data-testid="hoh">
                <label>Head of Household</label>
                <select id="hoh" name="hoh"  onChange={buildNameForm}  className="form-control">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            {phoneDisable && (<div className="form-group" >
                <label>Phone Number</label>
                <input type="text" className="form-control" data-testid="phno-disabled" onChange={buildNameForm} disabled={true} name="phone_number" id="phone_number"
                       onBlur={handleErrors} />

              
            </div>)}


            {!phoneDisable && (

                <div className="form-group" >
                <label>Phone Number</label>

                <input type="number" className="form-control" onChange={buildNameForm} data-testid="phno-not-disabled" name="phone_number" id="phone_number"
                       onBlur={handleErrors} />
     <div data-testid="phno"> {errors.phone_number && (
                    <span className="validationError" >{errors.phone_number}</span>
                )}
                </div>
            </div>)}
       

            <div className="form-group" data-testid="phno-chk">
                <label className="custom-checkbox">
                    <input type="checkbox" className="checkbox"  name="phone_number_checkbox"  id ="phone_number_checkbox"  onChange={phoneDisableFunction}/>
                    <span>No Phone Available</span>
                </label>
            </div>
            <div className="form-group" data-testid = "email">
                <label>Email Address</label>
                <input type="text" className="form-control" onChange={buildNameForm} name="email" id="email" onBlur={handleErrors} />
                <small className="text-muted">
                    No Email? <a href="">Get one free from Google.</a>
                </small>
                <div> {errors.email && (
                    <span className="validationError">{errors.email}</span>
                )}
                </div>
            </div>

            <div className="form-group" data-testid="com-pref">
                <label >Communication Preference</label>
                <select  id='communication_preference' name='communication_preference' defaultValue="Email" onChange={buildNameForm} className="form-control">
                    <option value="Email" >Email</option>
                    <option value="Phone">Phone</option>
                </select>
            </div>
        </div>
    )
});

export default PrimaryInfoFormComponent;


