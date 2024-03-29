import { K, Snippets } from "../../../app/helpers";
import * as ModuleBaseClasses from "../../../app/module-base-classes";
import * as FirebaseTypeInterfaces from "../../lib/FirebaseTypeInterfaces";

import { RealtimeDatabaseConfig } from "./RealtimeDatabaseConfig";
import { RealtimeDatabaseError } from "./RealtimeDatabaseErrors";

import { child, get, getDatabase, onChildAdded, onChildChanged, onChildRemoved, onValue, ref, set } from "firebase/database";

class RealtimeDatabase {

  Framework7Instance: any;

  FirebaseInstance: any;

  FirebaseApp: any;

  FirebaseRealtimeDatabaseApp: any;

  realtimeDatabaseEvents: ModuleBaseClasses.DovellousLibraryEvent;

  realtimeDatabaseError: FirebaseTypeInterfaces.RealtimeDatabaseErrorInterface;

  realtimeDatabaseconfig: FirebaseTypeInterfaces.RealtimeDatabaseConfigInterface;

  constructor(Framework7: any, FirebaseInstance: any, FirebaseApp: any) {

    const self = this;

    this.Framework7Instance = Framework7;

    this.FirebaseInstance = FirebaseInstance;

    this.FirebaseApp = FirebaseApp;

    this.realtimeDatabaseEvents = FirebaseApp.events;

    this.realtimeDatabaseError = RealtimeDatabaseError;

    if (
      this.FirebaseInstance.firebaseConfig.hasOwnProperty('realtimeDatabaseConfig') //&&
      //typeof this.FirebaseInstance.firebaseConfig.realtimeDatabaseConfig === "object" &&
      //Object.keys(this.FirebaseInstance.firebaseConfig.realtimeDatabaseConfig).length > 0
    ) {

      this.init(()=>{

        this.Framework7Instance.emit(
          K.Events.Modules.Firebase.RealtimeDatabase.ON_APP_INIT,
          this
				);

      });

    }

  }  

  init(callbackFunction: Function) {

    this.FirebaseRealtimeDatabaseApp = getDatabase(this.FirebaseApp);

    callbackFunction();

  }

  createData(path: string, data: any, callbackFunction: Function) {

    console.warn("::: FIREBASE ::: firebaseRealtimeDatabaseCreateData :::", path, data);

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

