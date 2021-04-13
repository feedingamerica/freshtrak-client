import React from 'react';
import { render } from '@testing-library/react';
import ResourceCategoriesComponent from '../ResourceCategoriesComponent';


test('ResourceCategoriesComponent rendered without errors', () => {
  expect(() => {
    render(
        <ResourceCategoriesComponent/>
    );
  }).not.toThrowError();
});