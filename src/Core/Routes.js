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
const RegistrationContainer = lazy(() => import('../Modules/Family/RegistrationContainer'));
// const FamilyContainer = lazy(() => import("../Modules/Family/FamilyContainer"));
// Out of scope
// const EditFamilyContainer = lazy(() => import('../Modules/Family/EditFamilyContainer'));
// const SignInContainer = lazy(() => import('../Modules/Sign-In/SignInContainer'));

const Routes = () => {
  React.useEffect(() => {}, []);

  return (
    <Router basename="/">
      <Suspense fallback={<div className="displayNone"> </div>}>
        <WrapperComponent>
          <Switch>
            <Route
              exact
              path={RENDER_URL.HOME_URL}
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

            {/* Out of Scope */}
            {/* <Route
              exact path={RENDER_URL.EDIT_FAMILY_URL}
              component={EditFamilyContainer}
            />

            <Route
              exact path={RENDER_URL.SIGN_IN}
              component={SignInContainer}
            /> */}
            <Route
              path={RENDER_URL.FRESHTRAK_WORKING}
              component={StaticPageContainer}
            />
            <Route
              path={RENDER_URL.FRESHTRAK_ABOUT}
              component={StaticPageContainer}
            />

            <Route
              path={`${RENDER_URL.EVENT_REGISTRATION_URL}/:eventDateId/:eventSlotId?`}
              component={RegistrationContainer}
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
