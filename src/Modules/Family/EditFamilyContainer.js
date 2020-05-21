import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import HeaderComponent from '../Header/HeaderComponent';
import AddressComponent from './AddressComponent';
import MemberCountFormComponent from './MemberCountFormComponent';
import PrimaryInfoFormComponent from './PrimaryInfoFormComponent';
import SpinnerComponent from '../General/SpinnerComponent';

import '../../Assets/scss/main.scss';

// Using fake data for now
import { mockFamily } from '../../Testing'

const EditFamilyContainer = () => {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, errors, getValues, reset } = useForm();
  const onSubmit = data => { console.log(data) };
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const {
        address_line_1,
        address_line_2,
        city,
        state,
        zip_code,
        first_name,
        last_name,
        middle_name,
        date_of_birth,
        email,
        seniors_in_household,
        childern_in_household,
      } = mockFamily
      reset({
        address_line_1,
        address_line_2,
        city,
        state,
        zip_code,
        first_name,
        last_name,
        middle_name,
        date_of_birth,
        email,
        seniors_in_household,
        childern_in_household,
      })
      setLoading(false);
    }, 1000);
  }, [reset]);

  return(
    <Fragment>
      <HeaderComponent shortHeader={'navbar-green'} />
      <div className="main-warpper mt-4">
        <section className="container pt-100 register-confirmation">
          <div>
            <h1>Edit yo self</h1>
          </div>
          {!loading && (
            <div className="content-wrapper">
              <form onSubmit={handleSubmit(onSubmit)}>
                <AddressComponent register={register} errors={errors} />
                <PrimaryInfoFormComponent register={register} errors={errors} getValues={getValues} />
                <MemberCountFormComponent register={register} errors={errors} />
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    ref={register({ required: true })}
                  />
                  <small className="text-muted">
                    No Email? <a href="https://support.google.com/mail/answer/56256" target="_blank" rel="noopener noreferrer">Get one free from Google.</a>
                  </small><br />
                  {errors.email && <span className="text-danger">This field is required</span>}
                </div>
                <div className="button-wrap mt-4">
                  <button
                    type="submit"
                    className="btn custom-button"
                    data-testid="continue button"
                  >Update</button>
                </div>
              </form>
            </div>
          )}
          {loading && <SpinnerComponent />}
        </section>
      </div>
    </Fragment>
  );
};

export default EditFamilyContainer;
