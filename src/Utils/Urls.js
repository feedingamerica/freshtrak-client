/**
 * API and Render url defined
 */

export const BASE_URL = process.env.REACT_APP_PANTRY_FINDER_API
export const API_URL = {
    EVENTS_LIST : BASE_URL + 'api/agencies',
    FOODBANK_LIST : BASE_URL + 'api/foodbanks',
    EVENT_URL : BASE_URL + 'events'
};

export const RENDER_URL = {
    HOME_URL: '/',
    EVENT_LIST_URL:'/events/list',
    ACCOUNT_OVERVIEW_URL:'/account',
    ACCOUNT_EDIT_URL:'/account/edit',
    ADD_FAMILY_URL:'/family/create',
    FRESHTRAK_WORKING:'/freshtrak-working',
    FRESHTRAK_ABOUT:'/freshtrak-about'
};
