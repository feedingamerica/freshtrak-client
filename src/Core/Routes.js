//routing files
import React, { lazy, Suspense } from "react";
import { RENDER_URL } from "../Utils/Urls";
import "../Assets/scss/main.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ScrollContainer from "./ScrollContainer";
const DashBoardContainer = lazy(() =>
  import("../Modules/Dashboard/DashBoardContainer")
);
const EventContainer = lazy(() => import("../Modules/Events/EventContainer"));
const WrapperComponent = lazy(() =>
  import("../Modules/General/WrapperComponent")
);
const FamilyContainer = lazy(() => import("../Modules/Family/FamilyContainer"));
// Out of scope
// const EditFamilyContainer = lazy(() => import('../Modules/Family/EditFamilyContainer'));
// const SignInContainer = lazy(() => import('../Modules/Sign-In/SignInContainer'));

const StaticPageContainer = lazy(() =>
  import("../Modules/StaticPages/StaticPageContainer")
);
const RegistrationContainer = lazy(() => import('../Modules/Registration/RegistrationContainer'));
// const FamilyContainer = lazy(() => import("../Modules/Family/FamilyContainer"));
// Out of scope
// const EditFamilyContainer = lazy(() => import('../Modules/Family/EditFamilyContainer'));
// const SignInContainer = lazy(() => import('../Modules/Sign-In/SignInContainer'));
const AgencyEventListContainer = lazy(() => import('../Modules/Events/AgencyEventListContainer'));
const RegistrationEventDetailsContainer = lazy(() => import('../Modules/Registration/RegistrationEventDetailsContainer'));
const RegistrationConfirmComponent = lazy(() => import('../Modules/Registration/RegistrationConfirmComponent'));
const HomeContainer = lazy(() => import('../Modules/Home/HomeContainer'));
const QRCodeComponent = lazy(() => import('../Modules/Registration/QRCodeComponent'));
const PrivacyComponent = lazy(() => import('../Modules/Policies/PrivacyComponent'));
const TermsComponent = lazy(() => import('../Modules/Policies/TermsComponent'));
const ProfileContainer = lazy(() => import("../Modules/Profile/ProfileContainer"));

const Routes = () => {
  React.useEffect(() => {}, []);

  return (
    <Router basename="/">
      <ScrollContainer />
      <Suspense fallback={<div className="displayNone"> </div>}>
        <WrapperComponent>
          <Switch>
            <Route
              exact
              path={RENDER_URL.ROOT_URL}
              component={DashBoardContainer}
            />
            <Route
              exact
              path={RENDER_URL.EVENT_LIST_URL}
              component={EventContainer}
            />
            <Route
              exact path={RENDER_URL.ADD_FAMILY_URL}
              component={FamilyContainer}
            />
            {/* Flag to turn off/on Home Page Container for Loggedin user feature */}
            <Route
              exact path={RENDER_URL.HOME_URL}
              component={HomeContainer}
            />

            {/* Out of Scope */}
            {/* <Route
              exact path={RENDER_URL.EDIT_FAMILY_URL}
              component={EditFamilyContainer}
            />

            <Route
              exact path={RENDER_URL.SIGN_IN}
              component={SignInContainer}
            /> */}

            {/* Out of Scope - redirection chnaged to Freshtrak Partners*/}
            {/* <Route
              path={RENDER_URL.FRESHTRAK_WORKING}
              component={StaticPageContainer}
            /> */}
            <Route
              path={RENDER_URL.FRESHTRAK_ABOUT}
              component={StaticPageContainer}
            />

            <Route
              path={`${RENDER_URL.REGISTRATION_EVENT_DETAILS_URL}/:id`}
              component={RegistrationEventDetailsContainer}
            />

             <Route exact
              path={`${RENDER_URL.REGISTRATION_FORM_URL}/:eventDateId`}
              component={RegistrationContainer}
            />

            <Route
              path={`${RENDER_URL.REGISTRATION_FORM_URL}/:eventDateId/:eventSlotId`}
              component={RegistrationContainer}
            />

            <Route
              path={`${RENDER_URL.REGISTRATION_CONFIRM_URL}`}
              component={RegistrationConfirmComponent}
            />

            <Route
              path={`${RENDER_URL.QRCODE_URL}/:code`}
              component={QRCodeComponent}
            />  

            <Route
              path={`${RENDER_URL.PRIVACY}`}
              component={PrivacyComponent}
            />

             <Route
              path={`${RENDER_URL.TERMS}`}
              component={TermsComponent}
            />  

            <Route
              path={`${RENDER_URL.AGENCY_EVENT_LIST}/:agencyId`}
              component={AgencyEventListContainer}
            />
            
            <Route 
                path={RENDER_URL.PROFILE_URL} 
                component={ProfileContainer} 
            />
            {/* Out of Scope */}
            {/* <Route
              exact path={RENDER_URL.ADD_FAMILY_URL}
              component={FamilyContainer}
            />

            <Route
              exact path={RENDER_URL.EDIT_FAMILY_URL}
              component={EditFamilyContainer}
            />

            <Route
              exact path={RENDER_URL.SIGN_IN}
              component={SignInContainer}
            /> */}

            <Route
              path={"*"}
              render={(props) => <Redirect to="/" {...props} />}
            />

            {/* Add URLs above this line */}
          </Switch>
        </WrapperComponent>
      </Suspense>
    </Router>
  );
};
export default Routes;
