import { Auth } from 'aws-amplify';
import {COGNITO_CONFIG}  from "./Constants";

Auth.configure(COGNITO_CONFIG);

export const SignUp = async (signupData)=> {
	let status = false, data = {},err;       
	await Auth.signUp(signupData)
	.then(res => { 
		status = true; 
		data = res;

	}).catch(err => { 
		status = false; 
		data = err;
	}); 

	return {status, data}; 
}

export const SignUpConfirm = async (username,code) => {
    let status = false, data = {},err;     
	await Auth.confirmSignUp(username, code)
	.then(res => {
		status = true;
		data = 'Logout successful';            
	}).catch(err => {
		status = false;
		data = err;
	});

	return {status, data}; 
}

export const ResendConfirmCode = async (username) => {
	let status = false, data = {}; 
	await Auth.resendSignUp(username)
	.then(res => {
		status = true;
		data = res;
	}).catch(err => {
		status = false;
		data = err;
	});

	return {status, data}; 
}

export const SignIn = async (signinData)=> {
	let status = false, data = {}; 
	let username = signinData.username;
	let password = signinData.password;
	await Auth.signIn(username, password)
	.then(res =>{
		status = true;
		data = res;
	}).catch(err => {
		status = false;
		data = err;
	});
	return {status, data}; 
}

export const ConfirmSignIn = async (user,code,mfatype) => {
	let status = false,data = {};
	await Auth.confirmSignIn(user,code,mfatype)
	.then(res => {
		status = true;
		data = res;
	}).catch(err=>{
		status = false;
		data = err;
	});

	return {status, data}; 
}

export const ForgotPassword = async (username) => {
	let  status = false, data = {};
	await Auth.forgotPassword(username)
	.then(res =>{
		status = true;
		data = res;
	}).catch(err => {
		status = false;
		data = err;
	});

	return {status, data}; 
}

export const ResetPassword = async (username,resetData)=> {
	let status = false, data = {};
	let code = resetData.code;
	let new_password = resetData.newpassword
	await Auth.forgotPasswordSubmit(username, code, new_password)
	.then(res => {
		status = true;
		data = res;
	}).catch(err => {
		status = false;
		data = err;       
	});

	return {status, data};    
}

export const LogOut = async() => {	
	console.log("in await logout")
	debugger
	let  status = false, data = {};
	//let  status = true, data = "logout successfully";
	//return ({status, data}); 


	// await Auth.signOut()
	// .then(() => { 
	// 	//console.log("res in await logout",res)
	// 	status = true;
	// 	data = 'Logout successful';
	// 	return ({status, data}); 
	// })
	// .catch((err) => { 
	// 	console.log("err in await logout",err)
	// 	status = false;
	// 	data = err;
	// 	return ({status, data}); 
	// }); 


	try {
		await Auth.signOut()
		 data = {
			status : true,
			data : 'Logout successful'
		}
	} catch (err) {
		 data = {
			status : false,
			data : 'Logout failed'
		}
	}





	return data; 
}

export const CurrentUser = async() => {
	let  status = false, token = {};
	await Auth.currentSession()
	.then(res => {  	
		status = true;
		token = res.getIdToken().getJwtToken();;
	})
	.catch((err) => {
		status = false;
		token = null;
	});

	return {status, token}; 
}
