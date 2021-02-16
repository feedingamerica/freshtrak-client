import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import CalenderComponent from "./CalendarComponent";
//import PhoneInputComponent from "../../General/PhoneInputComponent"
import moment from "moment";
const EditInformationComponent = (props) => {
    const { register, handleSubmit, errors,setValue,watch } = useForm();
    //const [startDate, setStartDate] = useState(null)
    //const [endDate, setEndDate] = useState(null)
    const [first_name, setFirstName] = useState(null)
    const [date_of_birth, setDateOfBirth] = useState(null)
    const [middle_name, setMiddleName] = useState(null)
    const [last_name, setLastName] = useState(null)
    //const [suffix, setSuffix] = useState(null)
    const [race, setRace] = useState(null)
    const [ethnicity, setEthnicity] = useState(null)
    const [gender, setGender] = useState(null)
    //const [minStartDate, setMinStartDate] = useState(null)
    //const [minEndDate, setMinEndDate] = useState(null)
    //const [phone, setPhone] = useState("")
    //const [proxyTypeId, setproxyTypeId] = useState('')
   
    useEffect(() => {
console.log("props in edit comp >>",props)
//console.log("props.informationData >>",props.informationData)
        if (props.informationData) {
            let informationDetails = { ...props.informationData }
            //setproxyTypeId(informationDetails.proxy_type_id)
            setFirstName(informationDetails.first_name)
            setMiddleName(informationDetails.middle_name)
            setLastName(informationDetails.last_name)
            setGender(informationDetails.gender)
            setEthnicity(informationDetails.ethnicity)
            setRace(informationDetails.race)
            setDateOfBirth(moment(informationDetails.dob).format("MM/DD/YYYY"))
            //setSuffix(informationDetails.suffix)
            //setPhone(informationDetails.phone)
            //setStartDate(new Date(informationDetails.start_date))
            //setEndDate(new Date(informationDetails.end_date))
            //setDateOfBirth(new Date(informationDetails.dob))
            
        } else {
          console.log("in else")
            //props.proxyData.proxyTypes.length && setproxyTypeId(props.proxyData.proxyTypes[0].proxy_type_id)
        }

    }, [props])



    useEffect(() => {
        let today = new Date()

    }, [])

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
        return v.length === 2 && i < 2 ? v + ' / ' : v;
      });
      let value = output.join('').substr(0, 14);
      setValue('date_of_birth', value)
      setDateOfBirth(value)
      console.log("date of birth set >>",date_of_birth)
    }

    const onSubmit = (data) => {
      props.tabClose()
      console.log("onSubmit called in informationEditComponent")
        let informationData = {
            ...data,
            //start_date: startDate ? moment(startDate).format("MM/DD/YYYY") : "",
            //end_date: endDate ? moment(endDate).format("MM/DD/YYYY") : ""
        }
        //props.onSaveProxy(proxyData)
    }

    return (
    
    <div> test<form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">
            <label>Edit Information </label>

            {/* <div className="select-wrapper">
                <select
                    className="form-control"
                    name="proxy_type_id"
                    id="proxy_type_id"
                    value={proxyTypeId}
                    onChange={(e) => setproxyTypeId(e.target.value)}
                    ref={register}
                >
                    {props.proxyData.proxyTypes.length &&
                        props.proxyData.proxyTypes.map((proxyType, i) => (
                            <option value={proxyType.id} key={proxyType.id + i} >
                                {proxyType.proxy_type}
                            </option>
                        ))}   </select>
            </div> */}



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
                ref={register({ required: true })}
                defaultValue={last_name}
            />
            {errors.last_name && <span className="text-danger">This field is required</span>}
        </div>


        {/* <div className="form-group">
            <label>Suffix </label>
            <div className="select-wrapper">
                <select
                    className="form-control"
                    name="suffix"
                    id="suffix"
                    ref={register}
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value)}
                >
                    <option value=""></option>
                    {props.proxyData.suffixes.length &&
                        props.proxyData.suffixes.map((proxyOptions, i) => (
                            <option value={proxyOptions} key={proxyOptions + i} >{proxyOptions}</option>
                        ))}
                </select>
            </div>
        </div> */}


        {/* <EditAddressComponent
            register={register}
            errors={errors}
            //addressData={props.proxyData.proxies}
            addressData={null}
            //states={props.proxyData.states}
            states={[]}
            setValue={setValue}
            watch={watch}
        /> */}






        {/* <PhoneInputComponent
            phone={phone}
            register={register}
            errors={errors}
            setPhone={(v)=>setPhone(v)}
        /> */}


        <div className="form-group">
      <label htmlFor="date_of_birth">Date of Birth<span className="text-danger">*</span></label>
      <input
        type="text"
        className= {`form-control ${errors.date_of_birth && 'invalid'}`}
        name="date_of_birth"
        id="date_of_birth"
        placeholder="mm/dd/yyyy"
        onChange={e => handleChangeDob(e)}
        value={date_of_birth}
        ref={register({ required: true, validate: value => isValidDob(value)})}
      />
      {errors.date_of_birth && ( errors.date_of_birth.type === "validate"
        ? <span className="text-danger">Invalid DOB</span>
        : <span className="text-danger">This field is required</span> )
      }
    </div>




    {/* race */}
    <div className="form-group">
      <label htmlFor="gender">Race</label>
      <select
        className= {`form-control ${errors.gender && 'invalid'}`}
        name="gender"
        id="gender"
        onChange={(e)=>setRace(e.target.value)}
        // ref={register({required: true})}
      >
        <option value=""defaultValue>{race}</option>
        {/* <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        <option value="not_specify">Prefer Not To Specify</option> */}
      </select>
      {/* {errors.gender && <span className="text-danger">This field is required</span>} */}
    </div>


      {/* ethnicity */}
      <div className="form-group">
      <label htmlFor="gender">Ethnicity</label>
      <select
        className= {`form-control ${errors.gender && 'invalid'}`}
        name="gender"
        id="gender"
        onChange={(e)=>setEthnicity(e.target.value)}
        // ref={register({required: true})}
      >
        <option value=""defaultValue>{ethnicity}</option>
        {/* <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        <option value="not_specify">Prefer Not To Specify</option> */}
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
      >
        <option value=""defaultValue>{gender}</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        <option value="not_specify">Prefer Not To Specify</option>
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