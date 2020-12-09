import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import SignInFormComponent from './SignInFormComponent';

const SignInContainer = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const onSubmit = data => {
    console.log(data);
    if (data) {
      localStorage.setItem('isLoggedIn', true);
      history.goBack();
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
        <SignInFormComponent register={register} errors={errors} />
        <div className="button-wrap mt-4">
          <button
            type="submit"
            className="btn custom-button"
            data-testid="log in button"
          >Log In</button>
        </div>
      </form>
    </div>
  )
}

export default SignInContainer;
