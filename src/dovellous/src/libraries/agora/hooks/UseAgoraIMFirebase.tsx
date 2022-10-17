import { useState, useEffect } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

        const db = getDatabase();

        const dataObject: any = {
            startedTimestamp: data.startedTimestamp,
            endedTimestamp: data.endedTimestamp,
            origin: data.origin,
            destination: data.destination,
            isVideoCall: data.isVideoCall,
            isGroupCall: data.isGroupCall,
            isIncoming:  data.isIncoming,
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
    
    const firebaseRealtimeDatabaseReadData:Function = (path:string, callbackFunction:Function) : any => {
        const db = getDatabase();
        const dbRef = ref(db, path);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            callbackFunction(data);
        });
    }
    
    const firebaseRealtimeDatabaseReadDataOnce:Function = (path:string, callbackFunction:Function) : any => {
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
    
    const firebaseRealtimeDatabaseUpdateData:Function = (path: string, data: any, callbackFunction: Function) : any => {
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
    
    const firebaseRealtimeDatabaseDeleteData:Function = (path:string, callbackFunction: Function) : any => {
        firebaseRealtimeDatabaseUpdateData(path, null, callbackFunction);
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
    
    const addEventListeners:Function = () : any => {
        const db = getDatabase();
        const commentsRef = ref(db, 'post-comments/' + postId);
        onChildAdded(commentsRef, (data) => {
            addCommentElement(postElement, data.key, data.val().text, data.val().author);
        });

        onChildChanged(commentsRef, (data) => {
            setCommentValues(postElement, data.key, data.val().text, data.val().author);
        });

        onChildRemoved(commentsRef, (data) => {
            deleteComment(postElement, data.key);
        });
    }
    
    useEffect(() => {

        firebaseInit(firebaseConfig, ()=>{

            // Initialize Firebase
            const app = initializeApp(K.ModuleComponentsLibs.firebase.config);

            setFirebaseApp(app);

            setFirebaseAppReady(true);

            addEventListeners();

            firebaseRealtimeDatabaseInit(()=>{

                // Initialize Realtime Database and get a reference to the service
                const database = getDatabase(app);

                setFirebaseRealtimeDatabaseApp(database);

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
