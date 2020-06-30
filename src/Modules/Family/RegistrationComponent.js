import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import RegistrationHeaderComponent from './RegistrationHeaderComponent';
import RegistrationTextComponent from './RegistrationTextComponent';
import PrimaryInfoFormComponent from './PrimaryInfoFormComponent';
import AddressComponent from './AddressComponent';
import ContactInformationComponent from './ContactInformationComponent';
import MemberCountFormComponent from './MemberCountFormComponent';

const RegistrationComponent = ({ user, onRegister }) => {
  const { register, handleSubmit, errors, getValues, watch, reset, setValue } = useForm();
  useEffect(() => {
    const {
      address_line_1,
      address_line_2,
      city,
      state,
      zip_code,
      phone,
      first_name,
      last_name,
      middle_name,
      date_of_birth,
      email,
      seniors_in_household,
      children_in_household,
    } = user;
    reset({
      address_line_1,
      address_line_2,
      city,
      state,
      zip_code,
      phone,
      first_name,
      last_name,
      middle_name,
      date_of_birth,
      email,
      seniors_in_household,
      children_in_household,
    })
  }, [user, reset])
  const onSubmit = data => {
    onRegister(data);
  }
  return (
    <Fragment>
      <div className="main-wrapper mt-4">
        <section className="container pt-100 pb-100 register-confirmation">
          <div>
            <RegistrationHeaderComponent />
          </div>
          <div className="registration-form">
            <div className="content-wrapper">
              <RegistrationTextComponent />
              <form onSubmit={handleSubmit(onSubmit)}>
                <PrimaryInfoFormComponent register={register} errors={errors} />
                <AddressComponent register={register} errors={errors} />
                <ContactInformationComponent
                  register={register}
                  errors={errors}
                  getValues={getValues}
                  watch={watch}
                  setValue={setValue}
                />
                <MemberCountFormComponent register={register} errors={errors} />
                <div className="button-wrap mt-4">
                  <button
                    type="submit"
                    className="btn custom-button"
                    data-testid="continue button"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default RegistrationComponent;
