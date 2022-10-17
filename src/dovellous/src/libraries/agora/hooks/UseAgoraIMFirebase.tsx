import { useState, useEffect } from 'react';

import { f7 } from 'framework7-react';
import K from '../../app/konstants';

export default function useAgoraIMFirebase(firebaseConfig: any)
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

    const [firebaseAppReady, setFirebaseAppReady] = useState<boolean>(false);

    const [firebaseRealtimeDatabaseReady, setFirebaseRealtimeDatabaseReady] = useState<boolean>(false);

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

        data.status = K.ModuleComponentsLibs.im.callScreen.currentStatus.NOT_AVAILABLE;
        data.message = K.ModuleComponentsLibs.im.callScreen.currentStatus.NOT_AVAILABLE;
        data.tts = "Sorry, the number you have dialed is not available at the moment. Please try again later.";

        setTimeout(()=>{

            data.status = "Success";

            callbackFunction(data);

        },3000);

    } 
    
    const firebaseRealtimeDatabaseReadData:Function = () : any => {
        
    }
    
    const firebaseRealtimeDatabaseUpdateData:Function = () : any => {
        
    }
    
    const firebaseRealtimeDatabaseDeleteData:Function = () : any => {
        
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
    
    useEffect(() => {

        firebaseInit(firebaseConfig, ()=>{

            setFirebaseAppReady(true);

            firebaseRealtimeDatabaseInit(()=>{

                setFirebaseRealtimeDatabaseReady(true);

            })

            firebaseFirestoreInit(()=>{

                setFirebaseFirestoreReady(true);

            })

        })
        
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
