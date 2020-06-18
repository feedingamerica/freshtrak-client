import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ReserveTimeButton from '../ReserveTimeButton';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { mockEventDate, mockEventHour, mockEventSlot, renderWithRouter } from "../../../Testing";

jest.mock('axios');

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
  expect(() => {
    renderWithRouter(<ReserveTimeButton />);
  }).not.toThrowError();
});

test('Successful api call', async () => {
  const successResponse = {
    data: { ...mockEventDate, event_hours: [{ ...mockEventHour, event_slots: [{ ...mockEventSlot }] }] }
  }
  axios.get.mockImplementation(() => Promise.resolve(successResponse));
  const { getByText } = render(
    <Router>
      <ReserveTimeButton event_date_id={mockEventSlot.event_slot_id} />
    </Router>
  );
  const button = getByText('Reserve Time')
  fireEvent.click(button);
});
