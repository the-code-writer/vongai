import { useState, useEffect } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, onChildAdded, onChildChanged, onChildRemoved, onValue, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 
import K from '../../app/konstants';
import { f7, f7ready } from 'framework7-react';
import { useAuthIM } from '../../../modules/auth/store/auth-store';

//import { AuthIM, useAuthIM } from "../../auth/store/auth-store";

export default function useFirebase(
    onUserIncomingCallHandler: Function
)
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

    const [firebaseAuthReady, setFirebaseAuthReady] = useState<boolean>(false);

    const [firebaseAuthApp, setFirebaseAuthApp] = useState<any>();

    const [firstName, setFirstName ] = useAuthIM(K.ModuleComponentsLibs.auth.dataStores.firstName, {});

    const [lastName, setLastName ] = useAuthIM(K.ModuleComponentsLibs.auth.dataStores.lastName, {});

    const [displayName, setDisplayName ] = useAuthIM(K.ModuleComponentsLibs.auth.dataStores.displayName, {});

    const [phoneNumber, setPhoneNumber ] = useAuthIM(K.ModuleComponentsLibs.auth.dataStores.phoneNumber, {});

    const [photoURL, setPhotoURL ] = useAuthIM(K.ModuleComponentsLibs.auth.dataStores.photoURL, {});

    const [displayPhoto, setDisplayPhoto ] = useAuthIM(K.ModuleComponentsLibs.auth.dataStores.displayPhoto, {});

    const [emailVerified, setEmailVerified ] = useAuthIM(K.ModuleComponentsLibs.auth.dataStores.emailVerified, {});

    const [accountDisabled, setAccountDisabled ] = useAuthIM(K.ModuleComponentsLibs.auth.dataStores.accountDisabled, {});

    const [uid, setUid ] = useAuthIM(K.ModuleComponentsLibs.auth.dataStores.uid, {});

    const [authProviders, setAuthProviders ] = useAuthIM(K.ModuleComponentsLibs.auth.dataStores.authProviders, {});

    const [firebaseUser, setFirebaseUser ] = useAuthIM(K.ModuleComponentsLibs.auth.dataStores.firebaseUser, {});

    const [webUser, setWebUser ] = useAuthIM(K.ModuleComponentsLibs.auth.dataStores.webUser, {});

    const [isLoggedIn, setIsLoggedIn ] = useAuthIM(K.ModuleComponentsLibs.auth.dataStores.isLoggedIn, {});

    const [userProfileData, setUserProfileData] = useState<any>({});

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
    
    const firebaseAuthSignInWithEmail:Function = () : any => {
        
    }
    
    const addEventListenersIncomingCall:Function = (uid:string) : any => {

        let path: string = String(`/accounts/users/${uid}/calls/incoming/`);
        
        firebaseRealtimeDatabaseApp.addEventListenersIncomingCall(path, (data: any)=>{

            onUserIncomingCallHandler(data);

        });

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

            addEventListenersIncomingCall(uid);

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
                    onFirebaseRealtimeDatabaseModuleReady(realtimeDatabaseAppInstance);
                }
            );

            if(DovellousInstance.Libraries.Firebase.app.realtimeDatabase.isReady){
                onFirebaseRealtimeDatabaseModuleReady(DovellousInstance.Libraries.Firebase.app.realtimeDatabase.lib);
            }

            f7.on(
                K.Events.Modules.Firebase.Auth.ON_APP_INIT,
                (authAppInstance?: any)=>{
                    onFirebaseRealtimeDatabaseModuleReady(authAppInstance);
                }
            );

            if(DovellousInstance.Libraries.Firebase.app.auth.isReady){
                onFirebaseRealtimeDatabaseModuleReady(DovellousInstance.Libraries.Firebase.app.auth.lib);
            }

        }

        return () => {
            
            resetState();

        }
        
    }, []);

    useEffect(() => {
      
        const user: any = {
            firstName: firstName,
            lastName: lastName,
            displayName: displayName,
            phoneNumber: phoneNumber,
            photoURL: photoURL,
            displayPhoto: displayPhoto,
            emailVerified: emailVerified,
            accountDisabled: accountDisabled,
            authProviders: authProviders,
            firebaseUser: firebaseUser,
            webUser: webUser,
            isLoggedIn: isLoggedIn,
            uid: uid,
        }

        setUserProfileData(user);
    
    }, [
        firstName,
        lastName,
        displayName,
        phoneNumber,
        photoURL,
        displayPhoto,
        emailVerified,
        accountDisabled,
        uid,
    ]);

    useEffect(()=>{

        firebaseAuthApp.onAuthStateChanged((userMeta: any)=>{

            console.warn("::::: USER ::::", user)

        });

    },[]);
    
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
