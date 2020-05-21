import React, { forwardRef } from 'react';

const PrimaryInfoFormComponent =  forwardRef(({ register, errors }, ref) => (
  <div className="mt-4">
    <h2>Who you are</h2>
    <div className="form-group">
      <label htmlFor="first_name">First Name</label>
      <input
        type="text"
        className="form-control"
        name="first_name"
        id="first_name"
        ref={register({ required: true })}
      />
      {errors.first_name && <span className="text-danger">This field is required</span>}
    </div>
    <div className="form-group">
      <label htmlFor="middle_name">Middle Name</label>
      <input
        type="text"
        className="form-control"
        name="middle_name"
        id="middle_name"
        ref={register}
      />
    </div>
    <div className="form-group">
      <label htmlFor="last_name">Last Name</label>
      <input
        type="text"
        className="form-control"
        name="last_name"
        id="last_name"
        ref={register({ required: true })}
      />
      {errors.last_name && <span className="text-danger">This field is required</span>}
    </div>
    <div className="form-group">
      <label htmlFor="suffix">Suffix</label>
      <select
        name="suffix"
        id="suffix"
        className="form-control"
        ref={register}
      >
        <option value="" defaultValue></option>
        <option value="jr">Jr</option>
        <option value="sr">Sr</option>
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="date_of_birth">Date of Birth</label>
      <input
        type="date"
        className="form-control"
        name="date_of_birth"
        id="date_of_birth"
        ref={register({ required: true })}
      />
      {errors.date_of_birth && <span className="text-danger">This field is required</span>}
    </div>
    <div className="form-group">
      <label htmlFor="gender">Gender</label>
      <select
        className="form-control"
        name="gender"
        id="gender"
        ref={register}
      >
        <option value="" defaultValue></option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="not_specify">Prefer Not To Specify</option>
      </select>
    </div>
  </div>
));

export default PrimaryInfoFormComponent;
