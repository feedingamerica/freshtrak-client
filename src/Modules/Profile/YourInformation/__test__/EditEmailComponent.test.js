import React from 'react';
import {
  mockProfileData
} from '../../../../Testing/mock-profile';
import { render, fireEvent, act } from '@testing-library/react';
import EditEmailComponent from '../EditEmailComponent';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { noop } from '../../../../Testing';
const mockStore = configureStore([]);
const store = mockStore({});
let emailData = [{
  contact_id: 9,
  created_at: "2021-07-05T04:53:11.235Z",
  email: "akhil125@yopmail.com",
  id: 4,
  is_primary: true,
  permission_to_email: false,
  updated_at: "2021-07-05T04:53:11.235Z"
}]
test('EditEmailComponent rendered without errors', () => {
  expect(() => {
    render(
      <Provider store={store}>
        <Router>
          <EditEmailComponent
            emails={emailData}
            tabClose={noop}
            refreshMainTab={noop}
            emailData={mockProfileData} />
        </Router>
      </Provider>

    );
  }).not.toThrowError();
});