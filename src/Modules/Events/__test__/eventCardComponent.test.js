import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '../../../Testing/mock-provider'
import EventCardComponent from '../EventCardComponent';
import { preformattedEventData } from '../../../Testing';

test('should display the events', () => {
  const { getByText } = render(
      <MemoryRouter initialEntries={['/events/list']}>
        <EventCardComponent event={preformattedEventData}/>
      </MemoryRouter>
  );
  getByText(preformattedEventData.agencyName);
  getByText(preformattedEventData.eventName);
  getByText(preformattedEventData.eventService);
});
