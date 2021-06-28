import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import PhoneComponent from '../../General/PhoneComponent';
import axios from 'axios';
import { API_URL } from '../../../Utils/Urls';
import { useSelector,useDispatch } from 'react-redux';
import { setCurrentUser, selectUser } from '../../../Store/userSlice';
import SpinnerComponent from '../../General/SpinnerComponent';


const EditPhoneComponent = (props) => {
  const { register } = useForm();
  //const [phone, setPhone] = useState(null);
  const [phones, setPhones] = useState([]);
  const [phonesUnedited, setPhonesUnedited] = useState([]);
  const currentUser = useSelector(selectUser);
  const [user, setUser] = useState(currentUser);
  const [isLoading, setLoading] = useState(false);
  const [errorObject, setErrorObject] = useState(null);
  const dispatch = useDispatch();

  useEffect(()=>{
    if (phones && phones.length <= 0) {
      setPhoneDetails()
    }
    return () => {
    };
      //setPhoneDetails()

  })

  const setPhoneDetails=()=>{
    let phoneDetails = [props.phones]
    setPhones(props.phones)
    setPhonesUnedited(props.phones)
    phoneDetails = phoneDetails.map((item)=>{
    return{
      ...item,
      is_error:false
    }
    })
    setErrorObject(phoneDetails)
  }




  const onSubmit = (e) => {
    e.preventDefault();
    if(isValidate()){
    phonesUnedited.forEach((phoneObject,index)=>{
         let changedPhone = checkEqual(phoneObject,phones[index])
         if(changedPhone){ 
             postData(changedPhone)
         }else{
             props.tabClose()
         }
     })}
    //props.tabClose()
  }


  const isValidate=()=>{
    let error_flag = true;
    let error_object = [...errorObject];
    phones.forEach((phone,i)=>{
    if(!phone.phone){
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
  }


  const postData = async (data) =>{
    
    let phone_param = {"phone":
    {
      phone : data.phone
    }
    }
      updatePhone(phone_param,data.id)
    

  }

  const updatePhone = async(param,id)=>{
    setLoading(false)
    const {UPDATE_PHONE}=  API_URL;
    let URL = `${UPDATE_PHONE}/${id}`
    let updatedUser = {
      ...user,
      phone : param.phone.phone
    } 

    const authToken = localStorage.getItem('authToken');
    try {
      await axios.put(URL, param,
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





  const onPhoneChange = (e,index) => {
    const number = e.target.value;
    let phoneNumber = number.replace(/[^0-9]/ig, "");
    let allPhones = [...phones];
    let phoneObject = allPhones[index];
    if (phoneNumber.length > 10) {
        phoneNumber = phoneNumber.substring(0, 10)
        const num = `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6, phoneNumber.length)}`;
        //setPhone(num) //old single phone edit
        //new array edit
        let newPhoneObject = {
            ...phoneObject,
            "phone" : num
        }
        allPhones[index] = newPhoneObject;
        setPhones(allPhones)
    }
    else {
        let newPhoneObject = {
            ...phoneObject,
            "phone" : e.target.value
        }
        allPhones[index] = newPhoneObject;
        setPhones(allPhones)
        //setPhone(e.target.value) //old single phone edit
      }
    }
  return (
    
    <div> <form onSubmit={onSubmit}>

        <div className="form-group">

        <label htmlFor="phone">Phone Number (Mobile Preferred)</label>

        </div>

        {       
            phones && phones.map((value, index) =>{
                return <div key={index} className="form-group">
                    <div className="mt-3 mb-3">Phone {index+1}{value.is_primary ? " ( Primary )" : null}</div>
                    <PhoneComponent
                    type="text"
                    className= {getClassName(value.id)}
                    name="phone"
                    disabled={value.is_primary}
                    placeholder="(xxx) xxx-xxxx"
                    id={value.phone}
                    value={value.phone}
                    onChange={(e)=>onPhoneChange(e,index)}
                    register={register}
                    />


                    {/* <div className="d-flex flex-column">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                        <PhoneComponent
                          type="text"
                          className= {getClassName(value.id)}
                          name="phone"
                          disabled={value.is_primary}
                          placeholder="(xxx) xxx-xxxx"
                          id={value.phone}
                          value={value.phone}
                          onChange={(e)=>onPhoneChange(e,index)}
                          register={register}
                          />
                        </div>

                        <div className="ml-2 pointer">
                                x
                        </div>
                    
                      </div>

                      <div className="checkbox-custom">
                                    <input type="checkbox"
                                        disabled={false}
                                        id={index}
                                        name={index} 
                                        />
                                    <label htmlFor={index}>send notifcation</label>
                                </div>
                    </div> */}
                </div>
                })
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
        {isLoading && <SpinnerComponent/>}
        </div>
        <div className="mt-3 text-center">
            <span className="text-purple font-weight-bold" onClick={props.tabClose}>Cancel</span>
        </div>
    </form></div>)

}

export default EditPhoneComponent;