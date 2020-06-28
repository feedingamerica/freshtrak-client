import React from 'react';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../Store/store'

// test utils file
export function renderWithRouter(
  ui,
  {
    route = '/',
    path = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  const Wrapper = ({ children }) => (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Provider store={store}>
      <Router history={history}>
        <Route path={path}>{children}</Route>
      </Router>
    </Provider>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}
