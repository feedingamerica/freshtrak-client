import React, { forwardRef } from 'react';
import moment from 'moment';
import localization from '../Localization/LocalizationComponent'

const PrimaryInfoFormComponent =  forwardRef(({ register, getValues,  triggerValidation, continueHandler, errors, setValue, watch }, ref) => {
  const date_of_birth = watch('date_of_birth') || '';

  const checkValue = (str, max) => {
    if (str.charAt(0) !== '0' || str === '00') {
      var num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      str = num > parseInt(max.toString().charAt(0)) && num.toString().length === 1 ? '0' + num : num.toString();
    };
    return str;
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
  }

  const isValidDob = (value) => {
    const maxAgeDate = moment().subtract(123, 'years');
    const enteredDate = moment(value, 'MM / DD / YYYY');
    return enteredDate.isAfter(maxAgeDate);
  }

  return (
  <div className="mt-4">
    <h2>{localization.register_who_are_you}</h2>
    <div className="form-group">
      <label htmlFor="first_name">{localization.first_name}<span className="text-danger">*</span></label>
      <input
        type="text"
        className= {`form-control ${errors.first_name && 'invalid'}`}
        name="first_name"
        id="first_name"
        ref={register({ required: true })}
      />
      {errors.first_name && <span className="text-danger">This field is required</span>}
    </div>
    <div className="form-group">
      <label htmlFor="middle_name">{localization.middle_name}</label>
      <input
        type="text"
        className="form-control"
        name="middle_name"
        id="middle_name"
        ref={register}
      />
    </div>
    <div className="form-group">
      <label htmlFor="last_name">{localization.last_name}<span className="text-danger">*</span></label>
      <input
        type="text"
        className= {`form-control ${errors.last_name && 'invalid'}`}
        name="last_name"
        id="last_name"
        ref={register({ required: true })}
      />
      {errors.last_name && <span className="text-danger">This field is required</span>}
    </div>
    <div className="form-group">
      <label htmlFor="suffix">{localization.suffix}</label>
      <select
        name="suffix"
        id="suffix"
        className="form-control"
        ref={register}
      >
        <option value="" defaultValue></option>
        <option value="SR">Sr</option>
        <option value="JR">Jr</option>
        <option value="I">I</option>
        <option value="II">II</option>
        <option value="III">III</option>
        <option value="IV">IV</option>
        <option value="V">V</option>
        <option value="VI">VI</option>
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="date_of_birth">{localization.dob}<span className="text-danger">*</span></label>
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
    <div className="form-group">
      <label htmlFor="gender">{localization.gender}<span className="text-danger">*</span></label>
      <select
        className= {`form-control ${errors.gender && 'invalid'}`}
        name="gender"
        id="gender"
        ref={register({required: true})}
      >
        <option value="" defaultValue></option>
        <option value="male">{localization.male}</option>
        <option value="female">{localization.female}</option>
        <option value="other">{localization.other}</option>
        <option value="not_specify">{localization.not_to_say}</option>
      </select>
      {errors.gender && <span className="text-danger">This field is required</span>}
    </div>
    {/* <button type="button" onClick={() => { triggerValidation(["first_name", "last_name"]); }}>
    validate
    </button> */}

    <button
    type="button"
    // onClick = {continueHandler}
    onClick= {async() => { 
      const values = getValues()
      const result = await triggerValidation(["first_name", "last_name" , "date_of_birth", "gender"]); 
      if (result) continueHandler(values)
    }}
    className="btn custom-button"
    data-testid="continue button"
  > Continue</button> 
  </div>
  )
});

export default PrimaryInfoFormComponent;
