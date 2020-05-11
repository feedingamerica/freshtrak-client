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

const WrapperComponent = lazy(() => import("../Modules/General/WrapperComponent"));
const FamilyContainer = lazy(() => import("../Modules/Family/FamilyContainer"));


const StaticPageContainer = lazy(() => import("../Modules/StaticPages/StaticPageContainer"));

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
              path={RENDER_URL.FRESHTRAK_WORKING}
              component={StaticPageContainer}
            />
            <Route
              path={RENDER_URL.FRESHTRAK_ABOUT}
              component={StaticPageContainer}
            />
            <Route
              exact
              path={RENDER_URL.ADD_FAMILY_URL}
              component={FamilyContainer}
            />

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
