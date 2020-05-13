import { build, fake,oneOf } from 'test-data-bot';

export const mockHouseHold = build('HouseHold').fields({
    streetAddress: fake(f => f.address.streetAddress()),
    aptNo: String(fake(f => f.random.number())),
    zip: fake(f => f.address.zipCode()),
    housingType:oneOf('Apartment','Mobile home or house trailer', 'Military housing','Student housing','Temporary','Prefer not to answer')
});

export const mockPassword = build('Password').fields({
    password: fake(f => f.random.word())
});

export const mockPickUp = build('PickUp').fields({
    pickupInfo: fake(f => f.random.word()),
    pickupType:oneOf('Me','Some one Else'),
    pickupName: fake(f => f.name.firstName()),
    pickupNumberPlate: fake(f => f.random.number())
});

const mockPrimary = build('Primary').fields({
    firstName: fake(f => f.name.firstName()),
    lastName: fake(f => f.name.lastName()),
    middleName: fake(f => f.name.lastName()),
    suffix: oneOf('Jr','Sr'),
    dob: fake(f => f.date.past()),
    hoh: oneOf('Yes','No'),
    phoneNumber: fake(f => f.random.number()),
    phoneNumberCheckBOx: oneOf('Yes','No'),
    email: fake(f => f.internet.email()),
    comPref:oneOf('Email','Phone')
});

export const mockMemberCountBuilder = build('Household').fields({
    countSenior: fake(f => f.random.number()).generate(1),
    countMiddle: fake(f => f.random.number()).generate(1),
    countJunior: fake(f => f.random.number()).generate(1)
});

export const mockPrimaryInfoBuilder = mockPrimary();
export const mockPickUpBuilder = mockPickUp();
export const mockHouseHoldBuilder = mockHouseHold();
export const mockPasswordBuilder = mockPassword();