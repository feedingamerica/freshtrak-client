import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PrimaryInfoFormComponent from './PrimaryInfoFormComponent';
import AddressComponent from './AddressComponent';
import ContactInformationComponent from './ContactInformationComponent';
import MemberCountFormComponent from './MemberCountFormComponent';
import EventSlotsModalComponent from './EventSlotsModalComponent';
import { formatDateForServer } from '../../Utils/DateFormat';

const RegistrationComponent = ({ user, onRegister, event, disabled }) => {
  const { register, handleSubmit, errors, getValues, watch, reset, setValue } = useForm({mode: 'onChange'});
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
    } = user || {};
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
    data["date_of_birth"] = formatDateForServer(data["date_of_birth"])
    onRegister(data);
    localStorage.setItem("zip_code",user.zip_code)
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
              <form onSubmit={submitHandlerFocus }>
                <PrimaryInfoFormComponent
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  watch={watch}
                   />
                <AddressComponent register={register} errors={errors} />
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
