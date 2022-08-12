
import Framework7 from 'framework7/lite-bundle';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { getAuth } from 'firebase-admin/auth';
import {K, ModuleBaseClasses, Snippets} from "../../../app/helpers";
import { FirebaseAuthError } from "./FirebaseAuthErrors";

interface UserDataInterface {
	email: any,
	emailVerified: boolean,
	password: any,
	displayName: any,
	disabled: boolean,
	phoneNumber?: any,
	photoURL?: any
  };

interface UserEmailPasswordInterface {
	email: any,
	password: any
  };

// Parent constructor
class FirebaseAuth {
	
  	framework7Component: Framework7;
	eventsLibrary:ModuleBaseClasses.DovellousLibraryEvent

	constructor(_eventsLibrary: ModuleBaseClasses.DovellousLibraryEvent, _framework7Component:Framework7) {
    	this.framework7Component = _framework7Component;
    	this.eventsLibrary = _eventsLibrary;
	}

	/**
	 * Get the user data by passing a user id as a reference
	 * param uid string - The user id of the user
	 * return Promise
	 */
	 getUserObject(email: any, password: any, firstname: any, lastname: any, photo: any, phoneNumber: any) {

		const hashedUserPassword = this.getUserHashedPassword(password);

		  const userData:UserDataInterface = {
			email: email,
			emailVerified: false,
			password: hashedUserPassword,
			displayName: `${firstname} ${lastname}`,
			disabled: false,
			phoneNumber: null,
			photoURL: null
		  } as UserDataInterface;

		if(phoneNumber){
			userData.phoneNumber = phoneNumber;
		}else{
			delete userData.phoneNumber;
		}
		
		if(photo){
			userData.photoURL = photo;
		}else{
			delete userData.photoURL;
		}
		
		return userData;

	}

	/**
	 * Get the user data by passing a user id as a reference
	 * param uid string - The user id of the user
	 * return Promise
	 */
	 getUserEmailPasswordObject(email: any, password: any) {

		const hashedUserPassword = this.getUserHashedPassword(password);

		  const userData:UserEmailPasswordInterface = {
			email: email,
			password: hashedUserPassword
		  } as UserEmailPasswordInterface;

		return userData;

	}

	/**
	 * Get the user data by passing a user id as a reference
	 * param uid string - The user id of the user
	 * return Promise
	 */
	 getUserHashedPassword(password: any) {

		return Snippets.strings.hash[K.Cryptography.SHA256](password);

	}

	/**
	 * Get the user data by passing a user id as a reference
	 * param uid string - The user id of the user
	 * return Promise
	 */
	 async createUser(email: any, password: any, firstname: any, lastname: any, photo: any, phoneNumber: any) {

		const userData:UserDataInterface = this.getUserObject(email, password, firstname, lastname, photo, phoneNumber);
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.createUser(userData)
				.then((userRecord) => {
				  callBackSuccessResolve(userRecord);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Get the user data by passing the id as a reference
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async createUserWithEmailAndPassword(email: any, password: any) {
		
		const userData:UserEmailPasswordInterface = this.getUserEmailPasswordObject(email, password);
		
		return new Promise(async (callBackSuccessResolve)=>{
			
			const result = await FirebaseAuthentication.createUserWithEmailAndPassword(userData);

			callBackSuccessResolve(result);

		});

	}

	/**
	 * Get the user data by passing the id as a reference
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async signInWithEmailAndPassword (email: any, password: any) {
		
		const userData:UserEmailPasswordInterface = this.getUserEmailPasswordObject(email, password);
		
		return new Promise(async (callBackSuccessResolve)=>{
			
			const result = await FirebaseAuthentication.signInWithEmailAndPassword(userData);

			callBackSuccessResolve(result);

		});

	}

	/**
	 * Get the user data by passing the id as a reference
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async signInWithCustomToken (token: any) {
		
		return new Promise(async (callBackSuccessResolve, callBackSuccessError)=>{
			
			const result = await FirebaseAuthentication.signInWithCustomToken(token);

			if(result.hasOwnProperty("user")){
				callBackSuccessResolve(result.user);
			}else{
				callBackSuccessError(result);
			}

			

		});

	}

	/**
	 * Get the user data by passing the id as a reference
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async signInWithFacebook () {
		
		return new Promise(async (callBackSuccessResolve, callBackSuccessError)=>{
			
			const result = await FirebaseAuthentication.signInWithFacebook();

			if(result.hasOwnProperty("user")){
				callBackSuccessResolve(result.user);
			}else{
				callBackSuccessError(result);
			}

		});

	}
	/**
	 * Get the user data by passing the id as a reference
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async signInWithGoogle () {
		
		return new Promise(async (callBackSuccessResolve, callBackSuccessError)=>{
			
			const result = await FirebaseAuthentication.signInWithGoogle();

			if(result.hasOwnProperty("user")){
				callBackSuccessResolve(result.user);
			}else{
				callBackSuccessError(result);
			}

		});

	}
	/**
	 * Get the user data by passing the id as a reference
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async signInWithTwitter () {
		
		return new Promise(async (callBackSuccessResolve, callBackSuccessError)=>{
			
			const result = await FirebaseAuthentication.signInWithTwitter();

			if(result.hasOwnProperty("user")){
				callBackSuccessResolve(result.user);
			}else{
				callBackSuccessError(result);
			}

		});

	}
	/**
	 * Get the user data by passing the id as a reference
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async signInWithMicrosoft () {
		
		return new Promise(async (callBackSuccessResolve, callBackSuccessError)=>{
			
			const result = await FirebaseAuthentication.signInWithMicrosoft();

			if(result.hasOwnProperty("user")){
				callBackSuccessResolve(result.user);
			}else{
				callBackSuccessError(result);
			}

		});

	}
	/**
	 * Get the user data by passing the id as a reference
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async signInWithApple () {
		
		return new Promise(async (callBackSuccessResolve, callBackSuccessError)=>{
			
			const result = await FirebaseAuthentication.signInWithApple();

			if(result.hasOwnProperty("user")){
				callBackSuccessResolve(result.user);
			}else{
				callBackSuccessError(result);
			}

		});

	}
	/**
	 * Get the user data by passing the id as a reference
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async signInWithGithub() {
		
		return new Promise(async (callBackSuccessResolve, callBackSuccessError)=>{
			
			const result = await FirebaseAuthentication.signInWithGithub();

			if(result.hasOwnProperty("user")){
				callBackSuccessResolve(result.user);
			}else{
				callBackSuccessError(result);
			}

		});

	}

	/**
	 * Get the user data by passing the id as a reference
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async getUserById(uid) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.getUser(uid)
				.then((userRecord) => {
				  callBackSuccessResolve(userRecord);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Get the user data by passing the id as a reference
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async createCustomToken(uid) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.createCustomToken(uid)
				.then((customToken) => {
				  callBackSuccessResolve(customToken);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Get the user data by passing the id as a reference
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async createCustomTokenWithClaims(uid, additionalClaims) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.createCustomToken(uid, additionalClaims)
				.then((customToken) => {
				  callBackSuccessResolve(customToken);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Get the user data by passing the id as a reference
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async verifyIdToken(tokenId) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.verifyIdToken(tokenId)
				.then((decodedToken) => {
				  callBackSuccessResolve(decodedToken);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Revoke all refresh tokens for a specified user for whatever reason.
	 * Retrieve the timestamp of the revocation, in seconds since the epoch.
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async revokeRefreshTokens(uid) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.revokeRefreshTokens(uid)
				.then(() => {
					callBackSuccessResolve(getAuth().getUser(uid));
				  })
				  .then((userRecord) => {
					callBackSuccessResolve(new Date(userRecord.tokensValidAfterTime).getTime() / 1000);
				  })
				  .then((timestamp) => {
					callBackSuccessResolve(timestamp);
				  })
				  .catch((error) => {
					callBackErrorReject(error);
				  });

		});

	}

	/**
	 * Get the user data by passing an email as a reference
	 * param email string - The email of the user
	 * return Promise
	 */
	 async getUserByEmail(email) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.getUserByEmail(email)
				.then((userRecord) => {
				  callBackSuccessResolve(userRecord);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Get the user data by passing a phone number as a reference
	 * param phone string - The phone numberof the user
	 * return Promise
	 */
	 async getUserByPhoneNumber(phoneNumber) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.getUserByPhoneNumber(phoneNumber)
				.then((userRecord) => {
				  callBackSuccessResolve(userRecord);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Get the user data by passing user params as a reference
	 * param params array -An array of user params 
	 * return Promise
	 */
	 async getUsers(params) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.getUsers(params)
				.then((getUsersResult) => {
				  callBackSuccessResolve(getUsersResult.users);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Get the user data by passing a user id as a reference
	 * param uid string - The user id of the user
	 * return Promise
	 */
	 async updateUser(uid, userData) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.updateUser(uid, userData)
				.then((userRecord) => {
				  callBackSuccessResolve(userRecord);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Delete a user with the specified user id
	 * param uid string - The user id of the user
	 * return Promise
	 */
	 async deleteUser(uid) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.deleteUser(uid)
				.then(() => {
				  callBackSuccessResolve(null);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Delete users with the specified user ids
	 * param userIds array - An array of user uids
	 * return Promise
	 */
	 async deleteUsers(userIds) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.deleteUsers(userIds)
				.then((deleteUsersResult) => {
				  callBackSuccessResolve(deleteUsersResult);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Get the user data by passing a user id as a reference
	 * param uid string - The user id of the user
	 * return Promise
	 */
	 async listAllUsers(limit, nextPageToken) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.listUsers(limit, nextPageToken)
				.then((listUsersResult) => {
				  callBackSuccessResolve(listUsersResult.users);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

}

export {FirebaseAuthError, FirebaseAuth}


