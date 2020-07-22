import React from 'react';
import { renderWithRouter, mockAgency } from '../../../Testing';

import AgencyEventListContainer from '../AgencyEventListContainer';

it('should have the agency id on the params', () => {
  const route = `/agency/events/${mockAgency.id}`;
  const path = '/agency/events/:agencyId';
  const location = {
    state: {
      agencyId: mockAgency.id,
    },
  };
  const { getByText } = renderWithRouter(
    <AgencyEventListContainer location={location} />,
    {
      route,
      path,
    }
  );
  getByText(`Agency Event List Container ${mockAgency.id}`);
});
