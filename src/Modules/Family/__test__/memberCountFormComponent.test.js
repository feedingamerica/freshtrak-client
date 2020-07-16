import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import MemberCountFormComponent from '../MemberCountFormComponent';
import { preformattedEventData, noop, mockFamily } from '../../../Testing';

const mockStore = configureStore([]);

test('should render without error', () => {
  const store = mockStore({ event: { event: preformattedEventData } });
  expect(() => {
    render(
      <Provider store={store}>
        <MemberCountFormComponent register={noop} errors={noop} user={mockFamily} />
      </Provider>
    )
  }).not.toThrowError();
});

test('should not allow member count to go below zero', () => {

  const store = mockStore({ event: { event: preformattedEventData } });
  const history = createMemoryHistory({ initialEntries: [''] });
  const { getByTestId, getByLabelText } = render(
    <Provider store={store}>
      <Router history={history}>
        <MemberCountFormComponent register={noop} errors={noop} user={mockFamily} />
      </Router>
    </Provider>
  );
  const input = getByLabelText('Number of Seniors (' + preformattedEventData.seniorAge + '+)');
  expect(input.value).toEqual('0');
  fireEvent.click(
    getByTestId(/count_senior_dec/i)
  );
  expect(input.value).toEqual('0');
  fireEvent.click(
    getByTestId(/count_senior_inc/i)
  );
  expect(input.value).toEqual('1');
});
