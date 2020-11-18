import React from 'react';
import { render } from '@testing-library/react';
import CheckboxQstnComponent from '../CheckboxQstnComponent';



test('should display the events', () => {
    const { getByText } = render(<CheckboxQstnComponent />);
  });