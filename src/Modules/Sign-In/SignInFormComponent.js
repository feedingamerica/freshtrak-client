import React, { Fragment, forwardRef } from 'react';

const SignInFormComponent = forwardRef(({ register, errors }, ref) => (
  <Fragment>
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        className="form-control"
        name="email"
        id="email"
        ref={register({ required: true })}
      />
      {errors.email && <span className="text-danger">Your email is required</span>}
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input
        type="password"
        className="form-control"
        name="password"
        id="password"
        ref={register({ required: true })}
      />
      {errors.password && <span className="text-danger">Your Password is required</span>}
    </div>
  </Fragment>
));

export default SignInFormComponent;
