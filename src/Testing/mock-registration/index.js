import { build, fake } from 'test-data-bot';

const mockGuestRegistrationResponseBuilder = build().fields({
  id: fake(f => f.random.number()),
  user_id: fake(f => f.random.number()),
  token: fake(f => f.random.uuid()),
  expires_at: fake(f => f.date.future()),
  created_at: fake(f => f.date.past()),
  updated_at: fake(f => f.date.past()),
});

const mockPersonBuilder = build().fields({
  date_of_birth: fake(f => f.date.past()),
  first_name: fake(f => f.name.firstName()),
  id: fake(f => f.random.number()),
  last_name: fake(f => f.name.lastName()),
  middle_name: fake(f => f.name.lastName()),
});

const mockAddressBuilder = build().fields({
  city: fake(f => f.address.city()),
  id: fake(f => f.random.number()),
  line_1: fake(f => f.address.streetAddress()),
  line_2: fake(f => f.address.streetAddress()),
  state: fake(f => f.address.state()),
  zip_code: fake(f => f.address.zipCode()),
});

const mockUserBuilder = build().fields({
  id: fake(f => f.random.number()),
  age_group:fake(f => f.name.title()),
  identification_code:fake(f => f.random.uuid()),
  created_at: fake(f => f.date.past()),
  updated_at: fake(f => f.date.past()),
});



const mockReservationBuilder = build().fields({
  created_at: fake(f => f.date.past()),
  event_date_id: fake(f => f.random.number()),
  event_slot_id: fake(f => f.random.number()),
  id: fake(f => f.random.number()),
  identification_code:fake(f => f.random.uuid()),
  license_plate: fake(f => f.name.title()),
  updated_at: fake(f => f.date.past()),
  user_id: fake(f => f.random.number()),
});


const mockPhoneBuilder = build().fields({
  phone: fake(f => f.phone.phoneNumber()),
});

const mockEmailBuilder = build().fields({
  email: fake(f => f.internet.email()),
});

const mockSignInBuilder = build().fields({
  address_line_1: null,
  address_line_2: null,
  adults_in_household: null,
  age_group: fake(f => f.name.title()),
  children_in_household: null,
  city: null,
  cognito_id: null,
  created_at: fake(f => f.date.past()),
  credential_id: null,
  date_of_birth: null,
  email: null,
  ethnicity: null,
  first_name: null,
  gender: null,
  id: fake(f => f.random.number()),
  identification_code: fake(f => f.random.uuid()),
  identity_provider: fake(f => f.name.title()),
  is_adult: null,
  last_name: null,
  license_plate: null,
  middle_name: null,
  permission_to_email: null,
  permission_to_text: null,
  phone: null,
  race: null,
  seniors_in_household: null,
  state: null,
  suffix: null,
  updated_at: fake(f => f.date.past()),
  user_detail_id: null,
  user_type: fake(f => f.name.title()),
  zip_code: null
});

export const mockGuestRegistrationResponse = mockGuestRegistrationResponseBuilder();
export const mockPersonResponse = mockPersonBuilder();
export const mockUserResponse = mockUserBuilder();
export const mockAddressResponse = mockAddressBuilder();
export const mockPhoneResponse = mockPhoneBuilder();
export const mockEmailResponse = mockEmailBuilder();
export const mockReservationResponse = mockReservationBuilder();
export const mockSignInResponse = mockSignInBuilder();
