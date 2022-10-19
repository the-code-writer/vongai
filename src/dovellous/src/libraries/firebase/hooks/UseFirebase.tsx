import { useState, useEffect } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, onChildAdded, onChildChanged, onChildRemoved, onValue, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 
import K from '../../app/konstants';
import { f7, f7ready } from 'framework7-react';

export default function useFirebase()
  : {
    firebaseAppReady: boolean,
    firebaseRealtimeDatabaseReady: boolean,
    firebaseRealtimeDatabaseCreateData: Function,
    firebaseRealtimeDatabaseReadData:   Function,
    firebaseRealtimeDatabaseSetData: Function,
    firebaseRealtimeDatabaseUpdateData: Function,
    firebaseRealtimeDatabaseDeleteData: Function,
  } {

    const [framework7Instance, setFramework7Instance] = useState<any>();

    const [firebaseApp, setFirebaseApp] = useState<any>();

    const [firebaseAppReady, setFirebaseAppReady] = useState<boolean>(false);

    const [firebaseRealtimeDatabaseReady, setFirebaseRealtimeDatabaseReady] = useState<boolean>(false);

    const [firebaseRealtimeDatabaseApp, setFirebaseRealtimeDatabaseApp] = useState<any>();

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
    
    const firebaseRealtimeDatabaseSetData:Function = (path: string, data: any, callbackFunction: Function) : any => {
        
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

    const onFirebaseModuleReady = (firebaseAppInstance: any) => {
        setFirebaseAppReady(true);
        setFirebaseApp(firebaseAppInstance);
    }
    
    const onFirebaseRealtimeDatabaseModuleReady = (realtimeDatabaseAppInstance: any) => {
        setFirebaseRealtimeDatabaseReady(true);
        setFirebaseRealtimeDatabaseApp(realtimeDatabaseAppInstance);
    }
    
    useEffect(() => {

        setFramework7Instance(f7);

        const DovellousInstance: any = f7.dovellous.instance;

        if(DovellousInstance.Libraries.hasOwnProperty("Firebase")){

            f7.on(
                K.Events.Modules.Firebase.FirebaseLibEvent.MODULE_READY,
                (firebaseAppInstance: any)=>{
                    onFirebaseModuleReady(firebaseAppInstance);
                }
            );

            if(DovellousInstance.Libraries.Firebase.app.realtimeDatabase.isReady){
                onFirebaseModuleReady(DovellousInstance.Libraries.Firebase.app.firebaseApp);
            }

            f7.on(
                K.Events.Modules.Firebase.RealtimeDatabase.ON_APP_INIT,
                (realtimeDatabaseAppInstance?: any)=>{
                    onFirebaseRealtimeDatabaseModuleReady(DovellousInstance.Libraries.Firebase.app.realtimeDatabase.lib);
                }
            );

            if(DovellousInstance.Libraries.Firebase.app.realtimeDatabase.isReady){
                onFirebaseRealtimeDatabaseModuleReady(DovellousInstance.Libraries.Firebase.app.realtimeDatabase.lib);
            }

        }

        return () => {
            
            resetState();

        }
        
    }, [])

    return {
        firebaseAppReady,
        firebaseRealtimeDatabaseReady,
        firebaseRealtimeDatabaseCreateData,
        firebaseRealtimeDatabaseReadData,
        firebaseRealtimeDatabaseSetData,
        firebaseRealtimeDatabaseUpdateData,
        firebaseRealtimeDatabaseDeleteData,
    };

}
