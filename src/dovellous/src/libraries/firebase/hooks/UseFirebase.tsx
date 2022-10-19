import { useState, useEffect } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, onChildAdded, onChildChanged, onChildRemoved, onValue, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 
import K from '../../app/konstants';
import { f7ready } from 'framework7-react';

export default function useFirebase()
  : {
    firebaseAppReady: boolean,
    firebaseFirestoreReady:boolean,
    firebaseRealtimeDatabaseReady: boolean,
    firebaseRealtimeDatabaseCreateData: Function,
    firebaseRealtimeDatabaseReadData:   Function,
    firebaseRealtimeDatabaseUpdateData: Function,
    firebaseRealtimeDatabaseDeleteData: Function,
    firebaseFirestoreCreateCollection:Function;
    firebaseFirestoreCreateDocument:Function;
    firebaseFirestoreReadCollection:Function;
    firebaseFirestoreReadDocument:Function;
    firebaseFirestoreUpdateCollection:Function;
    firebaseFirestoreUpdateDocument:Function;
    firebaseFirestoreDeleteDocument:Function;
    firebaseFirestoreDeleteCollection:Function;
  } {

    const [framework7Instance, setFramework7Instance] = useState<any>();

    const [firebaseApp, setFirebaseApp] = useState<any>();

    const [firebaseAppReady, setFirebaseAppReady] = useState<boolean>(false);

    const [firebaseRealtimeDatabaseReady, setFirebaseRealtimeDatabaseReady] = useState<boolean>(false);

    const [firebaseRealtimeDatabaseApp, setFirebaseRealtimeDatabaseApp] = useState<any>();

    const [firebaseFirestoreReady, setFirebaseFirestoreReady] = useState<boolean>(false);

    const firebaseInit:Function = (firebaseConfig: any, callbackFunction: Function) : any => {
        
        console.warn("::: FIREBASE ::: firebaseInit :::");

        callbackFunction();

    }
    
    const firebaseKill:Function = () : any => {
        
    }
    
    const firebaseRealtimeDatabaseInit:Function = (callbackFunction: Function) : any => {
        
        console.warn("::: FIREBASE ::: firebaseRealtimeDatabaseInit :::");

        callbackFunction();

    }
    
    const firebaseRealtimeDatabaseKill:Function = () : any => {
        
    }
    
    const firebaseFirestoreInit:Function = (callbackFunction: Function) : any => {
        
        console.warn("::: FIREBASE ::: firebaseFirestoreInit :::");

        callbackFunction();

    }
    
    const firebaseFirestoreKill:Function = () : any => {
        
    }
    
    const firebaseRealtimeDatabaseCreateData:Function = (path: string, data: any, callbackFunction: Function) : any => {
        
        console.warn("::: FIREBASE ::: firebaseRealtimeDatabaseCreateData :::", path, data);

        firebaseRealtimeDatabaseApp.createData(path, data, callbackFunction);

    } 
    
    const firebaseRealtimeDatabaseReadData:Function = (path:string, callbackFunction:Function) : any => {
        
        callbackFunction();

    }
    
    const firebaseRealtimeDatabaseReadDataOnce:Function = (path:string, callbackFunction:Function) : any => {
        
        callbackFunction();

    }
    
    const firebaseRealtimeDatabaseUpdateData:Function = (path: string, data: any, callbackFunction: Function) : any => {
        
        callbackFunction();

    }
    
    const firebaseRealtimeDatabaseDeleteData:Function = (path:string, callbackFunction: Function) : any => {
        
        callbackFunction();

    }
        
    const firebaseFirestoreCreateCollection:Function = () : any => {
        
    }
    
    const firebaseFirestoreCreateDocument:Function = () : any => {
        
    }
    
    const firebaseFirestoreReadCollection:Function = () : any => {
        
    }
    
    const firebaseFirestoreReadDocument:Function = () : any => {
        
    }
    
    const firebaseFirestoreUpdateCollection:Function = () : any => {
        
    }
    
    const firebaseFirestoreUpdateDocument:Function = () : any => {
        
    }
    
    const firebaseFirestoreDeleteDocument:Function = () : any => {
        
    }
    
    const firebaseFirestoreDeleteCollection:Function = () : any => {
        
    }
    
    const addEventListeners:Function = (callbackFunction: Function) : any => {
        
        callbackFunction();

    }

    const resetState = () => {

        framework7Instance.off( K.Events.Modules.Firebase.FirebaseLibEvent.MODULE_LOADED );

        framework7Instance.off( K.Events.Modules.Firebase.RealtimeDatabase.ON_APP_INIT );

    }
    
    useEffect(() => {

        // Get firebase app reference from class

        f7ready((Framework7Instance) => {

            setFramework7Instance(Framework7Instance);

            Framework7Instance.on(
                K.Events.Modules.Firebase.FirebaseLibEvent.MODULE_LOADED,
                ()=>{
                    setFirebaseAppReady(true);
                    //setFirebaseApp()
                }
            );

            Framework7Instance.on(
                K.Events.Modules.Firebase.RealtimeDatabase.ON_APP_INIT,
                (realtimeDatabaseApp: any)=>{
                    setFirebaseRealtimeDatabaseReady(true);
                    setFirebaseRealtimeDatabaseApp(realtimeDatabaseApp);
                }
            );

        });

        return () => {
            
            resetState();

        }
        
    }, [])

    return {
        firebaseAppReady,
        firebaseFirestoreReady,
        firebaseRealtimeDatabaseReady,
        firebaseRealtimeDatabaseCreateData,
        firebaseRealtimeDatabaseReadData,
        firebaseRealtimeDatabaseUpdateData,
        firebaseRealtimeDatabaseDeleteData,
        firebaseFirestoreCreateCollection,
        firebaseFirestoreCreateDocument,
        firebaseFirestoreReadCollection,
        firebaseFirestoreReadDocument,
        firebaseFirestoreUpdateCollection,
        firebaseFirestoreUpdateDocument,
        firebaseFirestoreDeleteDocument,
        firebaseFirestoreDeleteCollection,
    };

}
