import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import CalenderComponent from "./CalendarComponent";
import moment from "moment";
import { API_URL } from '../../../Utils/Urls';
import { formatDateForServer } from '../../../Utils/DateFormat';
import axios from 'axios';



const EditInformationComponent = (props) => {
    const { register, handleSubmit, errors,setValue,watch } = useForm();
    const [first_name, setFirstName] = useState(null)
    const [date_of_birth, setDateOfBirth] = useState(null)
    const [middle_name, setMiddleName] = useState(null)
    const [last_name, setLastName] = useState(null)
    const [race, setRace] = useState(null)
    const [ethnicity, setEthnicity] = useState(null)
    const [gender, setGender] = useState(null)
   
    useEffect(() => {
        if (props.informationData) {
            let informationDetails = { ...props.informationData }
            setFirstName(informationDetails.first_name)
            setMiddleName(informationDetails.middle_name)
            setLastName(informationDetails.last_name)
            setGender(informationDetails.gender)
            setEthnicity(informationDetails.ethnicity)
            setRace(informationDetails.race)
            setDateOfBirth(moment(informationDetails.dob).format("MM/DD/YYYY"))
            
        } else {
            //props.proxyData.proxyTypes.length && setproxyTypeId(props.proxyData.proxyTypes[0].proxy_type_id)
        }

    }, [props])


    const checkValue = (str, max) => {
      if (str.charAt(0) !== '0' || str === '00') {
        var num = parseInt(str);
        if (isNaN(num) || num <= 0 || num > max) num = 1;
        str = num > parseInt(max.toString().charAt(0)) && num.toString().length === 1 ? '0' + num : num.toString();
      };
      return str;
    }

    const isValidDob = (value) => {
      const maxAgeDate = moment().subtract(123, 'years');
      const enteredDate = moment(value, 'MM / DD / YYYY');
      return enteredDate.isAfter(maxAgeDate);
    }



    const handleChangeDob = (e) => {
      var input = e.target.value;
      if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
      var values = input.split('/').map(function(v) {
        return v.replace(/\D/g, '')
      });
      if (values[0]) values[0] = checkValue(values[0], 12);
      if (values[1]) values[1] = checkValue(values[1], 31);
      var output = values.map(function(v, i) {
        return v.length === 2 && i < 2 ? v + '/' : v;
      });
      let value = output.join('').substr(0, 14);
      // let newDob = moment(value).format('YYYY-MM-DD');
      // setValue('date_of_birth', newDob)
      // setDateOfBirth(newDob)
      setValue('date_of_birth', value)
      setDateOfBirth(value)
    }

    const onSubmit = (data) => {
      props.tabClose()
       updateInformation(data)
    }

    const updateInformation = async (data) =>{
      let param = {
       "user": {first_name : data.first_name,
        middle_name : data.middle_name,
        last_name : data.last_name,
        date_of_birth : moment(date_of_birth).format('YYYY-MM-DD'),
        race : (data.race == "" || data.race == null || data.race == undefined ? race : data.race),
        ethnicity : (data.ethnicity == "" || data.ethnicity == null || data.ethnicity == undefined ? ethnicity : data.ethnicity),
        //is_adult : 1,
        gender : (data.gender == "" || data.gender == null || data.gender == undefined ? gender : data.gender)
      }
    }

      const authToken = localStorage.getItem('authToken');
        try {
          const resp = await axios.put(API_URL.UPDATE_INFORMATION, param,
            { headers: { Authorization: `${authToken}` } }
          );
          props.refreshMainTab()
        } catch (e) {
          console.log("error occured >",e)
    }
  }


  const decodeRaceAndEthnicity=(code)=>{
    switch(code){
    case "W" : return "White";
    case "HLS" : return "Hispanic, Latino, or Spanish";
    case "BAA" : return "Black or African American";
    case "A" : return "Asian";
    case "AIAN" : return "American Indian or Alaska Native";
    case "MENA" : return "Middle Eastern or North African";
    case "NHOP" : return "Native Hawaiian or Other Pacific Islander";
    case "OTHER" : return "Some other race or ethnicity";
    case "DK" : return "Don’t know";
    case "PNTA" : return "Prefer Not To Answer";
    case "DA" : return "Didn't Ask";
    default:return null;


    }
      }


    return (
    
    <div> <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">


        </div>
        <div className="form-group">
            <label>First Name</label>
            <input
                className="form-control"
                type="text"
                name="first_name"
                id="first_name"
                ref={register({ required: true })}
                defaultValue={first_name}
            />
            {errors.first_name && <span className="text-danger">This field is required</span>}
        </div>
        <div className="form-group">
            <label>Middle Name</label>
            <input
                className="form-control"
                type="text"
                name="middle_name"
                id="middle_name"
                ref={register}
                defaultValue={middle_name}
            />
        </div>

        {/* lastname */}
        <div className="form-group">
            <label>Last Name</label>
            <input
                className="form-control"
                type="text"
                name="last_name"
                id="last_name"
                ref={register}
                defaultValue={last_name}
            />
            {errors.last_name && <span className="text-danger">This field is required</span>}
        </div>

       

        <div className="form-group">
      <label htmlFor="date_of_birth">Date of Birth<span className="text-danger">*</span></label>
      <input
        type="text"
        className= {`form-control ${errors.date_of_birth && 'invalid'}`}
        name="date_of_birth"
        id="date_of_birth"
        placeholder="mm/dd/yyyy"
        onChange={(e) => handleChangeDob(e)}
        value={date_of_birth !== null ? date_of_birth : ""}
        ref={register({ required: true, validate: value => isValidDob(value)})}
      />
      {errors.date_of_birth && ( errors.date_of_birth.type === "validate"
        ? <span className="text-danger">Invalid DOB</span>
        : <span className="text-danger">This field is required</span> )
      }
    </div>


{/* 
    <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="no_phone_number"
              id="no_phone_number"
              value=""
              ref={register}
            />
            <label htmlFor="no_phone_number" className="form-check-label">
              Is adult ?
						</label>
          </div> */}



                              {/* <div className="form-group calendar-component">
                                    <label>Date Of Birth </label>
                                    <CalenderComponent
                                        // value={date_of_birth}
                                        maxDate={new Date()}
                                        yearNavigator={true}
                                        monthNavigator={true}
                                        onDateChange={(v) => setDateOfBirth(v)}
                                    />
                                </div> */}




    {/* race */}
    <div className="form-group">
      <label htmlFor="race">Race</label>
      <select
        className= {`form-control ${errors.race && 'invalid'}`}
        name="race"
        id="race"
        onChange={(e)=>setRace(e.target.value)}
        ref={register}
      >
        <option value=""defaultValue>{decodeRaceAndEthnicity(race)}</option>
        <option value="W">White</option>
        <option value="HLS">Hispanic, Latino, or Spanish</option>
        <option value="BAA">Black or African American</option>
        <option value="A">Asian</option>
        <option value="AIAN">American Indian or Alaska Native</option>
        <option value="MENA">Middle Eastern or North African</option>
        <option value="NHOP">Native Hawaiian or Other Pacific Islander</option>
        <option value="OTHER">Some other race or ethnicity</option>
        <option value="DK">Don’t know</option>
        <option value="PNTA">Prefer Not To Answer</option>
        <option value="DA">Didn't Ask</option>
      </select>
      {/* {errors.gender && <span className="text-danger">This field is required</span>} */}
    </div>


      {/* ethnicity */}
      <div className="form-group">
      <label htmlFor="ethnicity">Ethnicity</label>
      <select
        className= {`form-control ${errors.ethnicity && 'invalid'}`}
        name="ethnicity"
        id="ethnicity"
        onChange={(e)=>setEthnicity(e.target.value)}
        //ref={register({required: true})}
        ref={register}
      >
        <option value=""defaultValue>{decodeRaceAndEthnicity(ethnicity)}</option>
        <option value="W">White</option>
        <option value="HLS">Hispanic, Latino, or Spanish</option>
        <option value="BAA">Black or African American</option>
        <option value="A">Asian</option>
        <option value="AIAN">American Indian or Alaska Native</option>
        <option value="MENA">Middle Eastern or North African</option>
        <option value="NHOP">Native Hawaiian or Other Pacific Islander</option>
        <option value="OTHER">Some other race or ethnicity</option>
        <option value="DK">Don’t know</option>
        <option value="PNTA">Prefer Not To Answer</option>
        <option value="DA">Didn't Ask</option>
      </select>
      {/* {errors.gender && <span className="text-danger">This field is required</span>} */}
    </div>



    {/* gender */}
    <div className="form-group">
      <label htmlFor="gender">Gender</label>
      <select
        className= {`form-control ${errors.gender && 'invalid'}`}
        name="gender"
        id="gender"
        onChange={(e)=>setGender(e.target.value)}
        ref={register}
      >
        <option value=""defaultValue>{gender}</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
        <option value="Prefer Not To Specify">Prefer Not To Specify</option>
      </select>
      {errors.gender && <span className="text-danger">This field is required</span>}
    </div>


        <div>
            <button
                value="save"
                type="submit"
                className="btn complete-button w-100"
                name="save"
            >Save</button>
        </div>
        <div className="mt-3 text-center">
            <span className="text-purple font-weight-bold" onClick={props.tabClose}>Cancel</span>
        </div>
    </form></div>)
}
export default EditInformationComponent