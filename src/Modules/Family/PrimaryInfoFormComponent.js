import React, { forwardRef } from 'react';

const PrimaryInfoFormComponent =  forwardRef(({ register, errors, getValues }, ref) => (
  <div className="mt-4">
      <h2>Your Information</h2>
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
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          className="form-control"
          name="dob"
          id="dob"
          ref={register({ required: true })}
        />
        {errors.dob && <span className="text-danger">This field is required</span>}
      </div>
      <div className="form-group">
        <label htmlFor="hoh">Head of Household</label>
        <select
          className="form-control"
          name="hoh"
          id="hoh"
          ref={register({ required: true })}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        {errors.hoh && <span className="text-danger">This field is required</span>}
      </div>
      <div className="form-group">
        <label htmlFor="phone_number">Phone Number</label>
        <input
          type="tel"
          className="form-control"
          name="phone_number"
          id="phone_number"
          ref={register({
            validate: value => {
              const { no_phone_number } = getValues()
              if (!value && !no_phone_number) {
                return false;
              }
            }
          })}
        />
        {
          errors.phone_number && <span className="text-danger" data-testid="no phone error">This field is required. If you have no phone check "No Phone Available".</span>
        }
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="no_phone_number"
          id="no_phone_number"
          value=""
          ref={register}
        />
        <label htmlFor="no_phone_number" className="form-check-label">No Phone Available</label>
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
