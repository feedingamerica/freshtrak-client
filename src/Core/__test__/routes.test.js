import React, { Suspense } from "react";

import { RENDER_URL } from "../../Utils/Urls";
import { render, fireEvent, wait, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WrapperComponent from "../../Modules/General/WrapperComponent";
import { createMemoryHistory } from "history";
import { act } from "react-dom/test-utils";
import Routes from "../Routes";
import { MemoryRouter } from "react-router";
import DashBoardContainer from "../../Modules/Dashboard/DashBoardContainer";

import { Router, Switch, Route, Redirect } from "react-router-dom";
import StaticPageContainer from "../../Modules/StaticPages/StaticPageContainer";
import EventContainer from "../../Modules/Events/EventContainer";

const history = createMemoryHistory();

const getRoutes = (initialRoute) => {
  return render(
    <MemoryRouter initialEntries={[`${initialRoute}`]}>
      <Router basename="/" history={history}>
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
                path={"*"}
                render={(props) => <Redirect to="/" {...props} />}
              />

              {/* Add URLs above this line */}
            </Switch>
          </WrapperComponent>
        </Suspense>
      </Router>
    </MemoryRouter>
  );
};

test("should be able to route to freshtrak-working and freshtrak-about", async () => {
  const { container, getByTestId, getByText } = getRoutes("/");

  expect(container.innerHTML).toMatch(/We’re here to help!/i);

  act(() => {
    fireEvent.click(getByText("Working with FreshTrak"));
  });
  expect(container.innerHTML).toMatch(/Partners in Ending Hunger/i);
  act(() => {
    fireEvent.click(getByTestId("back-btn"));
  });
  expect(container.innerHTML).toMatch(/We’re here to help!/i);
  act(() => {
    fireEvent.click(getByTestId("about"));
  });
  expect(container.innerHTML).toMatch(/Taking Our Community Online/i);
});

test("should show dashboard by default", async () => {
  history.push("/");
  const { container, getByText } = getRoutes("/");

  expect(container.innerHTML).toMatch(/We’re here to help!/i);
});
