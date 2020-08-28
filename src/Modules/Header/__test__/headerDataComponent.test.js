import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { renderWithRouter } from '../../../Testing';
import HeaderDataComponent from '../HeaderDataComponent';
import { RENDER_URL } from '../../../Utils/Urls';

const mockStore = configureStore([]);

test('should render without errors', () => {
  expect(() => {
    renderWithRouter(<HeaderDataComponent />);
  }).not.toThrowError();
});

test(`should render 'Find food resources...' if location is not the event list url`, () => {
  const location = {
    pathname: RENDER_URL.EVENT_REGISTRATION_URL,
  };
  const { getByText, getByTestId } = renderWithRouter(
    <HeaderDataComponent location={location} />
  );
  getByText(/Find food resources in your neighborhood./i);
  getByTestId('subtext-on-header');
});

test(`should render 'Resource Events in zip...' if location is the event list url`, () => {
  const store = mockStore({ addressSearch: { zipCode: 43065 } });
  const { getByText } = renderWithRouter(
    <Provider store={store}>
      <HeaderDataComponent />
    </Provider>,
    {
      route: RENDER_URL.EVENT_LIST_URL,
    }
  );
  getByText(/resource events in zip code 43065/i);
});
