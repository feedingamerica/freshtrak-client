import React from 'react';

import { render,fireEvent,wait } from '@testing-library/react';
import {screen} from '@testing-library/dom';
import PrimaryInfoFormComponent from '../PrimaryInfoFormComponent';
import { noop,mockPrimaryInfoBuilder } from '../../../Testing';

test('should render', () => {
  expect(() => {
    render(
      <PrimaryInfoFormComponent
        onSelectedChild={noop}
        onFormErrors={noop}
      />
    );
  }).not.toThrowError();
});

// test('should render PrimaryInfoFormComponent with data provided',()=>{
//     expect(() => {
//         render(
//           <PrimaryInfoFormComponent
//             onSelectedChild={mockPrimaryInfoBuilder}
//             onFormErrors={noop}
//           />
//         );
//       }).not.toThrowError();
// });

// describe('PrimaryInfoFormComponent', () => {
//   const {container,getByTestId,getByText} =  render(
//         <PrimaryInfoFormComponent
//           onSelectedChild={mockPrimaryInfoBuilder}
//           onFormErrors={noop}
//         />
//       );
//       const first_name = container.querySelector('input[name="first_name"]');
//       const last_name = container.querySelector('input[name="last_name"]');
//       const middle_name = container.querySelector('input[name="middle_name"]');
//     it('should show validation errors',async ()=>{
       

test('should show validation errors',async ()=>{
 
  const {container,getByTestId,getByText} =  render(
    <PrimaryInfoFormComponent
      onSelectedChild={mockPrimaryInfoBuilder}
      onFormErrors={noop}
    />
  );
  const first_name = container.querySelector('input[name="first_name"]');
  const last_name = container.querySelector('input[name="last_name"]');
  const middle_name = container.querySelector('input[name="middle_name"]');

  const dob = container.querySelector('input[name="dob"]');
  fireEvent.blur(first_name);
  await wait(() =>{
      expect(getByTestId('first-name')).toHaveTextContent('This field is required');
  });
  fireEvent.blur(middle_name);
  await wait(() =>{
      expect(getByTestId('middle-name')).toHaveTextContent('This field is required');
  });
  fireEvent.blur(last_name);
  await wait(() =>{
      expect(getByTestId('last-name')).toHaveTextContent('This field is required');
  });
  fireEvent.blur(dob);
  await wait(() =>{
      expect(getByTestId('dob')).toHaveTextContent('This field is required');
  });

  // Validation testing still pending
});