import React from 'react';
import {
  renderWithRouter,
  mockGuestRegistrationResponse,
  mockFamily,
  mockEventDate,
  mockEventSlot,
} from '../../../Testing';
import { render, wait, act, fireEvent } from '@testing-library/react';
import RegistrationContainer from '../RegistrationContainer';
import axios from 'axios';
import {
  mockPersonResponse,
  mockAddressResponse,
  mockUserResponse,
  mockPhoneResponse,
  mockEmailResponse,
  mockReservationResponse,
  mockSignInResponse
} from '../../../Testing/mock-registration';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

jest.mock('axios');
const mockStore = configureStore([]);
const store = mockStore({});

const route = '/events/register/123';
const path = '/events/register/:eventId';

/*** Mock Google Maps JavaScript API ***/
jest.mock("react-places-autocomplete", () => {
  const React = require("react"); // eslint-disable-line
  class PlacesAutocomplete extends React.Component {
    renderProps = {
      getInputProps: jest.fn(),
      suggestions: [],
      getSuggestionItemProps: jest.fn(),
    };

    render() {
      return <>{this.props.children(this.renderProps)}</>;
    }
  }

  return PlacesAutocomplete;
});

// test('should show the loading component until the user token is returned by api', async () => {
//   axios.post.mockImplementationOnce(() =>
//     Promise.resolve({ data: { ...mockGuestRegistrationResponse } })
//   );
//   axios.get.mockImplementationOnce(() =>
//     Promise.resolve({ data: { ...mockFamily } })
//   );
//   const location = {
//     state: {
//       eventDateId: mockEventDate.id,
//       eventSlotId: mockEventSlot.event_slot_id,
//     },
//   };
//   const {
//     getByTestId,
//     // getByLabelText,
//     queryByTestId,
//   } = renderWithRouter(<RegistrationContainer location={location} />, {
//     route,
//     path,
//   });
//   // getByTestId('spinning component');
//   // await wait(() => {
//   //   expect(queryByTestId('spinning component')).toBeNull();
//     // const input = getByLabelText(/first name/i);
//     // expect(input.value).toEqual(mockFamily.first_name);
//   });
// });

test('should register user for event', async () => {
  axios.post.mockImplementation(url => {
    switch (url) {
      case 'undefinedguest_authentications':
        return Promise.resolve({ data: { ...mockGuestRegistrationResponse } });
      default:
        return Promise.resolve();
    }
  });

  axios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { ...mockFamily, date_of_birth: '2020-05-20', state: 'OH' },
    })
  );

  // TO DO

  // const { getByTestId, getByLabelText } = renderWithRouter(<RegistrationContainer />, { route, path });
  // await wait(async () => {
  //   const input = getByLabelText(/first name/i);
  //   expect(input.value).toEqual(mockFamily.first_name);

  // });
  // await act(async () => {
  //   fireEvent.click(getByTestId(/continue button/i));
  // });
  // getByTestId('success registration');
});





//get Person
test('get Person api success',async ()=> {
  let responseData = {mockPersonResponse,status :200};
  let status = responseData.status; 
  const getPersonDetails = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve(responseData)
    })
  })
  await getPersonDetails().then(data => {
    expect(responseData.status).toEqual(status)
  })

})

test('get Person api call failed',async ()=> {
  let responseData = {mockPersonResponse,status :500};
  let status = responseData.status;
  const getPersonDetails = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject(new Error('api call failed'));
    })
  })
  await getPersonDetails().then(data => {
    expect(responseData.status).toEqual(status)
  }).catch(err=> {
    expect(err.message).toEqual('api call failed')
  })
})




//get User 
test('get User api success',async ()=> {
  let responseData = {mockUserResponse,status :200};
  let status = responseData.status; 
  const getUserDetails = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve(responseData)
    })
  })
  await getUserDetails().then(data => {
    expect(responseData.status).toEqual(status)
  })

})

test('get User api call failed',async ()=> {
  let responseData = {mockUserResponse,status :500};
  let status = responseData.status;
  const getUserDetails = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject(new Error('api call failed'));
    })
  })
  await getUserDetails().then(data => {
    expect(responseData.status).toEqual(status)
  }).catch(err=> {
    expect(err.message).toEqual('api call failed')
  })
})



//get Address
test('get Address api success',async ()=> {
  let responseData = {mockAddressResponse,status :200};
  let status = responseData.status; 
  const getAddressDetails = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve(responseData)
    })
  })
  await getAddressDetails().then(data => {
    expect(responseData.status).toEqual(status)
  })

})

test('get Address api call failed',async ()=> {
  let responseData = {mockAddressResponse,status :500};
  let status = responseData.status; 
  const getAddressDetails = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject(new Error('api call failed'));
    })
  })
  await getAddressDetails().then(data => {
    expect(responseData.status).toEqual(status)
  }).catch(err=> {
    expect(err.message).toEqual('api call failed')
  })
})

//get Phone
test('get Phone api success',async ()=> {
  let responseData = {mockPhoneResponse,status :200};
  let status = responseData.status; 
  const getPhoneDetails = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve(responseData)
    })
  })
  await getPhoneDetails().then(data => {
    expect(responseData.status).toEqual(status)
  })

})

test('get Phone api call failed',async ()=> {
  let responseData = {mockPhoneResponse,status :500};
  let status = responseData.status; 
  const getPhoneDetails = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject(new Error('api call failed'));
    })
  })
  await getPhoneDetails().then(data => {
    expect(responseData.status).toEqual(status)
  }).catch(err=> {
    expect(err.message).toEqual('api call failed')
  })
})


//get Email
test('get Email api success',async ()=> {
  let responseData = {mockEmailResponse,status :200};
  let status = responseData.status; 
  const getEmailDetails = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve(responseData)
    })
  })
  await getEmailDetails().then(data => {
    expect(responseData.status).toEqual(status)
  })

})

test('get Email api call failed',async ()=> {
  let responseData = {mockEmailResponse,status :500};
  let status = responseData.status; 
  const getEmailDetails = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject(new Error('api call failed'));
    })
  })
  await getEmailDetails().then(data => {
    expect(responseData.status).toEqual(status)
  }).catch(err=> {
    expect(err.message).toEqual('api call failed')
  })
})


//Create
//POST Reservation
test('POST Reservation api success',async ()=> {
  let responseData = {mockReservationResponse,status :201};
  let status = responseData.status; 
  const createReservationResponse = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve(responseData)
    })
  })
  await createReservationResponse().then(data => {
    expect(responseData.status).toEqual(status)
  })

})

test('POST Reservation api call failed',async ()=> {
  let responseData = {mockReservationResponse,status :500};
  let status = responseData.status; 
  const createReservationResponse = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject(new Error('api call failed'));
    })
  })
  await createReservationResponse().then(data => {
    expect(responseData.status).toEqual(status)
  }).catch(err=> {
    expect(err.message).toEqual('api call failed')
  })
})


//sign_in
test('POST sign_in api success',async ()=> {
  let responseData = {mockSignInResponse,status :200};
  let status = responseData.status; 
  const createSignInResponse = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve(responseData)
    })
  })
  await createSignInResponse().then(data => {
    expect(responseData.status).toEqual(status)
  })

})

test('POST sign_in api call failed',async ()=> {
  let responseData = {mockSignInResponse,status :500};
  let status = responseData.status; 
  const createSignInResponse = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject(new Error('api call failed'));
    })
  })
  await createSignInResponse().then(data => {
    expect(responseData.status).toEqual(status)
  }).catch(err=> {
    expect(err.message).toEqual('api call failed')
  })
})








//Update

//post Email
test('POST Email api success',async ()=> {
  let responseData = {mockEmailResponse,status :200};
  let status = responseData.status; 
  const updateEmailResponse = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve(responseData)
    })
  })
  await updateEmailResponse().then(data => {
    expect(responseData.status).toEqual(status)
  })

})

test('POST Email api call failed',async ()=> {
  let responseData = {mockEmailResponse,status :500};
  let status = responseData.status; 
  const updateEmailResponse = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject(new Error('api call failed'));
    })
  })
  await updateEmailResponse().then(data => {
    expect(responseData.status).toEqual(status)
  }).catch(err=> {
    expect(err.message).toEqual('api call failed')
  })
})

//person
test('POST Person api success',async ()=> {
  let responseData = {mockPersonResponse,status :200};
  let status = responseData.status; 
  const updatePersonResponse = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve(responseData)
    })
  })
  await updatePersonResponse().then(data => {
    expect(responseData.status).toEqual(status)
  })

})

test('POST Person api call failed',async ()=> {
  let responseData = {mockPersonResponse,status :500};
  let status = responseData.status; 
  const updatePersonResponse = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject(new Error('api call failed'));
    })
  })
  await updatePersonResponse().then(data => {
    expect(responseData.status).toEqual(status)
  }).catch(err=> {
    expect(err.message).toEqual('api call failed')
  })
})

//address
test('POST address api success',async ()=> {
  let responseData = {mockAddressResponse,status :200};
  let status = responseData.status; 
  const updateAddressResponse = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve(responseData)
    })
  })
  await updateAddressResponse().then(data => {
    expect(responseData.status).toEqual(status)
  })

})

test('POST address api call failed',async ()=> {
  let responseData = {mockAddressResponse,status :500};
  let status = responseData.status; 
  const updateAddressResponse = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject(new Error('api call failed'));
    })
  })
  await updateAddressResponse().then(data => {
    expect(responseData.status).toEqual(status)
  }).catch(err=> {
    expect(err.message).toEqual('api call failed')
  })
})

//phone
test('POST phone api success',async ()=> {
  let responseData = {mockPhoneResponse,status :200};
  let status = responseData.status; 
  const updatePhoneResponse = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve(responseData)
    })
  })
  await updatePhoneResponse().then(data => {
    expect(responseData.status).toEqual(status)
  })

})

test('POST phone api call failed',async ()=> {
  let responseData = {mockPhoneResponse,status :500};
  let status = responseData.status; 
  const updatePhoneResponse = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject(new Error('api call failed'));
    })
  })
  await updatePhoneResponse().then(data => {
    expect(responseData.status).toEqual(status)
  }).catch(err=> {
    expect(err.message).toEqual('api call failed')
  })
})
