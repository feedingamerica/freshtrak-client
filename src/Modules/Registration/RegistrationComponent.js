import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PrimaryInfoFormComponent from '../Family/PrimaryInfoFormComponent';
import AddressComponent from '../Family/AddressComponent';
import ContactInformationComponent from '../Family/ContactInformationComponent';
import MemberCountFormComponent from '../Family/MemberCountFormComponent';
import EventSlotsModalComponent from '../Family/EventSlotsModalComponent';
import { formatDateForServer } from '../../Utils/DateFormat';
import BackButtonComponent from '../General/BackButtonComponent';

const RegistrationComponent = ({ user, onRegister, event, disabled }) => {
  const { register, handleSubmit, errors, getValues, watch, reset, setValue } = useForm({mode: 'onChange'});
  useEffect(() => {
    const {
      first_name,
      middle_name,
      last_name,
      suffix,
      date_of_birth,
      gender,
      address_line_1,
      address_line_2,
      city,
      state,
      zip_code,
      phone,
      permission_to_text,
      email,
      permission_to_email,
      seniors_in_household,
      adults_in_household,
      children_in_household,
      license_plate
    } = user || {};
    reset({
      first_name,
      middle_name,
      last_name,
      suffix,
      date_of_birth,
      gender,
      address_line_1,
      address_line_2,
      city,
      state,
      zip_code,
      phone,
      permission_to_text,
      email,
      permission_to_email,
      seniors_in_household,
      adults_in_household,
      children_in_household,
      license_plate
    })
  }, [user, reset])
  const onSubmit = data => {
    data['identification_code'] = user['identification_code']
    data["date_of_birth"] = formatDateForServer(data["date_of_birth"])
    onRegister(data);
    // localStorage.setItem("zip_code",user.zip_code)
  }
  
  const submitHandlerFocus = (e)=>{
    handleSubmit(onSubmit)(e);
    setTimeout(()=> window.scrollBy({top: -100,behavior: "smooth"}), 200)
  }
  
  return (
    <Fragment>
      <div className="mt-4">
        <section className="container pt-100 pb-100 register-confirmation">
          <div className="registration-form">
            <div className="content-wrapper">
              <EventSlotsModalComponent event={event} />
              <BackButtonComponent />
              <form onSubmit={submitHandlerFocus }>
                <PrimaryInfoFormComponent
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  watch={watch}
                   />
                <AddressComponent
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                />
                <ContactInformationComponent
                  register={register}
                  errors={errors}
                  getValues={getValues}
                  watch={watch}
                  setValue={setValue}
                />
                <MemberCountFormComponent
                  register={register}
                  event={event}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                />
                <div className="button-wrap mt-4">
                  <button
                    type="submit"
                    className="btn custom-button"
                    disabled={disabled}
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
