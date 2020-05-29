import { build, fake ,oneOf} from 'test-data-bot';

const mockFoodBankBuilder = build('Food Bank').fields({
  address: fake(f => f.address.streetAddress()),
  city: fake(f => f.address.city()),
  state: fake(f => f.address.state()),
  zip: fake(f => f.address.zipCode()),
  name: fake(f => f.random.word()),
  nickname: fake(f => f.random.word()),
  display_url: fake(f => f.internet.url()),
  fb_agency_locator_url: fake(f => f.internet.url()),
  fb_url: fake(f => f.internet.url()),
  fb_fano_url: fake(f => f.internet.url()),
});

export const mockFoodBank = mockFoodBankBuilder();

export const mockFoodBankRegisterBuilder = build('Register').fields({
  orgName: fake(f => f.company.companyName()),
  streetAddress: fake(f => f.address.streetAddress()),
  zipCode: fake(f => f.random.number({ 'min': 11111, 'max': 99999 })),
  suiteBlg: fake(f => f.random.word()),
});

export const mockFoodBankContactBuilder = build('ContactInfo').fields({
  firstName: fake(f => f.name.firstName()),
  lastName: fake(f => f.name.lastName()),
  suffx: oneOf('Jr','Sr'),
  phoneNumber: fake(f => f.phone.phoneNumber()),
  contactEmail: fake(f => f.internet.email()),
  commPreference: oneOf('Phone','Email')
});