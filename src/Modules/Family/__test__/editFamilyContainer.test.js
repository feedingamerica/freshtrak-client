import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import EditFamilyContainer from '../EditFamilyContainer';

test('should render without errors', () => {
  expect(() => {
    render(
      <Router>
        <EditFamilyContainer />
      </Router>
    );
  }).not.toThrowError();
});

test('should show loading till fake data comes', async () => {
  const { getByTestId } = render(
    <Router>
      <EditFamilyContainer />
    </Router>
  );

  getByTestId(/spinning component/i);
});
