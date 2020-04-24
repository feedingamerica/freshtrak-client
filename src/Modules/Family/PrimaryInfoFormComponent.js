import React, {Component} from 'react';
import useForm from '../../Utils/UseForm';

const PrimaryInfoFormComponent =  React.forwardRef((props, ref) => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [middleName, setMiddleName] = React.useState('');
    const [suffix, setSuffix] = React.useState('Jr');
    const [suffixArray, setSuffixArray] = React.useState('');
    const [dob, setDob] = React.useState('');
    const [hoh, setHoh] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [phoneNumberCheckBOx, setPhoneNumberCheckBOx] = React.useState('false');
    const [email, setEmail] = React.useState('Email');
    const [communicationPreference, setCommunicationPreference] = React.useState('Email');
    let first_name,last_name,middle_name,suffix_form_data='';
    let middle_name_form,first_name_form,last_name_form='';
    const [childFamilyData, setChildFamilyData] = React.useState('');
    const [phoneDisable, setPhoneDisable] = React.useState(false);
    let data = '';

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
            case 'phone_number_checkbox':
                setFunction=setPhoneNumberCheckBOx;
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

    React.useEffect(() => {
        handleChange();
    }, [firstName, lastName,middleName, suffix,dob,hoh,phoneNumber,phoneNumberCheckBOx,email,communicationPreference]);

    const handleChange = () => {
        data = { primaryData :{
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName,
                suffix: suffix,
                dob : dob,
                hoh : hoh,
                phoneNumber : phoneNumber,
                phoneNumberCheckBOx : phoneNumberCheckBOx,
                email : email,
                communicationPreference : communicationPreference,
            }
        };
        props.onSelectedChild(data);
    };

    React.useEffect(() => {
        if (first_name_form) {
            setFirstName(first_name_form);
            setMiddleName(middle_name_form);
            setLastName(last_name_form);
            setSuffix(suffix_form_data);
        }
    }, [first_name_form, middle_name_form, last_name_form, suffix]);

    React.useEffect(() => {
        if (first_name_form) {
            setFirstName(first_name);
            setMiddleName(middle_name);
            setLastName(last_name);
            setSuffix(suffix_form_data);
        }
    }, []);

    const dataToParent = () => {
        props.onSelectedChild(childFamilyData);
    };

    const { errors, handleErrors } =
        useForm(props, {
            'first_name' : ['required', 'min:1'],
            'last_name' : ['required', 'min:1'],
            'phone_number' : ['required', 'min:2', 'max:12'],
            'dob' : ['required'],
            'email' : ['required'],
        }, dataToParent);

    React.useImperativeHandle(ref, () => ({

        triggerErrors(){
            handleChange();
            return handleErrors(data.nameData);
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
            <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" onChange={buildNameForm} name="first_name" id="first_name"
                       onBlur={handleErrors} required />
            </div>
            <div className="form-group">
                <label>Middle Name</label>
                <input type="text" className="form-control" onChange={buildNameForm} defaultValue={middle_name_form}
                       name="middle_name" id="middle_name"  required />
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input type="text" className="form-control" onChange={buildNameForm} name="last_name" id="last_name"
                       onBlur={handleErrors} required  />
            </div>

            <div className="form-group">
                <label>Suffix</label>
                <select  id="suffix" name="Suffix" className="form-control"  defaultValue="Jr" onChange={buildNameForm}>
                    <option value="Jr">Jr</option>
                    <option value="Sr">Sr</option>
                </select>
            </div>
            <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" className="form-control"  name="dob" id="dob" min="1900-01-02" onChange={buildNameForm} required />
            </div>
            <div className="form-group">
                <label>Head of Household</label>
                <select id="hoh" name="hoh"  onChange={buildNameForm}  className="form-control">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            {phoneDisable && (<div className="form-group">
                <label>Phone Number</label>
                <input type="number" className="form-control" onChange={buildNameForm} disabled={true} name="phone_number" id="phone_number"
                       onBlur={handleErrors} required />
            </div>)}

            {!phoneDisable && (<div className="form-group">
                <label>Phone Number</label>
                <input type="number" className="form-control" onChange={buildNameForm}  name="phone_number" id="phone_number"
                       onBlur={handleErrors} required />
            </div>)}

            <div className="form-group">
                <label className="custom-checkbox">
                    <input type="checkbox" className="checkbox"  name="phone_number_checkbox"  id ="phone_number_checkbox"  onChange={phoneDisableFunction}/>
                    <span>No Phone Available</span>
                </label>
            </div>
            <div className="form-group">
                <label>Email Address</label>
                <input type="text" className="form-control" onChange={buildNameForm} name="email" id="email"/>
                <small className="text-muted">
                    No Email? <a href="">Get one free from Google.</a>
                </small>
            </div>
            <div className="form-group">
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


