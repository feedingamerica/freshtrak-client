import React from "react";
import { wait, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import EventListContainer from "../EventListContainer";
import axios from "axios";
import {
  mockEvent,
  mockAgency,
  mockEventDate,
  mockForms,
} from "../../../Testing";
import { Provider } from "react-redux";

jest.mock("axios");

const mockStore = configureStore([]);
const store = mockStore({});

// Suppress the moment warning. This is a consequence of using test-data-bot
// and does not show in reality
const originalWarn = console.warn.bind(console.warn);
beforeAll(() => {
  console.warn = msg =>
    !msg.toString().includes("Deprecation warning") && originalWarn(msg);
});
afterAll(() => {
  console.warn = originalWarn;
});

test("should load without errors", () => {
  expect(() => {
    render(<EventListContainer searchData={{}} />);
  }).not.toThrowError();
});

test("Successful Api with no Events dates", async () => {
  const testAgencyWithNoEventDates = {
    ...mockAgency,
    events: [{ ...mockEvent }],
  };
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: { agencies: [testAgencyWithNoEventDates] } })
  );
  const { getByText } = render(<EventListContainer zipCode={mockAgency.zip} />);
  await wait(() => {
    getByText(/No Events Currently Scheduled/i);
  });
});

test("Successful Api with Events dates", async () => {
  const testAgencyWithEventDates = {
    ...mockAgency,
    events: [
      {
        ...mockEvent,
        event_dates: [{ ...mockEventDate }],
        forms: [{ ...mockForms }],
      },
    ],
  };
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: { agencies: [testAgencyWithEventDates] } })
  );
  const { getByText } = render(
    <Provider store={store}>
      <Router>
        <EventListContainer zipCode={mockAgency.zip} />
      </Router>
    </Provider>
  );
  await wait(() => {
    getByText(`${mockEvent.name}`);
  });
});
