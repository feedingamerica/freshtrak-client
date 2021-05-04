import React from 'react';
import { render } from '@testing-library/react';
import { 
  mockProfileData
} from '../../../Testing/mock-profile';
import ProfileComponent from '../ProfileComponent';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);


test('ProfileComponent rendered without errors', () => {
  expect(() => {
    const store = mockStore({});
    render(
      <Provider store={store}>
      <ProfileComponent data={mockProfileData}/>
    </Provider>
    );
  }).not.toThrowError();
});