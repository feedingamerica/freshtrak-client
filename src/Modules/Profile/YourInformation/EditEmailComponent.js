import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import PhoneComponent from '../../General/PhoneComponent';
import axios from 'axios';
import { API_URL } from '../../../Utils/Urls';
import { useSelector,useDispatch } from 'react-redux';
import { setCurrentUser, selectUser } from '../../../Store/userSlice';
import SpinnerComponent from '../../General/SpinnerComponent';


const EditEmailComponent = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [email, setEmail] = useState(null);
  const [emails, setEmails] = useState([]);
  const [emailsUnedited, setEmailsUnedited] = useState([]);
  const currentUser = useSelector(selectUser);
  const [user, setUser] = useState(currentUser);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    if (email == null) {
      setEmailDetails()
    }
    return () => {
    };
  })

  const setEmailDetails=()=>{
    let emailDetails = {...props.emailData}
    setEmails(props.emails)
    setEmailsUnedited(props.emails)
    setEmail(emailDetails.email)
  }




  const onSubmit = () => {
      //emailsUnedited.forEach((emailObject,index)=>{
      //let changedEmail = checkEqual(emailObject,emails[index])
      // if(changedEmail){
      //     postData(changedEmail)
      // }else{
      //     props.tabClose()
      // }
      //})
      props.tabClose()
  }

  const checkEqual=(object1, object2)=>{
    const keys1 = Object.keys(object1);
    //const keys2 = Object.keys(object2);
    // if (keys1.length !== keys2.length) {
    //     console.log("false")
    //   return false;
    // }
  
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return (object2);
      }
    }
    //return true;
  }


  const postData = async (data) =>{

    let email_param = {"email":
    {
      email : data.email
    }
  }

    updateEmail(email_param,data.id)
  }


  const updateEmail = async(param,id)=>{

    const {UPDATE_EMAIL}=  API_URL;
    let URL = `${UPDATE_EMAIL}/${id}`
    const authToken = localStorage.getItem('authToken');
    
    let updatedUser = {
      ...user,
      email : param.email.email
  
    }
    try {
      await axios.post(URL, param,
        { headers: { Authorization: `${authToken}` } }
      );
      setUser(updatedUser);
      dispatch(setCurrentUser(updatedUser));
      setLoading(false)
      props.refreshMainTab()
      props.tabClose()
    } catch (e) {
      setLoading(false)
      props.tabClose()
  }
  }

  const onEmailChange = (e,index) => {
    const number = e.target.value;
    //let phoneNumber = number.replace(/[^0-9]/ig, "");
    let allEmails = [...emails];
    let emailObject = allEmails[index];
    // if (phoneNumber.length > 10) {
    //     phoneNumber = phoneNumber.substring(0, 10)
    //     const num = `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6, phoneNumber.length)}`;
    //     //setPhone(num) //old single phone edit
    //     //new array edit
    //     let newPhoneObject = {
    //         ...phoneObject,
    //         "phone" : num
    //     }
    //     allPhones[index] = newPhoneObject;
    //     setPhones(allPhones)
    // }
    //else {
        let newEmailObject = {
            ...emailObject,
            "email" : e.target.value
        }
        allEmails[index] = newEmailObject;
        setEmails(allEmails)
        //setPhone(e.target.value) //old single phone edit
    //}
}



  return (
    
    <div> <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">

        <label htmlFor="email">Email</label>

        </div>


        {       
            emails.map((value, index) =>{
                return <div key={index} className="form-group">
                  <div className="mt-3 mb-3">Email {index+1}{value.is_primary ? " ( Primary )" : null}</div>
                  
                  <input
                    type="email"
                    className= {`form-control ${errors.email && 'invalid'}`}
                    name="email"
                    //id="email"
                    //value={email ? email : ""}
                    id={value.email}
                    disabled={value.is_primary}
                    value={value.email}
                    //onChange={(e)=>setEmail(e.target.value)}
                    onChange={(e)=>onEmailChange(e,index)}
                    ref={register({ required: true })}
                  />
                  <small className="text-muted">
                    No Email? <a href="https://support.google.com/mail/answer/56256" target="_blank" rel="noopener noreferrer">Get one free from Google.</a>
                  </small><br />
                  {errors.email && <span className="text-danger">This field is required</span>}
                </div>
              }
              )
              }



        <div>
            <button
                value="save"
                type="submit"
                className="btn complete-button w-100"
                name="save"
            >Save</button>
        </div>
        <div className="mt-3 mb-3">
        {isLoading && <SpinnerComponent></SpinnerComponent>}
        </div>
        <div className="mt-3 text-center">
            <span className="text-purple font-weight-bold" onClick={props.tabClose}>Cancel</span>
        </div>
    </form></div>)

}

export default EditEmailComponent;