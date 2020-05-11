import { build, fake,oneOf } from 'test-data-bot';

export const mockHouseHoldBuilder = build('HouseHold').fields({
  streetAddress: fake(f => f.address.streetAddress()),
  aptNo: fake(f => f.random.number()),
  zip: fake(f => f.address.zipCode())
});
export const mockPasswordBuilder = build('Password').fields({
  password: fake(f => f.random.word()).generate(1)
});

export const mockPickUpBuilder = build('PickUp').fields({
  pickupInfo: fake(f => f.random.word()).generate(1),
  pickupName: fake(f => f.random.word()).generate(1),
  pickupNumberPlate: fake(f => f.random.number()).generate(1)
});
// console.log(fake(f=>f.date.past()).generate(1))
export const mockPrimaryInfoBuilder = build('Primary').fields({
  first_name: fake(f => f.name.firstName()).generate(1),
  last_name: fake(f => f.name.lastName()).generate(1),
  middle_name: fake(f => f.name.lastName()).generate(1),
  suffix: oneOf('Jr','Sr').generate(1),
  dob: fake(f => f.date.past()).generate(1),
  hoh: fake(f => f.random.word()).generate(1),
  phoneNumber: fake(f => f.random.number()).generate(1),
  phoneNumberCheckBOx: oneOf('Yes','No').generate(1),
  email: fake(f => f.internet.email()).generate(1),
  communicationPreference: fake(f => f.random.word()).generate(1)
});


export const mockMemberCountBuilder = build('Household').fields({

    countSenior: fake(f => f.random.number()).generate(1),
    countMiddle: fake(f => f.random.number()).generate(1),
    countJunior: fake(f => f.random.number()).generate(1),

});