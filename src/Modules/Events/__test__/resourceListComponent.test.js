import React from 'react';
import ResourceListComponent from '../ResourceListComponent';
import { mockFoodBank, renderWithRouter } from '../../../Testing';

test(`should say 'No Food Banks found within the zip code' if none are present`, () => {
  const { getByText } = renderWithRouter(
    <ResourceListComponent dataToChild={{ foodbanks: [] }} />
  );
  getByText(/No Food Banks found within the zip code/i);
});

test(`should say 'Your Local Food Bank' if only 1 food bank is present`, () => {
  const { getByText } = renderWithRouter(
    <ResourceListComponent dataToChild={{ foodbanks: [mockFoodBank] }} />
  );
  getByText(/your local food bank/i);
});

test(`should say 'Your Local Food Banks' if more than 1 is present`, () => {
  const { getByText } = renderWithRouter(
    <ResourceListComponent
      dataToChild={{ foodbanks: [mockFoodBank, mockFoodBank] }}
    />
  );
  getByText(/your local food banks/i);
});
