import React from 'react';
import { render } from '@testing-library/react';
import SummaryTabComponent from '../SummaryTabComponent';
import ResourceCategoryComponent from '../ResourceCategoriesComponent';
import BadgesComponent from '../BadgesComponent';
import YourReservationsComponent from '../YourReservationsComponent';


test('SummaryTabComponent rendered without errors', () => {
  expect(() => {
    render(
        <SummaryTabComponent>
          <ResourceCategoryComponent/>
          <BadgesComponent/>
          <YourReservationsComponent/>
        </SummaryTabComponent>
    );
  }).not.toThrowError();
});