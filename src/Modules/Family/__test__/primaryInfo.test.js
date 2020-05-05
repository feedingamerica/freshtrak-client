import React from 'react';

import { render,fireEvent,wait,waitForElement } from '@testing-library/react';
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

describe('PrimaryInfoFormComponent', () => {
  const {container,getByTestId,getByText} =  render(
        <PrimaryInfoFormComponent
          onSelectedChild={mockPrimaryInfoBuilder}
          onFormErrors={noop}
        />
      );
      const first_name = container.querySelector('input[name="first_name"]');
      const last_name = container.querySelector('input[name="last_name"]');
      const middle_name = container.querySelector('input[name="middle_name"]');
    it('should show validation errors',async ()=>{
       
     
        fireEvent.blur(last_name);
         await waitForElement(() =>{
            screen.getByTestId('last-name');
    } );
    expect(getByTestId('last-name')).toHaveTextContent('This fiasasdasded is required');
       
       

        // fireEvent.blur(middle_name);
        // waitFor(() =>{
        //     expect(getByTestId('middle-name')).toHaveTextContent('This fied is required');
        // });
    });

});
