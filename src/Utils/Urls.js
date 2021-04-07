/**
 * API and Render url defined
 */

export const BASE_URL = process.env.REACT_APP_PANTRY_FINDER_API;
const REGISTRATION_URL = process.env.REACT_APP_REGISTRATION_API;
const LOCAL_URL = "http://192.168.20.253:8888/api/";
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
    USER_INFORMATION : `${LOCAL_URL}profiles/user_data`,
    USER_ADDRESS : `${LOCAL_URL}profiles/user_address`,
    USER_CONTACT : `${LOCAL_URL}profiles/user_contact_details`,
    USER_VEHICLE : `${LOCAL_URL}profiles/user_vehicle_details`,
    
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
  WELLNESS_ASSESS_URL: '/assessment/wellness',
  PROFILE_URL: '/profile',
  QRCODE_URL: '/qrcode',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  QUESTIONS : "http://192.168.21.50:8888/api/assessment_questions",
  SUBMIT_ASSESSMENT : "http://localhost:8888/api/user_assessment_answers",
  TRIGGER_ASSESSMENT : "http://localhost:8888/api/assessments",
};
