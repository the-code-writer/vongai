import { K, Snippets } from "../../../app/helpers";

import Dom7 from 'dom7';

import * as ModuleBaseClasses from "../../../app/module-base-classes";

import * as FirebaseTypeInterfaces from "../../lib/FirebaseTypeInterfaces";

import { RealtimeDatabaseConfig } from "./RealtimeDatabaseConfig";

import { RealtimeDatabaseError } from "./RealtimeDatabaseErrors";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, onChildAdded, onChildChanged, onChildRemoved, onValue, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 
// Parent constructor
class RealtimeDatabase {

  Framework7Instance: any;

  FirebaseInstance: any;

  realtimeDatabaseEvents: ModuleBaseClasses.DovellousLibraryEvent;

  realtimeDatabaseError: FirebaseTypeInterfaces.RealtimeDatabaseErrorInterface;

  realtimeDatabaseconfig: FirebaseTypeInterfaces.RealtimeDatabaseConfigInterface;

  database: any;

  isReady:boolean;

  constructor(Firebase: any) {

    const self = this;

    this.FirebaseInstance = Firebase;

    this.realtimeDatabaseEvents = Firebase.events;

    this.realtimeDatabaseError = RealtimeDatabaseError;

    self.isReady = false;

    if (
      this.FirebaseInstance.firebaseConfig.hasOwnProperty('realtimeDatabaseConfig') &&
      Object.keys(this.FirebaseInstance.firebaseConfig.realtimeDatabaseConfig).length > 0
    ) {

      this.firebaseRealtimeDatabaseInit({},(database: any)=>{

        self.isReady = true;

        database;

      });

    }

  }  

  firebaseRealtimeDatabaseInit(app:any, callbackFunction: Function) {

    console.warn("::: FIREBASE ::: firebaseRealtimeDatabaseInit :::");

    this.database = getDatabase(app);

    callbackFunction(this.database);

  }

  firebaseRealtimeDatabaseKill() {

  }

  firebaseFirestoreInit(callbackFunction: Function) {

    console.warn("::: FIREBASE ::: firebaseFirestoreInit :::");

    callbackFunction();

  }

  firebaseFirestoreKill() {

  }

  firebaseRealtimeDatabaseCreateData(path: string, data: any, callbackFunction: Function) {

    console.warn("::: FIREBASE ::: firebaseRealtimeDatabaseCreateData :::", path, data);

    const db = getDatabase();

    const dataObject: any = {
      startedTimestamp: data.startedTimestamp,
      endedTimestamp: data.endedTimestamp,
      origin: data.origin,
      destination: data.destination,
      isVideoCall: data.isVideoCall,
      isGroupCall: data.isGroupCall,
      isIncoming: data.isIncoming,
      isEncrypted: data.isEncrypted,
      groupId: data.groupId,
      channel: data.channel,
      session: data.session,
      acknowledged: 0,
    };

    set(ref(db, path), dataObject).then((result: any) => {

      console.warn("::: FIREBASE ::: result :::", result);

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

  firebaseRealtimeDatabaseReadData(path: string, callbackFunction: Function) {
    const db = getDatabase();
    const dbRef = ref(db, path);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      callbackFunction(data);
    });
  }

  firebaseRealtimeDatabaseReadDataOnce(path: string, callbackFunction: Function) {
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

  firebaseRealtimeDatabaseUpdateData(path: string, data: any, callbackFunction: Function) {
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

  firebaseRealtimeDatabaseDeleteData(path: string, callbackFunction: Function) {
    this.firebaseRealtimeDatabaseUpdateData(path, null, callbackFunction);
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

  addEventListeners() {

    const userPath: string = "";

    const db = getDatabase();
    const userIncomingCallRef = ref(db, userPath);

    onChildAdded(userIncomingCallRef, (data) => {
      f7.emit("USER_INCOMING_CALL_LISTENER_CHILD_CREATED", { key: data.key, value: data.val() });
    });

    onChildChanged(userIncomingCallRef, (data) => {
      f7.emit("USER_INCOMING_CALL_LISTENER_CHILD_UPDATED", { key: data.key, value: data.val() });
    });

    onChildRemoved(userIncomingCallRef, (data) => {
      f7.emit("USER_INCOMING_CALL_LISTENER_CHILD_DELETED", { key: data.key, value: data.val() });
    });

  }

  throwError(message: string): void {

    this.realtimeDatabaseError.throwError(message);

  }

  invokeError(code: number, message: string, output: string | null | boolean, ...args: any): FirebaseTypeInterfaces.FirebaseErrorInterface {

    const err = this.realtimeDatabaseError.composeError(code, message, args);

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

export { RealtimeDatabase, RealtimeDatabaseConfig, RealtimeDatabaseError }

