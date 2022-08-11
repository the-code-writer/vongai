import Framework7 from 'framework7/lite-bundle';

import { initializeApp, FirebaseApp } from "firebase/app";

import {K, ModuleBaseClasses} from "../app/helpers";

import { FirebaseRealtimeDatabase } from "./apps/realtimedatbase/FirebaseRealtimeDatabase";
import { FirebaseAuth } from "./apps/auth/FirebaseAuth";
import { FirebaseFirestore } from "./apps/firestore/FirebaseFirestore";
import { FirebaseCloudMessaging } from "./apps/messaging/FirebaseCloudMessaging";
import { FirebaseStorage } from "./apps/storage/FirebaseStorage";

interface FirebaseInterface {
  apiKey: any,
  authDomain: any,
  projectId:any,
  storageBucket:any,
  messagingSenderId: any,
  appId: any,
  measurementId: any
}

class FirebaseConfig implements FirebaseInterface{
	apiKey: any;
	authDomain: any;
	projectId: any;
	storageBucket: any;
	messagingSenderId: any;
	appId: any;
	measurementId: any;
    static events: any;

  constructor(
    apiKey: any,
	authDomain: any,
	projectId:any,
	storageBucket:any,
	messagingSenderId: any,
	appId: any,
	measurementId: any
  ) {
    this.apiKey = apiKey;
	this.authDomain = authDomain;
	this.projectId = projectId;
	this.storageBucket = storageBucket;
	this.messagingSenderId = messagingSenderId;
	this.appId = appId;
	this.measurementId = measurementId;
  }

}

const FirebaseLibrary = ModuleBaseClasses.Class.extend({

  init: function(
    events: any, 
	F7: Framework7,
    apiKey: any | FirebaseConfig,
	authDomain: any,
	projectId:any,
	storageBucket:any,
	messagingSenderId: any,
	appId: any,
	measurementId: any
  ) {

		let self = this;

    let options: FirebaseAuth;

    if (apiKey instanceof FirebaseConfig) {
      options = apiKey;
    } else {
      options = new FirebaseConfig(apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId);
    }

		this.events = events;

		this.modules.params = self;

		this.modules.initModules(this, F7, options);

	},
	modules: (function() {
		let parent = {

			isLoaded: false,

			params: FirebaseConfig,

      		F7: "",

			FIREBASE_APP: <FirebaseApp> {},

			initModules: async (app: any, F7: Framework7, options: { appId: string; primaryCertificate: string; agora: { channels: {}; }; channels: { [x: string]: string; }; tokens: { [x: string]: string; }; firebaseRealtimeDatabase: { moduleName: string; }; firebaseAuth: { moduleName: string; }; firebaseFirestore: { moduleName: string; }; firebaseCloudMessaging: { moduleName: string; }; firebaseStorage: { moduleName: string; }; }) => {

        		parent.F7 = F7;

        		await parent.initializeFirebaseApp(options);

				await parent.firebaseRealtimeDatabase.init(app);

				await parent.firebaseAuth.init(app);

				await parent.firebaseFirestore.init(app);

				await parent.firebaseCloudMessaging.init(app);

				await parent.firebaseStorage.init(app);

				parent.params.events[K.Events.Modules.Firebase.FirebaseLibEvent.MODULE_LOADED]({
					firebaseApp: app,
					firebaseModule: parent,
					firebaseInstance: parent.FIREBASE_APP
				});
					
			},

			initializeFirebaseApp: async (options: FirebaseConfig)=>{
				
				const firebaseConfig = {
					apiKey: options.apiKey,
					authDomain: options.authDomain,
					projectId: options.projectId,
					storageBucket: options.storageBucket,
					messagingSenderId: options.messagingSenderId,
					appId: options.appId,
					measurementId: options.measurementId
				};

				// Initialize Firebase
				parent.FIREBASE_APP = initializeApp(firebaseConfig);

				return parent.FIREBASE_APP;

			},

			firebaseRealtimeDatabase: {

				isReady: false,

        	lib: {},

				init: async (app: any) => { 
					
          			parent.firebaseRealtimeDatabase.lib = new FirebaseRealtimeDatabase(parent.params.events, parent.F7);
          			parent.firebaseRealtimeDatabase.isReady = true;

					const _app = {
						Firebase: app,
						FirebaseRealtimeDatabaseLib: parent.firebaseRealtimeDatabase.lib,
						FirebaseRealtimeDatabaseApp: parent.firebaseRealtimeDatabase,
						EventNames: K.Events.Modules.Firebase.RealtimeDatabase,
						Events: parent.params.events
					};
          
					parent.params.events[K.Events.Modules.Firebase.RealtimeDatabase.ON_APP_INIT](_app);

          			return _app;

				},
			},
			
			firebaseAuth: {

				isReady: false,

        		lib: {},

				params: {
					moduleName: "FirebaseAuth",
				},

				init: async (app: any) => { 
					
					parent.firebaseAuth.params = parent.params;

          			parent.firebaseAuth.lib = new FirebaseAuth(parent.params.events, parent.F7, options);
          			parent.firebaseAuth.isReady = true;
          
					parent.params.events[K.Events.Modules.Firebase.Auth.ON_APP_INIT]([
						app,
						options
					]);

          			return parent.firebaseAuth;

				},
			},
			
			firebaseFirestore: {

				isReady: false,

        		lib: {},

				params: {
					moduleName: "FirebaseFirestore",
				},

				init: async (app: any) => { 
					
					parent.firebaseFirestore.params = parent.params;

          			parent.firebaseFirestore.lib = new FirebaseFirestore(parent.params.events, parent.F7, options);
          			parent.firebaseFirestore.isReady = true;
          
					parent.params.events[K.Events.Modules.Firebase.Firestore.ON_APP_INIT]([
						app,
						options
					]);

          			return parent.firebaseFirestore;

				},
			},
			
			firebaseCloudMessaging: {

				isReady: false,

        		lib: {},

				params: {
					moduleName: "FirebaseCloudMessaging",
				},

				init: async (app: any) => { 
					
					parent.firebaseCloudMessaging.params = parent.params;

          			parent.firebaseCloudMessaging.lib = new FirebaseCloudMessaging(parent.params.events, parent.F7, options);
          			parent.firebaseCloudMessaging.isReady = true;
          
					parent.params.events[K.Events.Modules.Firebase.CloudMessaging.ON_APP_INIT]([
						app,
						options
					]);

          			return parent.firebaseCloudMessaging;

				},
			},
			
			firebaseStorage: {
				
				isReady: false,

        		lib: {},

				params: {
					moduleName: "FirebaseStorage",
				},

				init: async (app: any) => { 
					
					parent.firebaseStorage.params = parent.params;

          			parent.firebaseStorage.lib = new FirebaseStorage(parent.params.events, parent.F7, options);
          			parent.firebaseStorage.isReady = true;
          
					parent.params.events[K.Events.Modules.Firebase.Storage.ON_APP_INIT]([
						app,
						options
					]);

          			return parent.firebaseStorage;

				},
        
			},
			
		};
		return parent;
	})(),
});

// Firebase Module Here

ModuleBaseClasses.DovellousEventDispatcher(K.Events.Modules.Firebase);

/**
 *
 * @type {ModuleBaseClasses.DovellousLibraryEvent}
 */
const agoraLibEvent: ModuleBaseClasses.DovellousLibraryEvent = new ModuleBaseClasses.DovellousLibraryEvent(K.Events.Modules.Firebase.LibEvent.NAME);

const Firebase = (F7: Framework7, options: FirebaseAuth) => {
	/**
	 * @type {ModuleBaseClasses.DovellousLibrary}
	 */
	return new FirebaseLibrary(agoraLibEvent, F7, options);

};

export {Firebase, FirebaseAuth};