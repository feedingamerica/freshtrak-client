/**
 * API and Render url defined
 */

export const BASE_URL = process.env.REACT_APP_PANTRY_FINDER_API
const REGISTRATION_URL = process.env.REACT_APP_REGISTRATION_API;
export const API_URL = {
    EVENTS_LIST : BASE_URL + 'api/agencies',
    FOODBANK_LIST : BASE_URL + 'api/foodbanks',
    EVENT_URL : BASE_URL + 'events',
    GUEST_AUTH: `${REGISTRATION_URL}guest_authentications`,
};

export const RENDER_URL = {
    HOME_URL: '/',
    FRESHTRAK_WORKING:'/freshtrak-working',
    FRESHTRAK_ABOUT:'/freshtrak-about',
    EVENT_LIST_URL:'/events/list',
    EVENT_REGISTRATION_URL: '/events/register',
    ADD_FAMILY_URL: '/family/create',
    SIGN_IN: '/family/sign-in',
    EDIT_FAMILY_URL: '/family/edit',
};
