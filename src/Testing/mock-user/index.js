import { build, fake } from 'test-data-bot';

export const mockUserBuilder = build('Mock User').fields({
  email: fake(f => f.internet.email()),
  password: fake(f => f.internet.password()), 
  phone: fake(f => f.phone.phoneNumber()),
});