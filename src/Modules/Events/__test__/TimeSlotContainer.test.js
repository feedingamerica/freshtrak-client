import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, wait } from '@testing-library/react';
import TimeSlotContainer from '../TimeSlotContainer';

import { preformattedEventData } from '../../../Testing';

test('should load without errors', () => {
  expect(() => {
    render(
      <Router>
        <TimeSlotContainer location={{ state: '' }} />
      </Router>
    );
  }).not.toThrowError();
});

test('should render the TimeSlotContainer', () => {
  expect(() => {
    render(
      <Router>
        <TimeSlotContainer location= {{ state: '' }}/>
      </Router>
    );
  }).not.toThrowError();
});