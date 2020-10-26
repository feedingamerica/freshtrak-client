import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PrimaryInfoFormComponent from '../Family/PrimaryInfoFormComponent';
import AddressComponent from '../Family/AddressComponent';
import ContactInformationComponent from '../Family/ContactInformationComponent';
import MemberCountFormComponent from '../Family/MemberCountFormComponent';
import EventSlotsModalComponent from '../Family/EventSlotsModalComponent';
import { formatDateForServer, formatMMDDYYYY } from '../../Utils/DateFormat';
import BackButtonComponent from '../General/BackButtonComponent';
import { setCurrentUser, selectUser } from '../../Store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../../Utils/Urls';
import ECBDetails from './EcbDeatails';

const ECBRegistrationComponent = ({}) => {
  const { register, handleSubmit, errors, getValues, watch, reset, setValue } = useForm({mode: 'onChange'});
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [pageError, setPageError] = useState(false);
  const currentUser = useSelector(selectUser);
  const [user, setUser] = useState(currentUser);
  
  useEffect(fetchBusinesses, []);
  
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
    // onRegister(data);
  }
  
  const submitHandlerFocus = (e)=>{
    handleSubmit(onSubmit)(e);
    setTimeout(()=> window.scrollBy({top: -100,behavior: "smooth"}), 200)
  }

  function fetchBusinesses(){
    setUserToken(localStorage.getItem('userToken'));
    if (!isError && !pageError) {
      if(user === null) {
        getUser(localStorage.getItem('userToken'));
      }
    }
  }

  const getUser = async token => {
    setLoading(true);
    const { GUEST_USER } = API_URL;
    try {
      const resp = await Axios.get(GUEST_USER, {
        params: {},
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data } = resp;
      if (data["date_of_birth"] !== null){
        data["date_of_birth"] = formatMMDDYYYY(data["date_of_birth"]);
      }
      if (data["phone"] !== null){
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        data["phone"] = data["phone"].replace(phoneRegex, '($1) $2-$3')
      }
      dispatch(setCurrentUser(data));
      setUser(data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <Fragment>
      <div className="gray-bg">
        <section className="container pt-100 pb-100 register-confirmation">
        
          <div className="registration-form search-area" style={{marginTop:"0.2%"}}>
          <BackButtonComponent />
            <div className="content-wrapper">
              {/* <EventSlotsModalComponent event={event} /> */}
              
              <h2>Tell us about yourself</h2>
              <h5>Fill in everything you are able to tell us about them</h5>
              <form onSubmit={submitHandlerFocus }>
                <PrimaryInfoFormComponent
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  watch={watch}
                   />
                <ECBDetails
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  watch={watch}
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

export default ECBRegistrationComponent;
