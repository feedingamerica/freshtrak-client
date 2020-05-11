import { build, fake,oneOf } from 'test-data-bot';

export const mockHouseHoldBuilder = build('Household').fields({

    streetAddress:fake(f => f.address.streetAddress()),
    aptNo: fake(f => f.random.number()),
    zipCode:  fake(f => f.address.zipCode())


})

export const mockMemberCountBuilder = build('Household').fields({

    countSenior: fake(f => f.random.number()).generate(1),
    countMiddle: fake(f => f.random.number()).generate(1),
    countJunior: fake(f => f.random.number()).generate(1),

});