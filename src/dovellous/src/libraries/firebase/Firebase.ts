import { K, ModuleBaseClasses } from "../app/helpers";
import * as FirebaseTypeInterfaces from "./lib/FirebaseTypeInterfaces";
import { FirebaseConfig } from './lib/FirebaseConfig';
import { f7 } from "framework7-react";
import { RealtimeDatabase } from "./apps/realtimeDatabase/RealtimeDatabase";
import { Auth } from "./apps/auth/Auth";
import { initializeApp } from "firebase/app";

type FirebaseOptions = {
	config: FirebaseConfig
} & ModuleBaseClasses.DovellousModuleOptions;

class FirebaseLibrary extends ModuleBaseClasses.DovellousModule {
	
	manaLevel: number
	declare options: FirebaseOptions; // <-- declare
	declare modules: any;
	declare events:  any;

	constructor(
		f7: any,
		events: any,
		apiKey?: any | FirebaseTypeInterfaces.FirebaseConfigInterface,
		authDomain?: string,
		projectId?: string,
		storageBucket?: string,
		messagingSenderId?: string,
		appId?: string,
		measurementId?: string,
		realtimeDatabaseConfig?: FirebaseTypeInterfaces.RealtimeDatabaseConfigInterface,
		authConfig?: FirebaseTypeInterfaces.AuthConfigInterface
	) {

		super();

		let self = this;
		
		self.events = events;

		if(f7.params.dovellous.hasOwnProperty('firebase')){ 

			if (apiKey instanceof FirebaseConfig) {

				self.options.config = apiKey;

			}else if(typeof apiKey === "string"){

				self.options.config = new FirebaseConfig(
					apiKey,
					authDomain,
					projectId,
					storageBucket,
					messagingSenderId,
					appId,
					measurementId,
					realtimeDatabaseConfig,
					authConfig,
				  );

			} else {

				self.options.config = new FirebaseConfig(
					f7.params.dovellous.firebase.apiKey,
					f7.params.dovellous.firebase.authDomain,
					f7.params.dovellous.firebase.projectId,
					f7.params.dovellous.firebase.storageBucket,
					f7.params.dovellous.firebase.messagingSenderId,
					f7.params.dovellous.firebase.appId,
					f7.params.dovellous.firebase.measurementId,
					f7.params.dovellous.firebase.realtimeDatabaseConfig,
					f7.params.dovellous.firebase.authConfig,
				  );

			}

		}

		self.modules = (function () {

			const parent = {

				isLoaded: false,

				events: {},

				firebaseLibrary: {},

				firebaseConfig: {},

				firebaseOptions: {},

				firebaseApp: {},

				initModules: async (
					firebaseLibrary: any
				) => {

					parent.firebaseLibrary = firebaseLibrary;

					parent.events = firebaseLibrary.events;

					parent.firebaseOptions = firebaseLibrary.options;

					parent.firebaseConfig = firebaseLibrary.options.config;

					parent.firebaseApp = initializeApp({
						apiKey: firebaseLibrary.options.config.apiKey,
						authDomain: firebaseLibrary.options.config.authDomain,
						projectId: firebaseLibrary.options.config.projectId,
						storageBucket: firebaseLibrary.options.config.storageBucket,
						messagingSenderId: firebaseLibrary.options.config.messagingSenderId,
						appId: firebaseLibrary.options.config.appId,
						measurementId: firebaseLibrary.options.config.measurementId,
					})

					f7.emit(
						K.Events.Modules.Firebase.FirebaseLibEvent.MODULE_LOADED,
						{
							app: parent
						}
					);

					// Start RealtimeDatabase

					await parent.realtimeDatabase.init(f7, parent.firebaseApp);

					f7.emit(
						K.Events.Modules.Firebase.FirebaseLibEvent.MODULE_READY,
						{
							app: parent
						}
					);

					// Start Auth

					await parent.auth.init(f7, parent.firebaseApp);

					f7.emit(
						K.Events.Modules.Firebase.FirebaseLibEvent.MODULE_READY,
						{
							app: parent
						}
					);

					parent.isLoaded = true;

					console.warn("::: K.Events.Modules.Firebase.FirebaseLibEvent.MODULE_READY, :::", K.Events.Modules.Firebase.FirebaseLibEvent.MODULE_READY);

				},

				realtimeDatabase: {

					isReady: false,

					lib: {},

					init: async (f7:any, firebaseApp: any) => {

						parent.realtimeDatabase.lib = new RealtimeDatabase(f7, parent, firebaseApp);

						parent.realtimeDatabase.isReady = true;

						return parent.realtimeDatabase;

					},

				},

				auth: {

					isReady: false,

					lib: {},

					init: async (f7:any, firebaseApp: any) => {

						parent.auth.lib = new Auth(f7, parent, firebaseApp);

						parent.auth.isReady = true;

						return parent.auth;

					},

				},

			};

			return parent;

		})();

		self.modules.initModules(self);

	}

}

// Firebase Module Here

ModuleBaseClasses.DovellousEventDispatcher(K.Events.Modules.Firebase);

/**
 *
 * @type {ModuleBaseClasses.DovellousLibraryEvent}
 */
const FirebaseLibEvent: ModuleBaseClasses.DovellousLibraryEvent = new ModuleBaseClasses.DovellousLibraryEvent(K.Events.Modules.Firebase.FirebaseLibEvent.NAME);

const Firebase = (Framework7:any, firebaseConfig: FirebaseTypeInterfaces.FirebaseConfigInterface) => {
	/**
	 * @type {ModuleBaseClasses.DovellousLibrary}
	 */
	return new FirebaseLibrary(Framework7, FirebaseLibEvent, firebaseConfig);

};

export { Firebase, FirebaseConfig, FirebaseLibEvent };