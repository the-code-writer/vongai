import { K, Snippets } from "../../../app/helpers";

import Dom7 from 'dom7';

import * as ModuleBaseClasses from "../../../app/module-base-classes";

import * as FirebaseTypeInterfaces from "../../lib/FirebaseTypeInterfaces";

import { AuthConfig } from "./AuthConfig";

import { AuthError } from "./AuthErrors";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, onChildAdded, onChildChanged, onChildRemoved, onValue, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 
// Parent constructor
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

    this.FirebaseAuthApp = getDatabase(this.FirebaseApp);

    callbackFunction();

  }

  createData(path: string, data: any, callbackFunction: Function) {

    console.warn("::: FIREBASE ::: firebaseAuthCreateData :::", path, data);

    const db = getDatabase();
    
    set(ref(db, path), data).then((result: any) => {

      callbackFunction(
        {
          status: "SUCCESS",
          result: result,
        }
      );

    }).catch((error) => {

      callbackFunction(
        {
          status: "ERROR",
          error: error,
        }
      );

    });

  }

  firebaseAuthReadData(path: string, callbackFunction: Function) {
    const db = getDatabase();
    const dbRef = ref(db, path);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      callbackFunction(data);
    });
  }

  firebaseAuthReadDataOnce(path: string, callbackFunction: Function) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, path)).then((snapshot: any) => {
      if (snapshot.exists()) {
        callbackFunction(
          {
            status: "SUCCESS",
            data: snapshot.val(),
          }
        );
      } else {
        callbackFunction(
          {
            status: "NOT_FOUND",
          }
        );
      }
    }).catch((error) => {
      callbackFunction(
        {
          status: "ERROR",
          error: error,
        }
      );
    });
  }

  firebaseAuthUpdateData(path: string, data: any, callbackFunction: Function) {
    const db = getDatabase();
    set(ref(db, path), data).then((result: any) => {
      callbackFunction(
        {
          status: "SUCCESS",
          result: result,
        }
      );
    }).catch((error) => {
      callbackFunction(
        {
          status: "ERROR",
          error: error,
        }
      );
    });
  }

  firebaseAuthDeleteData(path: string, callbackFunction: Function) {
    this.firebaseAuthUpdateData(path, null, callbackFunction);
  }

  firebaseFirestoreCreateCollection() {

  }

  firebaseFirestoreCreateDocument() {

  }

  firebaseFirestoreReadCollection() {

  }

  firebaseFirestoreReadDocument() {

  }

  firebaseFirestoreUpdateCollection() {

  }

  firebaseFirestoreUpdateDocument() {

  }

  firebaseFirestoreDeleteDocument() {

  }

  firebaseFirestoreDeleteCollection() {

  }

  addEventListenersIncomingCall(uid: string) {

    const userPath: string = "";

    const db = getDatabase();
    const userIncomingCallRef = ref(db, userPath);

    onChildAdded(userIncomingCallRef, (data) => {
      this.Framework7Instance.emit(K.ModuleComponentsLibs.im.callScreen.states.INCOMING, { key: data.key, value: data.val() });
    });

    onChildChanged(userIncomingCallRef, (data) => {
      this.Framework7Instance.emit(K.ModuleComponentsLibs.im.callScreen.states.INCOMING, { key: data.key, value: data.val() });
    });

    onChildRemoved(userIncomingCallRef, (data) => {
      this.Framework7Instance.emit(K.ModuleComponentsLibs.im.callScreen.states.INCOMING, { key: data.key, value: data.val() });
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

