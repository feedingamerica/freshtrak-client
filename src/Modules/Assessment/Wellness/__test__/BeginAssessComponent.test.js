import React from 'react';
import { render } from '@testing-library/react';
import BeginAssessComponent from '../BeginAssessComponent';


test('should display the events', () => {
    const { getByText } = render(<BeginAssessComponent />);
  });