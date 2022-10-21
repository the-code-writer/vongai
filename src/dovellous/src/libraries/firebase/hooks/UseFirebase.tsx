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
import { AuthIM, useAuthIM } from '../../../modules/auth/store/auth-store';

export default function useFirebase(
    onUserIncomingCallHandler: Function
)
    : {
        firebaseAppReady: boolean,
        firebaseRealtimeDatabaseReady: boolean,
        firebaseRealtimeDatabaseCreateData: Function,
        firebaseRealtimeDatabaseReadData: Function,
        firebaseRealtimeDatabaseSetData: Function,
        firebaseRealtimeDatabaseUpdateData: Function,
        firebaseRealtimeDatabaseDeleteData: Function,
        firstName: any,
        lastName: any,
        displayName: any,
        phoneNumber: any,
        photoURL: any,
        displayPhoto: any,
        emailVerified: any,
        accountDisabled: any,
        uid: any,
        authProviders: any,
        firebaseUser: any,
        webUser: any,
        isLoggedIn: any,
    } {

    const [framework7Instance, setFramework7Instance] = useState<any>();

    const [firebaseApp, setFirebaseApp] = useState<any>();

    const [firebaseAppReady, setFirebaseAppReady] = useState<boolean>(false);

    const [firebaseRealtimeDatabaseReady, setFirebaseRealtimeDatabaseReady] = useState<boolean>(false);

    const [firebaseRealtimeDatabaseApp, setFirebaseRealtimeDatabaseApp] = useState<any>();

    const [firebaseAuthReady, setFirebaseAuthReady] = useState<boolean>(false);

    const [firebaseAuthApp, setFirebaseAuthApp] = useState<any>();

    const [firstName, setFirstName] = useAuthIM(
        K.ModuleComponentsLibs.auth.dataStores.firstName,
        AuthIM.getters[K.ModuleComponentsLibs.auth.dataStores.firstName].value);

    const [lastName, setLastName] = useAuthIM(
        K.ModuleComponentsLibs.auth.dataStores.lastName,
        AuthIM.getters[K.ModuleComponentsLibs.auth.dataStores.lastName].value);

    const [displayName, setDisplayName] = useAuthIM(
        K.ModuleComponentsLibs.auth.dataStores.displayName,
        AuthIM.getters[K.ModuleComponentsLibs.auth.dataStores.displayName].value);

    const [phoneNumber, setPhoneNumber] = useAuthIM(
        K.ModuleComponentsLibs.auth.dataStores.phoneNumber,
        AuthIM.getters[K.ModuleComponentsLibs.auth.dataStores.phoneNumber].value);

    const [photoURL, setPhotoURL] = useAuthIM(
        K.ModuleComponentsLibs.auth.dataStores.photoURL,
        AuthIM.getters[K.ModuleComponentsLibs.auth.dataStores.photoURL].value);

    const [displayPhoto, setDisplayPhoto] = useAuthIM(
        K.ModuleComponentsLibs.auth.dataStores.displayPhoto,
        AuthIM.getters[K.ModuleComponentsLibs.auth.dataStores.displayPhoto].value);

    const [emailVerified, setEmailVerified] = useAuthIM(
        K.ModuleComponentsLibs.auth.dataStores.emailVerified,
        AuthIM.getters[K.ModuleComponentsLibs.auth.dataStores.emailVerified].value);

    const [accountDisabled, setAccountDisabled] = useAuthIM(
        K.ModuleComponentsLibs.auth.dataStores.accountDisabled,
        AuthIM.getters[K.ModuleComponentsLibs.auth.dataStores.accountDisabled].value);

    const [uid, setUid] = useAuthIM(
        K.ModuleComponentsLibs.auth.dataStores.uid,
        AuthIM.getters[K.ModuleComponentsLibs.auth.dataStores.uid].value);

    const [authProviders, setAuthProviders] = useAuthIM(
        K.ModuleComponentsLibs.auth.dataStores.authProviders,
        AuthIM.getters[K.ModuleComponentsLibs.auth.dataStores.authProviders].value);

    const [firebaseUser, setFirebaseUser] = useAuthIM(
        K.ModuleComponentsLibs.auth.dataStores.firebaseUser,
        AuthIM.getters[K.ModuleComponentsLibs.auth.dataStores.firebaseUser].value);

    const [webUser, setWebUser] = useAuthIM(
        K.ModuleComponentsLibs.auth.dataStores.webUser,
        AuthIM.getters[K.ModuleComponentsLibs.auth.dataStores.webUser].value);

    const [isLoggedIn, setIsLoggedIn] = useAuthIM(
        K.ModuleComponentsLibs.auth.dataStores.isLoggedIn,
        AuthIM.getters[K.ModuleComponentsLibs.auth.dataStores.isLoggedIn].value);

    const [userProfileData, setUserProfileData] = useState<any>({});

    const firebaseRealtimeDatabaseCreateData: Function = (path: string, data: any, callbackFunction: Function): any => {

        console.warn("::: FIREBASE ::: firebaseRealtimeDatabaseCreateData :::", path, data);

        firebaseRealtimeDatabaseApp.createData(path, data, callbackFunction);

    }

    const firebaseRealtimeDatabaseReadData: Function = (path: string, callbackFunction: Function): any => {

        callbackFunction();

    }

    const firebaseRealtimeDatabaseReadDataOnce: Function = (path: string, callbackFunction: Function): any => {

        callbackFunction();

    }

    const firebaseRealtimeDatabaseSetData: Function = (path: string, data: any, callbackFunction: Function): any => {

        callbackFunction();

    }

    const firebaseRealtimeDatabaseUpdateData: Function = (path: string, data: any, callbackFunction: Function): any => {

        callbackFunction();

    }

    const firebaseRealtimeDatabaseDeleteData: Function = (path: string, callbackFunction: Function): any => {

        callbackFunction();

    }

    const firebaseFirestoreCreateCollection: Function = (): any => {

    }

    const firebaseFirestoreCreateDocument: Function = (): any => {

    }

    const firebaseFirestoreReadCollection: Function = (): any => {

    }

    const firebaseFirestoreReadDocument: Function = (): any => {

    }

    const firebaseFirestoreUpdateCollection: Function = (): any => {

    }

    const firebaseFirestoreUpdateDocument: Function = (): any => {

    }

    const firebaseFirestoreDeleteDocument: Function = (): any => {

    }

    const firebaseFirestoreDeleteCollection: Function = (): any => {

    }

    const firebaseAuthSignInWithEmail: Function = (): any => {

    }

    const onUserDataUpdatedHandler = (data: any) => {

        if (Object.keys(data).length > 0) {

            setFirstName(data.firstName);

            setLastName(data.lastName);

            setDisplayName(data.displayName);

            setPhoneNumber(data.phoneNumber);

            setPhotoURL(data.photoURL);

            setDisplayPhoto(data.displayPhoto);

            setEmailVerified(data.emailVerified);

            setAccountDisabled(data.accountDisabled);

            setUid(data.uid);

            setAuthProviders(data.authProviders);

            setFirebaseUser(data.firebaseUser);

            setWebUser(data.webUser);

            setIsLoggedIn(data.isLoggedIn);

        }

    }

    const addEventListenerUserMetadata: Function = (): any => {

        firebaseAuthApp.addEventListenersIncomingCall((data: any) => {

            onUserIncomingCallHandler(data);

        });

        firebaseAuthApp.addEventListenersIncomingCall((data: any) => {

            onUserIncomingCallHandler(data);

        });

        firebaseAuthApp.addEventListenersUserData((data: any) => {

            onUserDataUpdatedHandler(data);

        });

    }

    const resetState = () => {

        //framework7Instance.off( K.Events.Modules.Firebase.FirebaseLibEvent.MODULE_LOADED );
        //framework7Instance.off( K.Events.Modules.Firebase.RealtimeDatabase.ON_APP_INIT );
        //framework7Instance.off( K.Events.Modules.Firebase.Auth.ON_APP_INIT );

    }

    const onFirebaseModuleReady = (firebaseAppInstance: any) => {
        setFirebaseApp(firebaseAppInstance);
        setFirebaseAppReady(true);
    }

    const onFirebaseRealtimeDatabaseModuleReady = (realtimeDatabaseAppInstance: any) => {
        setFirebaseRealtimeDatabaseApp(realtimeDatabaseAppInstance);
        setFirebaseRealtimeDatabaseReady(true);
    }

    const onFirebaseAuthModuleReady = (authAppInstance: any) => {
        setFirebaseAuthApp(authAppInstance);
        setFirebaseAuthReady(true);
        addEventListenerUserMetadata();
    }

    useEffect(() => {

        setFramework7Instance(f7);

        const DovellousInstance: any = f7.dovellous.instance;

        if (DovellousInstance.Libraries.hasOwnProperty("Firebase")) {

            f7.on(
                K.Events.Modules.Firebase.FirebaseLibEvent.MODULE_READY,
                (firebaseAppInstance: any) => {
                    onFirebaseModuleReady(firebaseAppInstance);
                }
            );

            if (DovellousInstance.Libraries.Firebase.app.realtimeDatabase.isReady) {
                onFirebaseModuleReady(DovellousInstance.Libraries.Firebase.app.firebaseApp);
            }

            f7.on(
                K.Events.Modules.Firebase.RealtimeDatabase.ON_APP_INIT,
                (realtimeDatabaseAppInstance?: any) => {
                    onFirebaseRealtimeDatabaseModuleReady(realtimeDatabaseAppInstance);
                }
            );

            if (DovellousInstance.Libraries.Firebase.app.realtimeDatabase.isReady) {
                onFirebaseRealtimeDatabaseModuleReady(DovellousInstance.Libraries.Firebase.app.realtimeDatabase.lib);
            }

            f7.on(
                K.Events.Modules.Firebase.Auth.ON_APP_INIT,
                (authAppInstance?: any) => {
                    onFirebaseAuthModuleReady(authAppInstance);
                }
            );

            if (DovellousInstance.Libraries.Firebase.app.auth.isReady) {
                onFirebaseAuthModuleReady(DovellousInstance.Libraries.Firebase.app.auth.lib);
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
            uid: uid,
            authProviders: authProviders,
            firebaseUser: firebaseUser,
            webUser: webUser,
            isLoggedIn: isLoggedIn,
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
        authProviders,
        firebaseUser,
        webUser,
        isLoggedIn
    ]);

    useEffect(() => {

        firebaseAuthApp.onAuthStateChanged((data: any) => {

            onUserDataUpdatedHandler(data);

        });

    }, []);

    return {
        firebaseAppReady,
        firebaseRealtimeDatabaseReady,
        firebaseRealtimeDatabaseCreateData,
        firebaseRealtimeDatabaseReadData,
        firebaseRealtimeDatabaseSetData,
        firebaseRealtimeDatabaseUpdateData,
        firebaseRealtimeDatabaseDeleteData,
        firstName,
        lastName,
        displayName,
        phoneNumber,
        photoURL,
        displayPhoto,
        emailVerified,
        accountDisabled,
        uid,
        authProviders,
        firebaseUser,
        webUser,
        isLoggedIn
    };

}
