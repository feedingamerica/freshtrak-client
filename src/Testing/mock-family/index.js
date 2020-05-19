import { build, fake,oneOf } from 'test-data-bot';

export const mockHouseHoldBuilder = build('HouseHold').fields({
    streetAddress: fake(f => f.address.streetAddress()),
    aptNo: fake(f => f.address.zipCode()),
    zip: fake(f => f.address.zipCode()),
    housingType:oneOf('Apartment','Mobile home or house trailer', 'Military housing','Student housing','Temporary','Prefer not to answer')
});

export const mockPasswordBuilder = build('Password').fields({
    password: fake(f => f.random.word()),
    confirmpassword:fake(f => f.random.word())
});

export const mockPickUpBuilder = build('PickUp').fields({
    pickupInfo: fake(f => f.random.word()),
    pickupType:oneOf('Me','Some one Else'),
    pickupName: fake(f => f.name.firstName()),
    pickupNumberPlate: fake(f => f.random.number()),
    pickupNumberPlate2:fake(f => f.random.number())
});

export const mockMemberCountBuilder = build('membercount').fields({
    countSenior: fake(f => f.random.number({ 'min': 0, 'max': 13 })),
    countAdult: fake(f => f.random.number({ 'min': 0, 'max': 13 })),
    countkids: fake(f => f.random.number({ 'min': 0, 'max': 13 }))
});

export const mockPrimaryInfoBuilder = build('Primary').fields({
    firstName: fake(f => f.name.firstName()),
    lastName: fake(f => f.name.lastName()),
    middleName: fake(f => f.name.lastName()),
    suffix: oneOf('Jr','Sr'),
    dob: oneOf('1990-12-12','1970-01-01','1983-06-01','1989-04-11'),
    hoh: oneOf('Yes','No'),
    phoneNumber: fake(f => f.phone.phoneNumber()),
    phoneNumberCheckBOx: oneOf('Yes','No'),
    email: fake(f => f.internet.email()),
    comPref:oneOf('Email','Phone')
});
