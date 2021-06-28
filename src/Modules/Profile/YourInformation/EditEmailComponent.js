import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { API_URL } from '../../../Utils/Urls';
import { useSelector,useDispatch } from 'react-redux';
import { setCurrentUser, selectUser } from '../../../Store/userSlice';
import SpinnerComponent from '../../General/SpinnerComponent';


const EditEmailComponent = (props) => {
  const { register, errors } = useForm();
  //const [email, setEmail] = useState(null);
  const [emails, setEmails] = useState([]);
  const [emailsUnedited, setEmailsUnedited] = useState([]);
  const currentUser = useSelector(selectUser);
  const [user, setUser] = useState(currentUser);
  const [isLoading, setLoading] = useState(false);
  const [errorObject, setErrorObject] = useState(null);
  const dispatch = useDispatch();

  useEffect(()=>{
    if (emails && emails.length<=0) {
      setEmailDetails()
    }
    return () => {
    };
  })

  const setEmailDetails=()=>{
    let emailDetails = [...props.emails]
    setEmails(props.emails)
    setEmailsUnedited(props.emails)
    emailDetails = emailDetails.map((item)=>{
      return{
        ...item,
        is_error:false
      }
      })
      setErrorObject(emailDetails)
  }




  const onSubmit = (e) => {
    e.preventDefault();
    if(isValidate()){
      emailsUnedited.forEach((emailObject,index)=>{
      let changedEmail = checkEqual(emailObject,emails[index])
      if(changedEmail){
          postData(changedEmail)
      }else{
        props.tabClose()
    }
      })
    }  
  }

  const isValidate=()=>{
    let error_flag = true;
    let error_object = [...errorObject];
    emails.forEach((email,i)=>{
    if(!email.email){
      error_flag = false;
      error_object[i] = {...error_object[i],is_error:true}
      setErrorObject(error_object)
    }
   
    })
    return error_flag;
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


  const getClassName=(id)=>{
    let className = 'form-control';
    errorObject.forEach((item)=>{
    if(item.id === id && item.is_error){
    className = 'form-control invalid';
    }
    })
    return className;
  }

  const onEmailChange = (e,index) => {
    let allEmails = [...emails];
    let emailObject = allEmails[index];
        let newEmailObject = {
            ...emailObject,
            "email" : e.target.value
        }
        allEmails[index] = newEmailObject;
        setEmails(allEmails)
}



  return (
    
    <div> <form onSubmit={onSubmit}>

        <div className="form-group">

        <label htmlFor="email">Email</label>

        </div>


        {       
            emails && emails.map((value, index) =>{
                return <div key={index} className="form-group">
                  <div className="mt-3 mb-3">Email {index+1}{value.is_primary ? " ( Primary )" : null}</div>
                  
                  <input
                    type="email"
                    //className= {`form-control ${errors.email && 'invalid'}`}
                    className= {getClassName(value.id)}
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
                  {/* <small className="text-muted">
                    No Email? <a href="https://support.google.com/mail/answer/56256" target="_blank" rel="noopener noreferrer">Get one free from Google.</a>
                  </small><br /> */}
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