import React from 'react';
import { render } from '@testing-library/react';
import EventSlotsModalComponent from '../EventSlotsModalComponent';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { mockEventSlot } from "../../../Testing";

const mockStore = configureStore([]);
// Suppress the moment warning. This is a consequence of using test-data-bot
// and does not show in reality 
const originalWarn = console.warn.bind(console.warn);
beforeAll(() => {
  console.warn = (msg) =>
    !msg.toString().includes('Deprecation warning') && originalWarn(msg)
});
afterAll(() => {
  console.warn = originalWarn
});

test('should load without errors', () => {
  const store = mockStore({ event: { event: mockEventSlot } });
  const history = createMemoryHistory({ initialEntries: [''] });
  expect(() => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <EventSlotsModalComponent event={mockEventSlot} />
        </Router>
      </Provider>
    );
  }).not.toThrowError();
});
