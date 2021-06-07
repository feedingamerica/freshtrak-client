
 export const ErrorHandler = (err) => {
      let customError = { emailError:null,
                       passwordError:null,
                       codeError:null,
                       userError:null,
                       limitError:null,
                      };

      let custom_error = {...customError}                
      switch(err.code){
        case 'UsernameExistsException'  :   custom_error = {...custom_error,
                                                            emailError:"Email already exist"
                                                        };
                                            break;

        case 'InvalidParameterException':   custom_error = {...custom_error,
                                                            emailError:"",
                                                            passwordError:"Password must have length greater than or equal 8"
                                                          };
                                            break;

        case 'InvalidPasswordException' :   let errorValue = err.message.split(':');
                                                custom_error = {...custom_error,
                                                                  emailError:"",
                                                                  passwordError:errorValue[1]
                                                               };
                                            break;    

        case 'CodeMismatchException'   :    custom_error = {...custom_error,
                                                            codeError:"Invalid code provided, Please try again !!"
                                                         };
                                            break;

        case 'UserNotFoundException'   :   custom_error = {...custom_error,
                                                            userError:'User is not exist'
                                                         };
                                            break; 
        case 'NotAuthorizedException'   :   custom_error = {...custom_error,
                                                            userError:err.message
                                                         };
                                            break; 
        case 'LimitExceededException'   :   custom_error = {...custom_error,
                                                            limitError:err.message
                                                         };
                                            break;                                     
                                                                                          
        default : custom_error = {...custom_error}
      }
      return custom_error;
  }
