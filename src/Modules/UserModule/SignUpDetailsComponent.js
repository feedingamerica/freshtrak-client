import React from "react";
import { useForm } from "react-hook-form";
import { Auth } from 'aws-amplify';
import awsExports from "../../aws-exports";
Auth.configure(awsExports);
const SignUpDetailsComponent = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (signupData) => {
      try {
        let params = {
            username: signupData.email,
            password: signupData.password,
            attributes: {
                email: signupData.email,
                phone_number: signupData.phonenumber,
            }
         };         
        const { user } = await Auth.signUp(params);
    } catch (error) {
        console.log('error signing up:', error);
    }
   };
   
  return (
    <div className="mt-4 pb-3">
      <p className="small text-center">Once you sign up, you can register in advance for services, speed up your check-in time at the pantry, and find other programs that may benefit you.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control"
             name="email"
             id="email"
            ref={register({ required: true })}
          />
          {errors.email && <span className="text-danger">Email is required</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" 
             name="password"
             id="password"
             ref={register({ required: true })}
          />
          {errors.password && <span className="text-danger">Password is required</span>}
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" className="form-control" 
             name="phonenumber"
             id="phonenumber"
             ref={register({ required: true })}
          />
           {errors.phonenumber && <span className="text-danger">Phonenumber is required</span>}
        </div>
        <button type="submit" className="btn custom-button mt-3 w-100">
          Login
        </button>
      </form>
      
    </div>
    
  );
};
export default SignUpDetailsComponent;