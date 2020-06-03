/**
 * API and Render url defined
 */

export const BASE_URL = process.env.REACT_APP_PANTRY_FINDER_API
const REGISTRATION_URL = process.env.REACT_APP_REGISTRATION_API;
export const API_URL = {
    EVENTS_LIST : BASE_URL + 'api/agencies',
    FOODBANK_LIST : BASE_URL + 'api/foodbanks',
    EVENT_URL : BASE_URL + 'api/events',
    EVENT_DATES_URL : BASE_URL + 'api/event_dates',
    GUEST_AUTH: `${REGISTRATION_URL}guest_authentications`,
    GUEST_USER: `${REGISTRATION_URL}api/user`,
    CREATE_RESERVATION: `${REGISTRATION_URL}api/reservations`,
};

export const RENDER_URL = {
    HOME_URL: '/',
    EVENT_LIST_URL:'/events/list',
    ADD_FAMILY_URL: '/family/create',
    SIGN_IN: '/family/sign-in',
    EDIT_FAMILY_URL: '/family/edit',
    FRESHTRAK_WORKING:'/freshtrak-working',
    FRESHTRAK_ABOUT:'/freshtrak-about',
    EVENT_REGISTRATION_URL: '/events/register',
};
