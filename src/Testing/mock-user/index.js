import { build, fake } from 'test-data-bot';

export const mockUserBuilder = build('Mock User').fields({
  email: fake(f => f.internet.email()),
  password: fake(f => f.internet.password()), 
  phone: fake(f => f.phone.phoneNumber()),
});

export const mockForgotPassword = build('Mock User').fields({
	CodeDeliveryDetails: {
          AttributeName: 'email',
          DeliveryMedium: 'EMAIL',
          Destination: fake(f => f.internet.email()),
        }
});