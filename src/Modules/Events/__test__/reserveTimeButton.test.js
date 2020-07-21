import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ReserveTimeButton from '../ReserveTimeButton';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mockEventDate, mockEventHour, mockEventSlot, renderWithRouter } from "../../../Testing";

jest.mock('axios');

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
  expect(() => {
    render(
      <Provider store={store}>
        <ReserveTimeButton event={mockEventSlot} />
      </Provider>
    );
  }).not.toThrowError();
});

test('Successful api call', async () => {
  const store = mockStore({ event: { event: mockEventSlot } });
  const successResponse = {
    data: { ...mockEventDate, event_hours: [{ ...mockEventHour, event_slots: [{ ...mockEventSlot }] }] }
  }
  axios.get.mockImplementation(() => Promise.resolve(successResponse));
  const { getByText } = render(
    <Provider store={store}>
      <Router>
        <ReserveTimeButton event={mockEventSlot} />
      </Router>
    </Provider>
  );
  const button = getByText('Reserve Time')
  fireEvent.click(button);
});
