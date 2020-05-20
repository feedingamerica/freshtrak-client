import { build, fake } from 'test-data-bot';

const mockSigninBuilder = build('Sign In').fields({
  username: fake(f => f.internet.email()),
  password: fake(f => f.internet.password()),
  randomWord: fake(f => f.random.word()),
});
export const mockSignin = mockSigninBuilder();
