import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RENDER_URL } from '../../Utils/Urls';
import { useHistory } from 'react-router-dom';
import RegistrationHeaderComponent from './RegistrationHeaderComponent';
import RegistrationTextComponent from './RegistrationTextComponent';
import PrimaryInfoFormComponent from './PrimaryInfoFormComponent';
import AddressComponent from './AddressComponent';
import ContactInformationComponent from './ContactInformationComponent';
import MemberCountFormComponent from './MemberCountFormComponent';
// import { formatDateToYYYYMMDD } from '../../Utils/DateFormat';
import { formatDateForServer } from '../../Utils/DateFormat';
import { Link } from 'react-router-dom';
import { RENDER_URL } from '../../Utils/Urls';

const RegistrationComponent = ({ user, onRegister, event, disabled }) => {
  const [showform, setShow] = useState(false);
  const showForm = () => setShow(true);
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
  const history = useHistory();
  const onSubmit = data => {
    data["date_of_birth"] = formatDateForServer(data["date_of_birth"])
    onRegister(data);
    // This must also be fixed. It is just luck that the params are available in the container
    if (data) {
      history.push({
        pathname: RENDER_URL.EVENT_REGISTRATION_URL + "/confirm"
      });
    }
  }
  return (
    <Fragment>
      <div className="main-wrapper mt-4">
        <section className="container pt-100 pb-100 register-confirmation">
          <div>
            { !showform && <RegistrationHeaderComponent /> }
          </div>
          <div className="registration-form">
            <div className="content-wrapper">
              { !showform && <RegistrationTextComponent/> }
              { !showform && <Link to={`${RENDER_URL.EVENT_REGISTRATION_URL}/${event.id}`}>
                <div className="button-wrap mt-4">
                  <button
                    type="submit"
                    className="btn custom-button"
                    data-testid="continue button"
                    onClick={(e) => showForm()}
                  >
                    Proceed to Register
                  </button>
                </div>
              </Link> }
              { showform && <form onSubmit={handleSubmit(onSubmit) }>
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
              </form> }
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default RegistrationComponent;
