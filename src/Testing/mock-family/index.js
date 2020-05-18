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

export const mockMemberCountBuilder = build('Household').fields({
    countSenior: fake(f => f.random.number()).generate(1),
    countMiddle: fake(f => f.random.number()).generate(1),
    countJunior: fake(f => f.random.number()).generate(1)
});

export const mockPasswordBuilder = build('Password').fields({
    password: fake(f => f.internet.password()),
    confirmpassword: fake(f => f.internet.password())
});

export const mockPickUpBuilder = build('PickUp').fields({
    pickupType:oneOf('Me','Some one Else'),
    pickupName: fake(f => f.name.firstName()),
    pickupNumberPlate: oneOf('KL-01-1995','EL-69-3222','GL-02-1010','ML-55-8855','YZ-69-3222','WY-07-8810'),
    pickupNumberPlate2: oneOf('KL-11-4444','EL-69-4446','GL-02-9977','ML-55-1234','YZ-69-0987','WY-07-9944')
});
