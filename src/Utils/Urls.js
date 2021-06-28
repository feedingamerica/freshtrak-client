/**
 * API and Render url defined
 */

export const BASE_URL = process.env.REACT_APP_PANTRY_FINDER_API;
const REGISTRATION_URL = process.env.REACT_APP_REGISTRATION_API;
const WELLNESS_URL = process.env.REACT_APP_WELLNESS_API;
export const API_URL = {
    EVENTS_LIST : BASE_URL + 'api/agencies',
    FOODBANK_LIST : BASE_URL + 'api/foodbanks',
    EVENT_URL : BASE_URL + 'api/events',
    EVENT_DATES_URL : BASE_URL + 'api/event_dates',
    AGENCY_EVENTS: `${BASE_URL}api/agencies`,
    GUEST_AUTH: `${REGISTRATION_URL}guest_authentications`,
    GUEST_USER: `${REGISTRATION_URL}api/user`,
    CREATE_RESERVATION: `${REGISTRATION_URL}api/reservations`,
    FB_AUTH: `${REGISTRATION_URL}auth_callbacks/facebook`,
    TWILIO_SMS: `${REGISTRATION_URL}twilio/sms`,
    SEND_EMAIL: `${REGISTRATION_URL}twilio/email`,
    USER_REGISTRATION : `${REGISTRATION_URL}cognito_authentications/user_add_details`,
    COGNITO_USER : `${REGISTRATION_URL}cognito_authentications/user_data`,
    USER_CREATION : `${REGISTRATION_URL}cognito_authentications/user_signup`,
    USER_INFORMATION : `${REGISTRATION_URL}profiles/user_data`,
    USER_ADDRESS : `${REGISTRATION_URL}profiles/user_address`,
    USER_CONTACT : `${REGISTRATION_URL}profiles/user_contact_details`,
    USER_VEHICLE : `${REGISTRATION_URL}profiles/user_vehicle_details`,
    UPDATE_INFORMATION : `${REGISTRATION_URL}profiles/update_user_data`,
    //UPDATE_ADDRESS : `${REGISTRATION_URL}profiles/update_user_address`,
    UPDATE_CONTACT : `${REGISTRATION_URL}profiles/update_user_contact`,
    UPDATE_VEHICLE : `${REGISTRATION_URL}profiles/update_user_vehicle`,
    QUESTIONS : WELLNESS_URL + 'api/assessment_questions',
    SUBMIT_ASSESSMENT :  WELLNESS_URL + 'api/user_assessment_answers',
    TRIGGER_ASSESSMENT : WELLNESS_URL + 'api/assessments',
    
    //new API's
    CREATE_USER : `${REGISTRATION_URL}api/users/sign_in`,
    CREATE_ADDRESS : `${REGISTRATION_URL}api/address`,
    CREATE_EVENT_RESERVATION : `${REGISTRATION_URL}api/reservations`,

    UPDATE_PEOPLE : `${REGISTRATION_URL}api/people`,
    UPDATE_PHONE : `${REGISTRATION_URL}api/phones`,
    UPDATE_EMAIL : `${REGISTRATION_URL}api/emails`,
    UPDATE_ADDRESS : `${REGISTRATION_URL}api/addresses`,

    GET_ADDRESS : `${REGISTRATION_URL}api/addresses`,
    GET_USER_DETAILS : `${REGISTRATION_URL}api/users/sign_in`,
    GET_PEOPLE : `${REGISTRATION_URL}api/people`,
    GET_PHONE : `${REGISTRATION_URL}api/phones`,
    GET_EMAIL : `${REGISTRATION_URL}api/emails`,
    GET_EVENT_RESERVATION : `${REGISTRATION_URL}api/reservations`,
    
};

export const RENDER_URL = {
  ROOT_URL: '/',
  EVENT_LIST_URL: '/events/list/:zipCode/:distance?/:serviceCat?',
  REGISTRATION_EVENT_DETAILS_URL: '/register/event',
  ADD_FAMILY_URL: '/family/create',
  SIGN_IN: '/family/sign-in',
  EDIT_FAMILY_URL: '/family/edit',
  FRESHTRAK_ABOUT: '/freshtrak-about',
  REGISTRATION_FORM_URL: '/register/form',
  REGISTRATION_CONFIRM_URL: '/register/confirm',
  AGENCY_EVENT_LIST: '/agency/events',
  HOME_URL: '/home',
  QRCODE_URL: '/qrcode',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  PROFILE_URL: '/profile',
};
