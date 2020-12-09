import React from 'react';
import { render } from '@testing-library/react';
import PrimaryInfoFormComponent from '../PrimaryInfoFormComponent';
import { noop } from '../../../Testing';

test('should render without error', () => {
  expect(() => {
    render(<PrimaryInfoFormComponent register={noop} errors={noop} getValues={noop} setValue={noop} watch={noop} />);
  }).not.toThrowError();
});
