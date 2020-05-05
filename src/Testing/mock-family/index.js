import { build, fake,oneOf } from 'test-data-bot';

export const mockHouseHoldBuilder = build('HouseHold').fields({
  streetAddress: fake(f => f.address.streetAddress()),
  aptNo: fake(f => f.random.number()),
  zip: fake(f => f.address.zipCode())
});
export const mockPasswordBuilder = build('Password').fields({
  password: fake(f => f.random.word())
});

export const mockPickUpBuilder = build('PickUp').fields({
  pickupInfo: fake(f => f.random.word()),
  pickupName: fake(f => f.random.word()),
  pickupNumberPlate: fake(f => f.random.number())
});
// console.log(fake(f=>f.date.past()).generate(1))
export const mockPrimaryInfoBuilder = build('Primary').fields({
  first_name: fake(f => f.name.firstName()),
  last_name: fake(f => f.name.lastName()),
  middle_name: fake(f => f.name.lastName()),
  suffix: oneOf('Jr','Sr'),
  dob: fake(f => f.date.past()),
  hoh: fake(f => f.random.word()),
  phoneNumber: fake(f => f.random.number()),
  phoneNumberCheckBOx: oneOf('Yes','No'),
  email: fake(f => f.internet.email()),
  communicationPreference: fake(f => f.random.word())
});