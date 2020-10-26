import React, { forwardRef } from 'react';

const ECBDetails =  forwardRef(({ register, errors, setValue, watch }, ref) => {
  return (
  <div className="mt-4">
    <div className="form-group">
      <label htmlFor="race">Race<span className="text-danger">*</span></label>
      <select
        className= {`form-control ${errors.gender && 'invalid'}`}
        name="race"
        id="race"
        ref={register({required: true})}
      >
        <option value="" defaultValue></option>
        <option value="race_1">race 1</option>
        <option value="erace_2">race 2</option>
        <option value="not_specify">Prefer Not To Specify</option>
      </select>
      {errors.headofhousehost && <span className="text-danger">This field is required</span>}
    </div>
    <div className="form-group">
      <label htmlFor="ethnicity">Ethinicty<span className="text-danger">*</span></label>
      <select
        className= {`form-control ${errors.gender && 'invalid'}`}
        name="ethnicity"
        id="ethnicity"
        ref={register({required: true})}
      >
        <option value="" defaultValue></option>
        <option value="ethnicity_1">Ethinicty 1</option>
        <option value="ethnicity_2">Ethinicty 2</option>
        <option value="not_specify">Prefer Not To Specify</option>
      </select>
      {errors.headofhousehost && <span className="text-danger">This field is required</span>}
    </div>
    <div className="form-group">
      <label htmlFor="head_of_househost">Head of House hold<span className="text-danger">*</span></label>
      <select
        className= {`form-control ${errors.gender && 'invalid'}`}
        name="head_of_househost"
        id="head_of_househost"
        ref={register({required: true})}
      >
        <option value="" defaultValue></option>
        <option value="head_of_househost_1">Head of Househost 1</option>
        <option value="head_of_househost_2">Head of Househost 2</option>
        <option value="not_specify">Prefer Not To Specify</option>
      </select>
      {errors.headofhousehost && <span className="text-danger">This field is required</span>}
    </div>
  </div>
  )
});

export default ECBDetails;
