import React, { Fragment, forwardRef } from 'react';
import StateDropdownComponent from './StateDropdownComponent';

const HouseHoldFormComponent = forwardRef(({ register, errors }, ref) => (
  <Fragment>
    <div className="form-group">
      <label htmlFor="address_line_1">Street Address</label>
      <input
        type="text"
        className="form-control"
        name="address_line_1"
        id="address_line_1"
        ref={register({ required: true })}
      />
      {errors.address_line_1 && <span className="text-danger">This field is required</span>}
    </div>

    <div className="form-group">
      <label htmlFor="address_line_2">Street Address Continued</label>
      <input
        type="text"
        className="form-control"
        name="address_line_2"
        id="address_line_2"
        ref={register}
      />
    </div>

    <div className="d-flex city-state-form">
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          className="form-control"
          name="city"
          id="city"
          ref={register({ required: true })}
        />
        {errors.city && <span className="text-danger">This field is required</span>}
      </div>
      <StateDropdownComponent register={register} errors={errors} />

      <div className="form-group ml-2">
        <label htmlFor="zip_code">Zip Code</label>
        <input
          type="text"
          className="form-control"
          name="zip_code"
          id="zip_code"
          ref={register({ required: true })}
        />
        {errors.zip_code && <span className="text-danger">This field is required</span>}
      </div>
    </div>
  </Fragment>
));

export default HouseHoldFormComponent;
