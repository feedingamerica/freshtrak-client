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
    const [childFamilyData, setChildFamilyData] = React.useState({
        first_name:'',
        last_name:'',
        middle_name:'',
        Suffix:'Jr',
        dob:new Date(),
        hoh:'Yes',
        phone_number:'',
        email:'',
        communication_preference:'Email'

    });

      const buildNameForm = (event)=>{
    setChildFamilyData({...childFamilyData,[event.target.name] : event.target.value});
    }
    const [phoneDisable, setPhoneDisable] = React.useState(false);

    const { errors, handleErrors } =
        useForm(props, {
            'first_name' : ['required'],
            'last_name' : ['required'],
            'middle_name' : ['required'],
            'dob' : ['required'],
            'email' : ['required','is_address'],
            'phone_number' : ['required','is_phone']
        }, ()=>{});

    React.useImperativeHandle(ref, () => ({
        getCurrentData(){
            return childFamilyData
        },
        triggerErrors(){
            
            return handleErrors(childFamilyData);
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
                {errors.first_name && (
                    <span className="validationError" >{errors.first_name}</span>
                )}
            </div>

            <div className="form-group" data-testid="middle-name">
                <label>Middle Name</label>
                <input type="text" className="form-control" onChange={buildNameForm} name="middle_name" id="middle_name"  onBlur={handleErrors}   />
                {errors.middle_name && (
                    <span className="validationError" >{errors.middle_name}</span>
                )}
            </div>

            <div className="form-group" data-testid="last-name">
                <label>Last Name</label>
                <input type="text" className="form-control" onChange={buildNameForm} name="last_name" id="last_name"
                       onBlur={handleErrors}   />
                {errors.last_name && (
                    <span className="validationError" >{errors.last_name}</span>
                )}
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
                {errors.dob && (
                    <span className="validationError">{errors.dob}</span>
                )}
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

                <div className="form-group" data-testid="phno">
                    <label>Phone Number</label>

                    <input type="text" className="form-control" onChange={buildNameForm} data-testid="phno-not-disabled" name="phone_number" id="phone_number"
                           onBlur={handleErrors} />
                    {errors.phone_number && (
                        <span className="validationError" >{errors.phone_number}</span>
                    )}
                </div>
            )}
       

            <div className="form-group" data-testid="phno-chk">
                <label className="custom-checkbox">
                    <input type="checkbox" className="checkbox"  name="phone_number_checkbox"  id ="phone_number_checkbox"  onChange={phoneDisableFunction}/>
                    <span>No Phone Available</span>
                </label>
            </div>
            <div className="form-group" data-testid = "email">
                <label>Email Address</label>
                <input type="text" className="form-control" onChange={buildNameForm} name="email" id="email" onBlur={handleErrors} />
                {errors.email && (
                    <span className="validationError">{errors.email}</span>
                )}
                <small className="text-muted">
                    No Email? <a href="">Get one free from Google.</a>
                </small>
                
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


