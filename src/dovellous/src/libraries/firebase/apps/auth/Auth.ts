import { K, Snippets } from "../../../app/helpers";
import * as ModuleBaseClasses from "../../../app/module-base-classes";
import * as FirebaseTypeInterfaces from "../../lib/FirebaseTypeInterfaces";
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { AuthConfig } from "./AuthConfig";
import { AuthError } from "./AuthErrors";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updatePhoneNumber, updateProfile } from "firebase/auth";

class Auth {

  Framework7Instance: any;

  FirebaseInstance: any;

  FirebaseApp: any;

  FirebaseAuthApp: any;

  authEvents: ModuleBaseClasses.DovellousLibraryEvent;

  authError: FirebaseTypeInterfaces.AuthErrorInterface;

  authconfig: FirebaseTypeInterfaces.AuthConfigInterface;

  constructor(Framework7: any, FirebaseInstance: any, FirebaseApp: any) {

    const self = this;

    this.Framework7Instance = Framework7;

    this.FirebaseInstance = FirebaseInstance;

    this.FirebaseApp = FirebaseApp;

    this.authEvents = FirebaseApp.events;

    this.authError = AuthError;

    if (
      this.FirebaseInstance.firebaseConfig.hasOwnProperty('authConfig') //&&
      //typeof this.FirebaseInstance.firebaseConfig.authConfig === "object" &&
      //Object.keys(this.FirebaseInstance.firebaseConfig.authConfig).length > 0
    ) {

      this.init(()=>{

        this.Framework7Instance.emit(
          K.Events.Modules.Firebase.Auth.ON_APP_INIT,
          this
				);

      });

    }

  }  

  init(callbackFunction: Function) {

    this.FirebaseAuthApp = getAuth(this.FirebaseApp);

    callbackFunction();

  }

  	/**
	 * Get the user data by passing a user id as a reference
	 * param uid string - The user id of the user
	 * return Promise
	 */
     getUserObject(email: any, password: any, firstname: any, lastname: any, photo: any, phoneNumber: any) {

      const hashedUserPassword = this.getUserHashedPassword(password);
  
        const userData: FirebaseTypeInterfaces.UserDataInterface = {
        email: email,
        emailVerified: false,
        password: hashedUserPassword,
        displayName: `${firstname} ${lastname}`,
        disabled: false,
        phoneNumber: null,
        photoURL: null
        } as FirebaseTypeInterfaces.UserDataInterface;
  
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
  
        const userData: FirebaseTypeInterfaces.UserEmailPasswordInterface = {
        email: email,
        password: hashedUserPassword
        } as FirebaseTypeInterfaces.UserEmailPasswordInterface;
  
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
  
      const userData: FirebaseTypeInterfaces.UserDataInterface = this.getUserObject(email, password, firstname, lastname, photo, phoneNumber);
      
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
     async createUserWithEmailAndPassword(email: any, password: any) : Promise<any> {
      
      const userData: FirebaseTypeInterfaces.UserEmailPasswordInterface = this.getUserEmailPasswordObject(email, password);
      
      return new Promise(async (callBackSuccessResolve, callBackErrorResolve)=>{
        
        createUserWithEmailAndPassword(this.FirebaseAuthApp, userData.email, userData.password)
        .then((userCredential: any) => {
          // Signed in 
          const user = userCredential.user;          
          callBackSuccessResolve(user);
        })
        .catch((error: any) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          callBackErrorResolve({errorCode: errorCode, errorMessage: errorMessage});
        });        
  
      });
  
    }
    
    /**
     * Get the user data by passing the id as a reference
     * param uid string - The id of the user
     * return Promise
     */
     async signInWithEmailAndPassword(email: any, password: any) : Promise<any> {
      
      const userData: FirebaseTypeInterfaces.UserEmailPasswordInterface = this.getUserEmailPasswordObject(email, password);
      
      return new Promise(async (callBackSuccessResolve, callBackErrorResolve)=>{
        
        signInWithEmailAndPassword(this.FirebaseAuthApp, userData.email, userData.password)
        .then((userCredential: any) => {
          // Signed in
          const user = userCredential.user;          
          callBackSuccessResolve(user);
        })
        .catch((error: any) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          callBackErrorResolve({errorCode: errorCode, errorMessage: errorMessage});
        });        
  
      });
  
    }
    
    /**
     * Get the user data by passing the id as a reference
     * param uid string - The id of the user
     * return Promise
     */
     async onAuthStateChanged(callBackSignedIn: Function, callBackSignedOut: Function) {
      
      if(typeof callBackSignedIn === "function"){
        
        onAuthStateChanged(this.FirebaseAuthApp, (user: any) => {
          
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            callBackSignedIn(user);
            // ...
          } else {
            // User is signed out
            callBackSignedOut();
          }
        
        });        
  
      };
  
    }
    
    /**
     * Get the user data by passing the id as a reference
     * param uid string - The id of the user
     * return Promise
     */
     isUserSignedIn() {
      
      if(this.FirebaseAuthApp.hasOwnProperty('currentUser')){
  
        const user = this.FirebaseAuthApp.currentUser;

        if(user && user !== null){

          if(typeof user === "object" && user.hasOwnProperty('uid')){

            return user.uid;

          }

        }

      };

      return false;
  
    }
  
    /**
     * Get the user data by passing the id as a reference
     * param uid string - The id of the user
     * return Promise
     */
     getUserProfile() {
      
      if(this.FirebaseAuthApp.hasOwnProperty('currentUser')){
  
        const user = this.FirebaseAuthApp.currentUser;

        if(user && user !== null){

          if(typeof user === "object" && user.hasOwnProperty('uid')){

            // The user object has basic properties such as display name, email, etc.
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const phoneNumber = user.phoneNumber;
            const emailVerified = user.emailVerified;

            // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            const uid = user.uid;

            const userCredential:FirebaseTypeInterfaces.UserDataInterface = {
              displayName: displayName,
              email: email,
              photoURL: photoURL,
              phoneNumber: phoneNumber,
              emailVerified: emailVerified,
              uid: uid
            }

            return userCredential;


          }

        }

      };

      return false;
  
    }
  
    /**
     * Get the user data by passing the id as a reference
     * param uid string - The id of the user
     * return Promise
     */
     getUserProfileFromProviders() {
      
      if(this.FirebaseAuthApp.hasOwnProperty('currentUser')){
  
        const user = this.FirebaseAuthApp.currentUser;

        if(user && user !== null){

          if(typeof user === "object" && user.hasOwnProperty('uid')){

            const providersObject = new Object();

            user.providerData.forEach((profile: any) => {

              // The user object has basic properties such as display name, email, etc.
              const displayName = profile.displayName;
              const email = profile.email;
              const photoURL = profile.photoURL;
              const phoneNumber = profile.phoneNumber;
              const emailVerified = profile.emailVerified;

              // The user's ID, unique to the Firebase project. Do NOT use
              // this value to authenticate with your backend server, if
              // you have one. Use User.getToken() instead.
              const uid = profile.uid;
              const providerId = profile.providerId;

              const userCredential:FirebaseTypeInterfaces.UserDataInterface = {
                displayName: displayName,
                email: email,
                photoURL: photoURL,
                phoneNumber: phoneNumber,
                emailVerified: emailVerified,
                uid: uid,
                providerId: providerId,
              }

              providersObject[providerId] = userCredential;

            });

            return providersObject;


          }

        }

      };

      return false;
  
    }
  
      
    /**
     * Get the user data by passing the id as a reference
     * param uid string - The id of the user
     * return Promise
     */
     async updateUserProfile(userData:any, callBackSuccess: Function, callBackError: Function) {
      
      if(this.isUserSignedIn()){
        
        updateProfile(this.FirebaseAuthApp.currentUser, userData)
        .then(() => {

          const newUserData:FirebaseTypeInterfaces.UserDataInterface | false = this.getUserProfile();
          
          callBackSuccess(newUserData);
        
        })
        .catch((error: any) => {
          
          callBackSuccess(error);
        
        });        
  
      };
  
    }
  
    /**
     * Get the user data by passing the id as a reference
     * param uid string - The id of the user
     * return Promise
     */
     async createUserWithEmailAndPasswordNative(email: any, password: any) {
      
      const userData: FirebaseTypeInterfaces.UserEmailPasswordInterface = this.getUserEmailPasswordObject(email, password);
      
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
     async signInWithEmailAndPasswordNative(email: any, password: any) {
      
      const userData: FirebaseTypeInterfaces.UserEmailPasswordInterface = this.getUserEmailPasswordObject(email, password);
      
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
     async signInWithCustomTokenNative(token: any) {
      
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
     async signInWithFacebookNative() {
      
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
     async signInWithGoogleNative() {
      
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
     async signInWithTwitterNative() {
      
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
     async signInWithMicrosoftNative() {
      
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
     async signInWithAppleNative() {
      
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
     async signInWithGithubNative() {
      
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
     async getUserById(uid: string) {
      
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
     async createCustomToken(uid: string) {
      
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
     async revokeRefreshTokens(uid: string) {
      
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
     async deleteUser(uid: string) {
      
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

  throwError(message: string): void {

    this.authError.throwError(message);

  }

  invokeError(code: number, message: string, output: string | null | boolean, ...args: any): FirebaseTypeInterfaces.FirebaseErrorInterface {

    const err = this.authError.composeError(code, message, args);

    if (output && output !== null) {

      switch (output.toString().toLowerCase()) {

        case 'error': {
          console.error(err);
          break;
        }

        case 'warn': {
          console.warn(err);
          break;
        }

        case 'log': {
          console.log(err);
          break;
        }

        case 'info': {
          console.info(err);
          break;
        }

        default: {
          console.log(err);
          break;
        }

      }

    }

    return err;

  }

}

export { Auth, AuthConfig, AuthError }

