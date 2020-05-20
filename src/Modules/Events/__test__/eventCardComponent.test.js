import React from 'react';
import { render } from '@testing-library/react';
import EventCardComponent from '../EventCardComponent';
import { preformattedEventData } from '../../../Testing';
import {BrowserRouter as Router} from 'react-router-dom';

test('should display the events', () => {
  const { getByText } = render(<Router><EventCardComponent event={preformattedEventData}/></Router>);
  getByText(preformattedEventData.agencyName);
  getByText(preformattedEventData.eventName);
  getByText(preformattedEventData.eventService);
});
